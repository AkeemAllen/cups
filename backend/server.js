const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/cupsdatabase";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB connection established successfully");
})

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/user')
app.use('/users', usersRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});