import express from "express";
import { addTeam, getTeam, deleteTeam, updateTeam, addTeamProject, inviteTeamMember, verifyInvitationTeam, getTeamMembers, removeMember, updateMembers } from "../controllers/teams.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { localVariables } from "../middleware/auth.js";

const router = express.Router();

//create a Team
router.post("/",verifyToken, addTeam);
//get all Teams
router.get("/:id",verifyToken, getTeam)
//delete a Team
router.delete("/:id", verifyToken, deleteTeam)
//update a Team
router.patch("/:id", verifyToken, updateTeam)
//update a team member
router.patch("/member/:id", verifyToken, updateMembers)
//remove a team member
router.patch("/member/remove/:id", verifyToken, removeMember)
//add a team project
router.post("/addProject/:id", verifyToken, addTeamProject)
//invite a team member
router.post("/invite/:id", verifyToken,localVariables, inviteTeamMember)
//verify a invite
router.get("/invite/:code",verifyInvitationTeam)
//get team members
router.get("/members/:id", verifyToken, getTeamMembers)


export default router;