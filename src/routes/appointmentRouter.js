const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.get("/listAllAppointments", appointmentController.listAllAppointments);
appointmentRouter.post("/newAppoitment", appointmentController.newAppoitment);

module.exports = appointmentRouter;