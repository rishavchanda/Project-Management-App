import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import Project from "../models/Project.js";
import Works from "../models/Works.js";
import Tasks from "../models/Tasks.js";
import Notifications from "../models/Notifications.js";
import otpGenerator from 'otp-generator';


export const addProject = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(createError(404, "User not found"));
  }
  const newProject = new Project({ members: [{ id: user.id, img: user.img, email: user.email, name: user.name, role: "d", access: "Owner" }], ...req.body });
  try {
    const saveProject = await (await newProject.save());
    User.findByIdAndUpdate(user.id, { $push: { projects: saveProject._id } }, { new: true }, (err, doc) => {
      if (err) {
        next(err);
      }
    });
    res.status(200).json(saveProject);
  } catch (err) {
    next(err);
  }
};


export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found!"));
    for (let i = 0; i < project.members.length; i++) {
      if (project.members[i].id.toString() === req.user.id) {
        if (project.members[i].access === "Owner") {
          await project.delete();
          User.findByIdAndUpdate(req.user.id, { $pull: { projects: req.params.id } }, { new: true }).exec();
          for (let j = 0; j < project.members.length; j++) {
            User.findByIdAndUpdate(project.members[j].id, { $pull: { projects: req.params.id } }, { new: true }).exec();
          }
          res.status(200).json("Project has been deleted...");
        } else {
          return next(createError(403, "You are not allowed to delete this project!"));
        }
      }
    }

  } catch (err) {
    next(err);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate("members.id", "_id  name email img");
    var verified = false
    await Promise.all(
      project.members.map(async (Member) => {
        if (Member.id.id === req.user.id) {
          verified = true
        }
      })
    )
      .then(() => {
        if (verified) {
          return res.status(200).json(project);
        } else {
          return next(createError(403, "You are not allowed to view this project!"));
        }
      });

  } catch (err) {
    next(err);
  }
};


export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "project not found!"));
    for (let i = 0; i < project.members.length; i++) {
      if (project.members[i].id.toString() === req.user.id.toString()) {
        if (project.members[i].access === "Owner" || project.members[i].access === "Admin" || project.members[i].access === "Editor") {
          const updatedproject = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json({ message: "Project has been updated..." });
        } else {
          return next(createError(403, "You are not allowed to update this project!"));
        }
      }
    }
    return next(createError(403, "You can update only if you are a member of this project!"));
  } catch (err) {
    next(err);
  }
};

export const updateMembers = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "project not found!"));
    for (let i = 0; i < project.members.length; i++) {
      if (project.members[i].id.toString() === req.user.id.toString()) {
        if (project.members[i].access === "Owner" || project.members[i].access === "Admin" || project.members[i].access === "Editor") {
          //update single member inside members array
          const updatedproject = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                "members.$[elem].access": req.body.access,
                "members.$[elem].role": req.body.role,
              },
            },
            {
              arrayFilters: [{ "elem.id": req.body.id }],
              new: true,
            }
          );
          res.status(200).json({ message: "Member has been updated..." });
        } else {
          return next(createError(403, "You are not allowed to update this project!"));
        }
      }
    }
    return next(createError(403, "You can update only if you are a member of this project!"));

  } catch (err) {
    next(err);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "project not found!"));
    for (let i = 0; i < project.members.length; i++) {
      if (project.members[i].id.toString() === req.user.id.toString()) {
        if (project.members[i].access === "Owner" || project.members[i].access === "Admin" || project.members[i].access === "Editor") {

          await Project.findByIdAndUpdate(
            req.params.id,
            {
              $pull: {
                //remove the meber with the id
                members: { id: req.body.id }
              }
            },
            {
              new: true,
            }
          )
            .exec();

          await User.findByIdAndUpdate(
            req.body.id,
            {
              $pull: {
                projects: req.params.id,
              }
            },
            {
              new: true,
            }
          ).exec()
            .then((user) => {
              res.status(200).json({ message: "Member has been removed..." });

            }).catch((err) => {
              console.log(err);
            })

        } else {
          return next(createError(403, "You are not allowed to update this project!"));
        }
      }
    }
    return next(createError(403, "You can update only if you are a member of this project!"));

  } catch (err) {
    next(err);
  }
};


dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  port: 465,
  host: 'smtp.gmail.com'
});

export const inviteProjectMember = async (req, res, next) => {
  //send mail using nodemailer
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(createError(404, "User not found"));
  }
  const project = await Project.findById(req.params.id);
  if (!project) return next(createError(404, "Project not found!"));

  req.app.locals.CODE = await otpGenerator.generate(8, { upperCaseAlphabets: true, specialChars: true, lowerCaseAlphabets: true, digits: true, });
  dotenv.config();
  const link = `${process.env.URL}/projects/invite/${req.app.locals.CODE}?projectid=${req.params.id}&userid=${req.body.id}&access=${req.body.access}&role=${req.body.role}`;
  const mailBody = `
  <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDHQMmI5x5qWbOrEuJuFWkSIBQoT_fFyoKOKYqOSoIvQ&s" alt="VEXA Logo" style="display: block; margin: 0 auto; max-width: 200px; margin-bottom: 20px;">
    <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Invitation to join a VEXA Project</h1>
    <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
            <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;"><b>${project.title}</b></h2>
        </div>
        <div style="padding: 30px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Hello ${req.body.name},</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">You've been invited to join a project called <b>${project.title}</b> on VEXA by <b>${user.name}</b>.</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">To accept the invitation and join the project, please click on the button below:</p>
            <div style="text-align: center; margin-bottom: 30px;">
                <a href=${link} style="background-color: #854CE6; color: #FFF; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Accept Invitation</a>
            </div>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">If you have any questions or issues with joining the project, please contact  <b>${user.name}</b> for assistance.</p>
        </div>
    </div>
    <br>
    <p style="font-size: 16px; color: #666; margin-top: 30px;">Best regards,</p>
    <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>The VEXA Team</p>
</div>
`

  for (let i = 0; i < project.members.length; i++) {
    if (project.members[i].id.toString() === req.user.id) {
      if (project.members[i].access.toString() === "Owner" || project.members[i].access.toString() === "Admin" || project.members[i].access.toString() === "Editor") {
        const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: `Invitation to join project ${project.title}`,
          html: mailBody
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            return next(err);
          } else {
            return res.status(200).json({ message: "Email sent successfully" });
          }
        });
      } else {
        return next(createError(403, "You are not allowed to invite members to this project!"));
      }
    }
  }

};

//verify invitation and add to project member
export const verifyInvitation = async (req, res, next) => {
  try {
    const { projectid, userid, access, role } = req.query;
    const code = req.params.code;
    if (code === req.app.locals.CODE) {
      req.app.locals.CODE = null;
      req.app.locals.resetSession = true;
      const project = await Project.findById(projectid);
      if (!project) return next(createError(404, "Project not found!"));
      const user = await User.findById(userid);
      if (!user) {
        return next(createError(404, "User not found"));
      }

      for (let i = 0; i < project.members.length; i++) {
        if (project.members[i].id === user.id) {
          return next(createError(403, "You are already a member of this project!"));
        }
      }
      const newMember = { id: user.id, role: role, access: access };
      const updatedProject = await Project.findByIdAndUpdate(
        projectid,
        {
          $push: { members: newMember },
        },
        { new: true }
      );
      User.findByIdAndUpdate(user.id, { $push: { projects: updatedProject._id } }, { new: true }, (err, doc) => {
        if (err) {
          next(err);
        }
      });
      res.status(200).json({ Message: "You have successfully joined the PROJECT!" });
    }
    return res.status(201).json({ Message: "Invalid Lnk- Link Expired !" });
  } catch (err) {
    next(err);
  }
};


export const getProjectMembers = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found!"));
    res.status(200).json(project.members);
  } catch (err) {
    next(err);
  }
}

//add works to project
export const addWork = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found!"));
    for (let i = 0; i < project.members.length; i++) {
      if (project.members[i].id.toString() === req.user.id) {
        if (project.members[i].access === "Owner" || project.members[i].access === "Admin" || project.members[i].access === "Editor") {

          console.log("tg");
          //create tasks from the arrya of tasks or req.body.tasks and thne push the id of the tasks to the work

          const tasks = [];
          for (let i = 0; i < req.body.tasks.length; i++) {
            const newTask = new Tasks({
              ...req.body.tasks[i],
              task: req.body.tasks[i].task,
              start_date: req.body.tasks[i].start_date,
              end_date: req.body.tasks[i].end_date,
              members: req.body.tasks[i].members,
              projectId: project._id,
            });
            const task = await newTask.save();
            tasks.push(task.id);
          }

          const newWork = new Works({
            ...req.body,
            title: req.body.title,
            desc: req.body.desc,
            priority: req.body.priority,
            tags: req.body.tags,
            projectId: project._id,
            creatorId: user.id,
            tasks: tasks,
          });
          const work = await newWork.save();
          console.log(work);

          //add the work id to the tasks
          for (let i = 0; i < tasks.length; i++) {
            Tasks.findByIdAndUpdate(tasks[i], { workId: newWork._id }, (err, doc) => {
              if (err) {
                next(err);
              }
            });
          }

          //add the work id to the project
          const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $push: { works: work._id },
            },
            { new: true }
          ).then(() => {
            //add the work id to the members and the tasks
            for (let k = 0; k < req.body.tasks.length; k++) {
              for (let i = 0; i < req.body.tasks[k].members.length; i++) {
                const user = User.findByIdAndUpdate(req.body.tasks[k].members[i], { $push: { works: work._id } }, (err, doc) => {
                  if (err) {
                    next(err);
                  }
                });

                for (let i = 0; i < tasks.length; i++) {
                  User.findByIdAndUpdate(req.body.tasks[k].members[i], { $push: { tasks: tasks[i] } }, (err, doc) => {
                    if (err) {
                      next(err);
                    }
                  }
                  );
                }
              }

            }
          });
          for (let k = 0; k < req.body.tasks.length; k++) {
            for (let i = 0; i < req.body.tasks[k].members.length; i++) {
              const newNotification = new Notifications({
                link: project.id,
                type: "task",
                message: `"${user.name}" added you to task "${req.body.tasks[k].task}" in work "${work.title}" in project "${project.title.toUpperCase()}".`,
              });
              const notification = await newNotification.save();

              console.log(notification);
              User.findByIdAndUpdate(req
                .body.tasks[k].members[i], { $push: { notifications: notification._id } }, (err, doc) => {
                  if (err) {

                    next(err);
                  }
                }
              );
            }
          }

          res.status(200).json(updateProject);
        } else {
          return res.status(403).send({
            message: "You are not allowed to add works to this project"
          });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};



//work 

//get works
export const getWorks = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found!"));
    const works = await Works

      .find({ projectId: req.params.id })
      .populate("tasks")
      .populate("creatorId", "name img")
      .populate({
        path: "tasks",
        populate: {
          path: "members",
          select: "name img",
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).json(works);
  } catch (err) {
    next(err);
  }
};
