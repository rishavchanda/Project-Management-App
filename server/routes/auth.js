import express from "express";
import { signup,signin,verify, logout, googleAuthSignIn } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

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



export default router;