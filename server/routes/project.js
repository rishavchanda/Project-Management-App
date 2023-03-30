import express from "express";
import { addProject, deleteProject, getProject, updateProject, inviteProjectMember, verifyInvitation, getProjectMembers, addWork, getWorks } from "../controllers/project.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a project
router.post("/", verifyToken, addProject);
//get all projects
router.get("/:id", verifyToken, getProject)
//delete a project
router.delete("/:id", verifyToken, deleteProject)
//update a project
router.patch("/:id", verifyToken, updateProject)
//invite a team project
router.post("/invite/:id", verifyToken, inviteProjectMember)
//verify a invite
router.get("/invite/:projectId/:userId",verifyToken, verifyInvitation)
//get team members
router.get("/members/:id",verifyToken, getProjectMembers)

//works
// add works to a project
router.post("/works/:id", verifyToken, addWork)
//get all works of a project
router.get("/works/:id", verifyToken, getWorks)


export default router;