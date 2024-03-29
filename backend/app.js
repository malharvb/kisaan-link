require('dotenv').config();

const express = require("express");
const app = express();
const path = require('path')

const mongoose = require('mongoose');

const farmersRoutes = require("./Routes/farmers");
const buyersRoutes = require('./Routes/buyers');
const truckDriverRoutes = require("./Routes/truckDrivers");

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'build')))
// Removal of CORS error
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Origin", "Content-Type, Authorization");
    next();
})

// Route grps
app.use('/farmers', farmersRoutes);
app.use('/buyers', buyersRoutes);
app.use('/truckDrivers', truckDriverRoutes);

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')))

// DB connection
let port = 4000;
mongoose.connect(process.env.MONGO_URI).then((result) => {
    app.listen(port);
    console.log("Server is running on port "+port)
}).catch((err) => { console.log(err) });