const express =require("express");
const userController =require("../controllers/userController");
const userRouter =express.Router();
const {protect} = require("../middleware/authmiddleware");
const {allowRoles}=require("../middleware/authrole");

userRouter.get("/get-users",protect,allowRoles("admin"),userController.getusers)
userRouter.get("/get-user/:id",protect,userController.getuser)
userRouter.delete("/delete-user/:id",protect,allowRoles("admin"),userController.deleteUser)

module.exports=userRouter;