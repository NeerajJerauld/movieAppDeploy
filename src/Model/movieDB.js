const mongoose = require("./dbConnect");

let Schema = mongoose.Schema;
const movieSchema = new Schema({
  id: String,
  movieName: String,
  actor: String,
  actress: String,
  director: String,
  releasedYear: Number,
  camera: String,
  producer: String,
  language: String,
});
var movieModel = mongoose.model("movie", movieSchema);
module.exports = movieModel;
