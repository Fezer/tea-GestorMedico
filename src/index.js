const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Server running on port ", process.env.SYSTEM_PORT);
});

module.exports = app;