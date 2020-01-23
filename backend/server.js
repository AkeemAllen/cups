const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// const uri = process.env.LOCAL_URI;

// mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true });

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("MongoDb Connection established successfully");
// });

app.use(cors);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
