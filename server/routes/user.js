import express from "express";
import { signUp, signIn, googleSignin } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/googleSignIn", googleSignin);
export default router;
