const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

patientRouter.get("/listPatients", patientController.listAllPatient);
patientRouter.post("/searchPatientById", patientController.searchPatientById);
patientRouter.post("/searchPatientByName", patientController.searchPatientByName);
patientRouter.post("/createPatient", patientController.createPatient);
patientRouter.put("/updatePatient", patientController.updatePatient);

module.exports = patientRouter;