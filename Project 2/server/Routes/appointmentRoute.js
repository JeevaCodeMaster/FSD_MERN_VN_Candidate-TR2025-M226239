const express = require("express");
const appointmentController=require("../controllers/appointmentController"); 
const appointmentRouter =express.Router();
const {protect} = require("../middleware/authmiddleware");
const {allowRoles} = require("../middleware/authrole");



appointmentRouter.post("/add-app",protect,allowRoles("user"),appointmentController.addAppointment)
appointmentRouter.put("/up-app/:id/:status",protect,allowRoles("doctor"),appointmentController.update_Appointment)
appointmentRouter.get("/get-apps",protect,allowRoles("admin"),appointmentController.getAppointment)
appointmentRouter.get("/get-appByUsId/:id",protect,allowRoles("user"),appointmentController.getUserAppointment);
appointmentRouter.get("/get-app",protect,allowRoles("admin"),appointmentController.addAppointment);
appointmentRouter.get("/get-appBydocId/:id",protect,allowRoles("doctor"),appointmentController.getDoctorAppointment)
appointmentRouter.delete("/delete-app/:id",protect,allowRoles("admin"),appointmentController.deleteApp)

module.exports=appointmentRouter;