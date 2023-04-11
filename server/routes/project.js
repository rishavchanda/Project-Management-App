import express from "express";
import { addProject, deleteProject, getProject, updateProject,removeMember, inviteProjectMember, verifyInvitation, getProjectMembers, addWork, getWorks, updateMembers } from "../controllers/project.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { localVariables } from "../middleware/auth.js";

const router = express.Router();

//create a project
router.post("/", verifyToken, addProject);
//get all projects
router.get("/:id", verifyToken, getProject)
//delete a project
router.delete("/:id", verifyToken, deleteProject)
//update a project
router.patch("/:id", verifyToken, updateProject)
//update a project member
router.patch("/member/:id", verifyToken, updateMembers)
//remove a project member
router.patch("/member/remove/:id", verifyToken, removeMember)

//invite a  project
router.post("/invite/:id", verifyToken, localVariables, inviteProjectMember)
//verify a invite
router.get("/invite/:code", verifyInvitation)
//get  members
router.get("/members/:id",verifyToken, getProjectMembers)

//works
// add works to a project
router.post("/works/:id", verifyToken, addWork)
//get all works of a project
router.get("/works/:id", verifyToken, getWorks)


export default router;