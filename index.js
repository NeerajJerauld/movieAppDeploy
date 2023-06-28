// importing
const express = require("express");
const cors = require("cors");
// const { create, readAll, remove, update,simpleFunction } = require('./crudoperator')

//initialization
const app = express();
const movieRoute = require("./src/Routes/movieRoute");
const path = require("path");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log(__dirname)
app.use(express.static(path.join(__dirname, "/build")));

// Direct the request to movieRoute.js
app.use("/api/movie", movieRoute);

//port
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(3000, () => {
  console.log("app is working on port 3000");
});
