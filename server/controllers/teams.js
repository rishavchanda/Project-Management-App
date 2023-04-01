import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import Teams from "../models/Teams.js";
import Project from "../models/Project.js";


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
            if (Team.members[i].id === req.user.id) {
                if (Team.members[i].access === "Owner") {
                    await Team.delete();
                    User.findByIdAndUpdate(req.user.id, { $pull: { teams: req.params.id } }, { new: true }, (err, doc) => {
                        if (err) {
                            next(err);
                        }
                    });
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
        res.status(200).json(team);
        var verified = true
        await Promise.all(
            team.members.map(async (Member) => {
                if (Member.id._id === req.user.id)
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
        for (let i = 0; i < Team.members.length; i++) {
            if (Team.members[i].id === req.user.id) {
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
            } else {
                return next(createError(403, "You can update only if you are a member of this Teams!"));
            }
        }
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
    for (let i = 0; i < team.members.length; i++) {
        if (team.members[i].id === req.user.id) {
            console.log(team.members[i].access);
            if (team.members[i].access === "Owner" || team.members[i].access === "Admin" || team.members[i].access === "Editor") {

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: req.body.email,
                    subject: "Invitation to join team",
                    text: `Hi ${req.body.name}, you have been invited to join ${team.name} by ${user.name}. Please click on the link to join the team. http://localhost:8080/api/team/invite/${req.params.id}/${req.body.id}`,
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
        const team = await Teams.findById(req.params.teamId);
        if (!team) return next(createError(404, "Team not found!"));
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        for (let i = 0; i < team.members.length; i++) {
            if (team.members[i].id === user.id) {
                return next(createError(403, "You are already a member of this team!"));
            }
        }
        const newMember = { id: user.id, role: "d", access: "View Only" };

        await Teams.findByIdAndUpdate(
            req.params.teamId,
            {
                $push: { members: newMember },
            },
            { new: true }
        ).then(async () => {
            //add tem id and team name to user
            await User.findByIdAndUpdate(
                req.params.userId,
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