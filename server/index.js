const express = require("express");
const bodyParser = require("body-parser");
const script = require("./script/scriptController");
var cors = require('cors')
const app = express();
var socket = require('socket.io')
options={
    cors:true,
    origins:["http://127.0.0.1:5347"],
}


// get env vars
const dotenv = require('dotenv');
dotenv.config();

// PORT
const PORT = process.env.PORT || 3000;

// Allow CORS
app.use(cors())
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

/**
 * Router Middleware
 */
app.use("/script", script);


var server = app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});

let io = socket(server, options)
global.io = io
io.on('connection', function(socket){
    console.log(`${socket.id} is connected`);
});
