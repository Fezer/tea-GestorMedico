const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.get("/listAllAppointments", appointmentController.listAllAppointments);
appointmentRouter.post("/newAppointment", appointmentController.newAppointment);
appointmentRouter.get("/searchAppointmentByPatientId/:id", appointmentController.searchAppointmentByPatientId);
appointmentRouter.get("/searchAppointmentByPhysicianId/:id", appointmentController.searchAppointmentByPhysicianId);
appointmentRouter.delete("/deleteAppointment/:id", appointmentController.deleteAppointment);

module.exports = appointmentRouter;