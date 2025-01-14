const express = require("express"); // Require Express module
const app = express(); // Obtain the "app" object
const HTTP_PORT = process.env.PORT || 8080; // Assign a port
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

require("dotenv").config(); // Load environment variables from the .env file via process.env

// Configure Express App
app.set("view engine", "ejs"); // Set view engine for EJS
app.set('views', __dirname + '/views');
app.set("views", path.join(__dirname, "views")); // Adjust views directory path
app.use(express.static(__dirname + '/public')); // Middleware to handle static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To handle form submissions

// GET Routes
app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => {
    const { success, error } = req.query;
    res.render("contact", { success, error });
  });
app.get("/services", (req, res) => res.render("services"));
app.get("/resume", (req, res) => res.render("resume"));
app.get("/project1", (req, res) => res.render("project1"));
app.get("/project2", (req, res) => res.render("project2"));
app.get("/project3", (req, res) => res.render("project3"));
app.get("/project4", (req, res) => res.render("project4"));

// POST Route to Handle Contact Form Submission
app.post("/send-email", async (req, res) => {
    const { name, email, phone, reason, message } = req.body;
  
    // Validate Required Fields
    if (!name || !email || !phone || !reason || !message) {
      return res.redirect("/contact?error=All fields are required.");
    }
  
    try {
      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Email Details
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "sahforemmanuel@gmail.com",
        subject: `${reason} from Portfolio website`,
        text: `New message from:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\n\nMessage originated from Portfolio Website`,
      };
  
      // Send the Email
      await transporter.sendMail(mailOptions);
  
      // Redirect back to the contact form with a success message
      res.redirect("/contact?success=Your message was sent successfully!");
    } catch (error) {
      console.error("Email sending failed:", error);
  
      // Redirect back to the contact form with an error message
      res.redirect("/contact?error=Failed to send your message. Please try again.");
    }
 });
  

// Handle Undefined Routes (404 Page)
app.use((req, res) => {
  res.status(404).render("404", {
    message: "We're sorry, the page you were looking for cannot be found. (︶︹︺)",
  });
});

// Start the Server
app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));
