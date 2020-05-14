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
app.post("/rooms-types", (req, res) => {
    emp.getRoomsTypes(req, res);
});
app.post("/rooms", (req, res) => {
    emp.getAvailableRooms(req, res);
});
app.post("/rooms-all", (req, res) => {
    emp.getAllRooms(req, res);
});
app.post("/bookings", (req, res) => {
    emp.getAvailableRooms(req, res);
});
app.post("/bookings-view", (req, res) => {
    emp.getAllBookings(req, res);
});
app.get("/states", (req, res) => {
    emp.getRoomsStates(req, res);
});
app.post("/rooms-update", (req, res) => {
    emp.updateRoom(req, res);
});



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});