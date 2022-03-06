const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

patientRouter.get("/listPatients", patientController.listAllPatient);

module.exports = patientRouter;