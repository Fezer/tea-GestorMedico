const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middlewares/auth");

appointmentRouter.get("/listAllAppointments", auth, appointmentController.listAllAppointments);
appointmentRouter.post("/newAppointment", auth, appointmentController.newAppointment);
appointmentRouter.get("/searchAppointmentByPatientId/:id", auth, appointmentController.searchAppointmentByPatientId);
appointmentRouter.get("/searchAppointmentByPhysicianId/:id", auth, appointmentController.searchAppointmentByPhysicianId);
appointmentRouter.delete("/deleteAppointment/:id", auth, appointmentController.deleteAppointment);

module.exports = appointmentRouter;