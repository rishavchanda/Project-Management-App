import express from "express";
import { signup,signin,verify, logout, googleAuthSignIn, generateOTP, verifyOTP, createResetSession } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { localVariables } from "../middleware/auth.js";

const router = express.Router();

//create a user
router.post("/signup", signup);
//signin
router.post("/signin", signin);
//verify
router.get("/verify/:token", verify);
//logout
router.post("/logout", logout);
//google signin
router.post("/google", googleAuthSignIn);
//generate opt
router.get("/generateotp",localVariables, generateOTP);
//verify opt
router.get("/verifyotp", verifyOTP);
//create reset session
router.get("/createResetSession", createResetSession);



export default router;