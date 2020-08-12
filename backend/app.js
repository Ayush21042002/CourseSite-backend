const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//from mongoose model

// aUny25mqfjS2Eo3n

const mongoose = require('mongoose');

//this returns us an express app and wnow we can use it .
const app = express();
const campRoutes = require('./routes/camps');
const adminRoutes = require('./routes/admin');
mongoose.connect("mongodb+srv://ayush:aUny25mqfjS2Eo3n@cluster0.osd6c.mongodb.net/campsite?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to Db!")
    })
    .catch(() => {
        console.log("Connection to Db Failed!")
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.resolve(__dirname, "images")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    next();
})

//1s1N23MiycqxJwDT

app.use("/api/camps", campRoutes);
app.use("/api/admin",adminRoutes);
module.exports = app;