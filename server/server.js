//import express.js package
const express = require('express');
//instantiate the server
const app = express();
//set environment variable
const PORT = process.env.PORT || 3000;
//make all files in the dist directory static resources
app.use(express.static('../client/dist'));
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//apply routing
require('./routes/htmlRoutes')(app);
//establish connection to server via the listen() method
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
