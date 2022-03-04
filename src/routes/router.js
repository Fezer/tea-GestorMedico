const express = require("express");
const appointmentRouter = require('./appointmentRouter.js')
const pacientRouter = require('./pacientRouter.js')
const physicianRouter = require('./physicianRouter.js')
const routes = express.Router();

router.get('/', (req, res)=>{
    res.send('Its working');
});

router.use('/appointment', appointmentRouter);
router.use('/pacient', pacientRouter);
router.use('/physician', physicianRouter);

module.exports = router;