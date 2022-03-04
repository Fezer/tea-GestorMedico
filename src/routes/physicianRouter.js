const express = require("express");
const physitianRouter = express.Router();
const physicianController = require("../controllers/physicianController");

physitianRouter.get("/listPhysicians", physicianController.listAllPhysician);

module.exports = physitianRouter;
