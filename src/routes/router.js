const express = require("express");
const appointmentRouter = require('./appointmentRouter.js')
const pacientRouter = require('./patientRouter')
const physicianRouter = require('./physicianRouter')
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Its working');
});

router.use('/appointment', appointmentRouter);
router.use('/pacient', pacientRouter);
router.use('/physician', physicianRouter);

module.exports = router;