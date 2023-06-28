const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("db connected => moviedb");
  })
  .catch((err) => console.log(err));

module.exports = mongoose;