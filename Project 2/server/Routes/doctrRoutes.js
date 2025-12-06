const express = require("express");
const doctorController=require("../controllers/doctorController");
const {protect} = require("../middleware/authmiddleware");
const {allowRoles} =require("../middleware/authrole");


const doctorRouter =express.Router();


doctorRouter.post("/add-doc",protect,allowRoles("doctor"),doctorController.addDoctor);
doctorRouter.get("/get-doc/:id",protect,allowRoles("user","doctor"),doctorController.getDoctor);
doctorRouter.get("/get-docs",protect,allowRoles("user","doctor","admin"),doctorController.getDoctors);

doctorRouter.patch("/up-doc/:id/:allow",protect,allowRoles("admin"),doctorController.approveDoctor);
doctorRouter.delete("/delete-doc/:id",protect,allowRoles("admin"),doctorController.deleteDoctor);

module.exports=doctorRouter;