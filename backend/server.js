// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

// Initializes the express application
const app = express();

// Specifies the port that the app runs on, i.e. http://localhost:5000
const port = process.env.PORT || 2020;

// Database connection to local or server instance of MongoDb
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/cupsdatabase";
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Displays whether or note the connection was successful
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb Connection established successfully");
});

app.use(cors);
app.use(express.json());

// Establishing application Routes
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

const server = http.createServer(app);

// Runs app on relevant port
setImmediate(() => {
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
