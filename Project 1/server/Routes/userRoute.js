

const express=require("express");
const userController =require("../controllers/userController")
const userRouter=express.Router();
const {protect} =require("../middleware/authmiddleware");
const {allowRoles} =require("../middleware/authrole");



//authorization
userRouter.get("/get-user/:role",protect,allowRoles("admin"),userController.getUser);
userRouter.get("/get-userById/:id",protect,allowRoles("buyer","seller","admin"),userController.getUserById);
userRouter.patch("/update-user/:id",protect,allowRoles("buyer","seller","admin"),userController.updateUser);
userRouter.delete("/delete-user/:id",protect,allowRoles("admin"),userController.deleteUser);


module.exports=userRouter;