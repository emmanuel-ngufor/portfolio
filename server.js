const express = require("express");                    // "require" the Express module
const app = express();                                 // obtain the "app" object
const HTTP_PORT = process.env.PORT || 8080;            // assign a port
const path = require("path")
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// require("dotenv").config();            // load environment variables from the .env file via process.env

app.set("view engine", "ejs");                            // set view engine for EJS
app.set('views', path.join(__dirname, 'views'));          // ---> Changed due to vercel hosting
// app.use(express.static("public"));                     // Middleware to handle  static files like CSS and Images from public directory
app.use(express.static(path.join(__dirname, 'public')));  // ---> Original --> Changed due to vercel hosting
// Middleware to parse JSON bodies
app.use(bodyParser.json());




// GET "/"
app.get("/", (req, res) => { 
    res.render("home");
});   

// GET "/about"
app.get("/about", (req, res) => {
    res.render("about");
});


// GET "/contact"
app.get("/contact", (req, res) => {
    res.render("contact");
});

// GET "Services"
app.get("/services", (req, res) => {
    res.render("services");
});

// GET "project1"
app.get("/project1", (req, res) => {
    res.render("project1");
});

// GET "project2"
app.get("/project2", (req, res) => {
    res.render("project2");
});

// GET "project4"
app.get("/project3", (req, res) => {
    res.render("project3");
});

// GET "project4"
app.get("/project4", (req, res) => { 
    res.render("project4");
});



// start the server on the port and output a confirmation to the console
app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));



// Testing github changes