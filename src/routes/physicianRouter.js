const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");

physicianRouter.get("/listPhysicians", physicianController.listAllPhysician);

module.exports = physicianRouter;
