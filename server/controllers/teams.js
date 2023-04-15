import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import Teams from "../models/Teams.js";
import Project from "../models/Project.js";
import otpGenerator from 'otp-generator';


export const addTeam = async (req, res, next) => {

    const user = await User.findById(req.user.id);;
    if (!user) {
        return next(createError(404, "User not found"));
    }

    const newTeams = new Teams({ members: [{ id: user.id, role: "d", access: "Owner" }], ...req.body });
    try {
        const saveTeams = (await newTeams.save())

        User.findByIdAndUpdate(user.id, { $push: { teams: saveTeams._id } }, { new: true }, (err, doc) => {
            if (err) {
                next(err);
            }
        })

        res.status(200).json(saveTeams);
    } catch (err) {
        next(err);
    }
};


export const deleteTeam = async (req, res, next) => {
    try {
        const Team = await Teams.findById(req.params.id);
        if (!Team) return next(createError(404, "Team not found!"));
        for (let i = 0; i < Team.members.length; i++) {
            if (Team.members[i].id.toString() === req.user.id) {
                if (Team.members[i].access === "Owner") {
                    await Team.delete();
                    User.findByIdAndUpdate(req.user.id, { $pull: { teams: req.params.id } }, { new: true }).exec();
                    for (let j = 0; j < Team.members.length; j++) {
                        User.findByIdAndUpdate(Team.members[j].id, { $pull: { teams: req.params.id } }, { new: true }).exec();
                    }
                    res.status(200).json("Team has been deleted...");
                } else {
                    return next(createError(403, "You are not allowed to delete this Team!"));
                }
            }
        }
    } catch (err) {
        next(err);
    }
};

export const getTeam = async (req, res, next) => {
    try {
        const team = await Teams.findById(req.params.id).populate("members.id", "_id  name email img").populate({
            path: "projects",
            populate: {
                path: "members.id",
                select: "_id name email",
            }
        });
        var verified = false
        await Promise.all(
            team.members.map(async (Member) => {
                if (Member.id.id === req.user.id)
                    verified = true
            })).then(() => {
                if (verified) {
                    return res.status(200).json(team);
                } else {
                    return next(createError(403, "You are not allowed to see this Team!"));
                }
            });
    } catch (err) {
        next(err);
    }
};


export const updateTeam = async (req, res, next) => {
    try {
        const Team = await Teams.findById(req.params.id);
        if (!Team) return next(createError(404, "Teams not found!"));
        console.log(Team.members.length)
        for (let i = 0; i < Team.members.length; i++) {
            console.log(Team.members[i].id.toString())
            console.log(req.user.id)
            if (Team.members[i].id.toString() === req.user.id) {
                if (Team.members[i].access === "Owner" || Team.members[i].access === "Admin" || Team.members[i].access === "Editor") {
                    const updatedTeam = await Teams.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: req.body,
                        },
                        { new: true }
                    );
                    res.status(200).json(updatedTeam);
                } else {
                    return next(createError(403, "You are not allowed to update this Teams!"));
                }
            }
        }
        return next(createError(403, "You can update only if you are a member of this Teams!"));

    } catch (err) {
        next(err);
    }
};

export const updateMembers = async (req, res, next) => {
    try {
        const Team = await Teams.findById(req.params.id);
        if (!Team) return next(createError(404, "Teams not found!"));
        for (let i = 0; i < Team.members.length; i++) {
            if (Team.members[i].id.toString() === req.user.id) {
                if (Team.members[i].access === "Owner" || Team.members[i].access === "Admin" || Team.members[i].access === "Editor") {
                    //update single member inside members array
                    await Teams.findByIdAndUpdate(
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
                    return next(createError(403, "You are not allowed to update this Teams!"));
                }
            }

        }
        return next(createError(403, "You can update only if you are a member of this Teams!"));
    }
    catch (err) {
        next(err);
    }
};

export const removeMember = async (req, res, next) => {
    try {
        const Team = await Teams.findById(req.params.id);
        if (!Team) return next(createError(404, "Teams not found!"));
        for (let i = 0; i < Team.members.length; i++) {
            console.log(Team.members.length, Team.members[i].id.toString(), req.user.id)
            if (Team.members[i].id.toString() === req.user.id) {
                if (Team.members[i].access === "Owner" || Team.members[i].access === "Admin" || Team.members[i].access === "Editor") {
                    await Teams.findByIdAndUpdate(
                        req.params.id,
                        {
                            $pull: { members: { id: req.body.id } },
                        },
                        {
                            new: true,
                        }
                    ).exec();

                    await User.findByIdAndUpdate(req.body.id, { $pull: { teams: req.params.id } }, { new: true }).exec().then(() => {

                    res.status(200).json({ message: "Member has been removed..." });
                }).catch((err) => {
                    next(err);
                });

                } else {
                    return next(createError(403, "You are not allowed to update this Teams!"));
                }
            }
        }
        return next(createError(403, "You can update only if you are a member of this Teams!"));

    } catch (err) {
        next(err);
    }
};



export const addTeamProject = async (req, res, next) => {

    const user = await User.findById(req.user.id);;
    if (!user) {
        return next(createError(404, "User not found"));
    }

    const newProject = new Project({ members: [{ id: user.id, role: "d", access: "Owner" }], ...req.body });
    try {
        const saveProject = await (await newProject.save());
        User.findByIdAndUpdate(user.id, { $push: { projects: saveProject._id } }, { new: true }, (err, doc) => {
            if (err) {
                next(err);
            }
        });
        Teams.findByIdAndUpdate(req.params.id, { $push: { projects: saveProject._id } }, { new: true }, (err, doc) => {
            if (err) {
                next(err);
            }
        });
        res.status(200).json(saveProject);
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

export const inviteTeamMember = async (req, res, next) => {
    //send mail using nodemailer

    const user = await User.findById(req.user.id);
    if (!user) {
        return next(createError(404, "User not found"));
    }

    const team = await Teams.findById(req.params.id);
    if (!team) return next(createError(404, "Team not found!"));

    req.app.locals.CODE = await otpGenerator.generate(8, { upperCaseAlphabets: true, specialChars: true, lowerCaseAlphabets: true, digits: true, });

    const link = `${process.env.URL}/team/invite/${req.app.locals.CODE}?teamid=${req.params.id}&userid=${req.body.id}&access=${req.body.access}&role=${req.body.role}`;

    const mailBody = `
    <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDHQMmI5x5qWbOrEuJuFWkSIBQoT_fFyoKOKYqOSoIvQ&s" alt="VEXA Logo" style="display: block; margin: 0 auto; max-width: 200px; margin-bottom: 20px;">
  <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">${team.name}</h1>
  <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
    <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
      <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Invitation to Join Team: ${team.name}</h2>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Dear ${req.body.name},</p>
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">You have been invited to join a team <b>${team.name}</b> on VEXA by <b>${user.name}</b>. Please follow the link below to accept the invitation:</p>
      <div style="text-align: center;">
        <a href=${link} style="background-color: #854CE6; color: #FFF; text-decoration: none; font-size: 16px; font-weight: 500; padding: 10px 30px; border-radius: 5px;">Accept Invitation</a>
      </div>
      <p style="font-size: 16px; color: #666; margin-top: 30px;">Best regards,</p>
      <p style="font-size: 16px; color: #666;">The VEXA Team</p>
    </div>
  </div>
</div>
`;

    for (let i = 0; i < team.members.length; i++) {
        if (team.members[i].id.toString() === req.user.id) {
            if (team.members[i].access === "Owner" || team.members[i].access === "Admin" || team.members[i].access === "Editor") {

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: req.body.email,
                    subject: `Invitation to join team ${team.name}`,
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

//verify invitation and add to team member
export const verifyInvitationTeam = async (req, res, next) => {
    try {
        const { teamid, userid, access, role } = req.query;
        const code = req.params.code;
        if (code === req.app.locals.CODE) {
            req.app.locals.CODE = null;
            req.app.locals.resetSession = true;

            const team = await Teams.findById(teamid);
            if (!team) return next(createError(404, "Team not found!"));
            const user = await User.findById(userid);
            if (!user) {
                return next(createError(404, "User not found"));
            }
            for (let i = 0; i < team.members.length; i++) {
                if (team.members[i].id.toString() === user.id) {
                    return next(createError(403, "You are already a member of this team!"));
                }
            }
            const newMember = { id: user.id, role: role, access: access };

            await Teams.findByIdAndUpdate(
                teamid,
                {
                    $push: { members: newMember },
                },
                { new: true }
            ).then(async () => {
                //add tem id and team name to user
                await User.findByIdAndUpdate(
                    userid,
                    {
                        $push: { teams: team.id },
                    },
                    { new: true }
                ).then((result) => {
                    res.status(200).json({ Message: "You have successfully joined the team!" });
                }).catch((err) => {
                    next(err);
                });
            }).catch((err) => {
                next(err);
            });


        }
        return res.status(201).json({ Message: "Invalid Lnk- Link Expired !" });
    } catch (err) {
        next(err);
    }
};


export const getTeamMembers = async (req, res, next) => {
    try {
        const team = await Teams.findById(req.params.id);
        if (!team) return next(createError(404, "Team not found!"));
        res.status(200).json(team.members);
    } catch (err) {
        next(err);
    }
}