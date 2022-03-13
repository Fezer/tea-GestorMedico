const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");
const auth = require("../middlewares/auth");

patientRouter.get("/listPatients", auth, patientController.listAllPatient);
patientRouter.get("/searchPatientById/:id", auth, patientController.searchPatientById);
patientRouter.get("/searchPatientByName", auth, patientController.searchPatientByName);
patientRouter.post("/createPatient", auth, patientController.createPatient);
patientRouter.put("/updatePatient/:id", auth, patientController.updatePatient);

module.exports = patientRouter;