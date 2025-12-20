
const express = require("express");
const authRouter=express.Router()

const authController =require("../controllers/authController");

//normal auth
authRouter.post("/register",authController.register);
authRouter.post("/login",authController.login);
//google auth
authRouter.get("/google", authController.googleLogin);
authRouter.post("/google/callback", authController.googleCallback);



//github auth 
authRouter.get("/github", authController.githubLogin);
authRouter.get("/github/callback", authController.githubCallback);

module.exports=authRouter;