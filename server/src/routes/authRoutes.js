import express from "express";
import {login,register,callbackGithub,callbackGithubFailed} from "../controllers/authController.js"
import passport from "../config/passport.js";

const router = express.Router();

router.post("/register", register );
router.post("/login",login);
router.get("/github", passport.authenticate("github"));
router.get("/github/callback",  passport.authenticate('github', { session: false, failureRedirect: '/auth/github/failed' }), callbackGithub );
router.get("/github/failed", callbackGithubFailed );

export default router;