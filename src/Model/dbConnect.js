const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

mongoose
  .connect("mongodb+srv://userone:userone@njmongodbcluster.m9krg.mongodb.net/moviedb?retryWrites=true&w=majority")
  .then(() => {
    console.log("db connected => moviedb");
  })
  .catch((err) => console.log(err));

module.exports = mongoose;