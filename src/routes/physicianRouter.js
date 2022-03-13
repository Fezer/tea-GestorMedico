const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");
const auth = require("../middlewares/auth");

physicianRouter.get("/authentication", physicianController.authentication);
physicianRouter.get("/listPhysicians", auth, physicianController.listAllPhysician);
physicianRouter.post("/newPhysician", auth, physicianController.newPhysician);
physicianRouter.delete("/deletePhysician/:id", auth, physicianController.deletePhysician);
physicianRouter.put("/updatePhysician/:id", auth, physicianController.updatePhysician);

module.exports = physicianRouter;
