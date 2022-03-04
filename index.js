const express = require("express");
const app = express();
require('./src/database/index.js');

const router = require("./src/routes/router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Server running on port ", process.env.SYSTEM_PORT);
});

module.exports = app;