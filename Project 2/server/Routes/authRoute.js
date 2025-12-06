const express =require("express");
const {login,register} = require("../controllers/authController");
const authRouter =express.Router();




// route
authRouter.post("/register",register);
authRouter.post("/login",login);

module.exports=authRouter;


