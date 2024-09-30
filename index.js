const path = require("path");
const express = require("express");
const connection = require("./connection"); // Ensure this connects to your MongoDB
const bookRoutes = require("./routes/book"); // Import book routes
const userRoutes = require("./routes/user");
const admin= require('./helper/common');
const app = express();
admin.createadmin();

// Middleware to parse JSON bodies
app.use(express.json());
const session = require("express-session");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "yourSecretKey", // Replace with your secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);

// Connect to MongoDB
connection();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Use the book and user routes under their respective paths
app.use("/", bookRoutes); // Use book routes
app.use("/", userRoutes); // Use user routes

// Start the server
app.listen(3000, (err) => {
  if (err) {
    console.log("Error starting server", err);
  } else {
    console.log("Server started at http://localhost:3000");
  }
});
