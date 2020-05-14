var http = require("http");
var emp = require("./controllers/employee");
var settings = require("./settings");
var cors = require('cors');
var bodyParser = require('body-parser');
const express = require("express");

const port = settings.webPort;
const app = express();
app.use(cors());
app.use(bodyParser.json())

app.get("/login", (req, res) => {
    emp.staffPositions(req,res);
});
app.post("/login", (req, res) => {
    emp.login(req, res, req.body);
});



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});