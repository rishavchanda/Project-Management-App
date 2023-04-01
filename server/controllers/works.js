import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import Works from "../models/Works.js";


export const addWork = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(createError(404, "User not found"));
  }
  
  const newWork = new Project({ members: [{ id: user.id, role: "d", access: "Owner" }], ...req.body });
  try {
    const saveProject = await (await newWork.save());
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
      if (project.members[i].id === req.user.id) {
        if (project.members[i].access === "Owner") {
          await project.delete();
          User.findByIdAndUpdate(req.user.id, { $pull: { projects: req.params.id } }, { new: true }, (err, doc) => {
            if (err) {
              next(err);
            }
          });
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
    const project = await Project.findById(req.params.id);
    const members = []
    var verified = false
    await Promise.all(
      project.members.map(async (Member) => {
        console.log(Member.id)
        if (Member.id === req.user.id) {
          verified = true
        }
        await User.findById(Member.id).then((member) => {
          console.log(member)
          members.push({ id: member.id, role: Member.role, access: Member.access, name: member.name, img: member.img, email: member.email });
        })
      })
    )
      .then(() => {
        if (verified) {
          return res.status(200).json({ project, members });
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
      if (project.members[i].id === req.user.id) {
        if (project.members[i].access === "Owner" || project.members[i].access === "Admin" || project.members[i].access === "Editor") {
          const updatedproject = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedproject);
        } else {
          return next(createError(403, "You are not allowed to update this project!"));
        }
      } else {
        return next(createError(403, "You can update only if you are a member of this project!"));
      }
    }
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
  for (let i = 0; i < project.members.length; i++) {
    if (project.members[i].id === req.user.id) {
      if (project.members[i].access === "Owner" || project.members[i].access === "Admin" || project.members[i].access === "Editor") {

        const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Invitation to join project",
          text: `Hi ${req.body.name}, you have been invited to join project ${project.title} by ${user.name}. Please click on the link to join the project. http://localhost:8080/api/project/invite/${req.params.id}/${req.body.id}`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            return next(err);
          } else {
            res.status(200).json({ message: "Email sent successfully" });
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
    const project = await Project.findById(req.params.projectId);
    if (!project) return next(createError(404, "Project not found!"));
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    for (let i = 0; i < project.members.length; i++) {
      if (project.members[i].id === user.id) {
        return next(createError(403, "You are already a member of this project!"));
      }
    }
    const newMember = { id: user.id, img: user.img, name: user.name, email: user.email, role: "d", access: "View Only" };
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
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
    res.status(200).json(updatedProject);
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