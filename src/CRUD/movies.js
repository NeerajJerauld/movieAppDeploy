const express = require("express");
const router = express.Router;
const movieModel = require("../Model/movieDB");

const create = async (req, res) => {
  try {
    const {
      movieName,
      releaseYear,
      actor,
      camera,
      actress,
      producer,
      director,
      language,
    } = req.body;
    const movieNameRegex = new RegExp(movieName, "i");
    const releaseYearRegex = new RegExp(releaseYear, "i");
    const actorRegex = new RegExp(actor, "i");
    const cameraRegex = new RegExp(camera, "i");
    const actressRegex = new RegExp(actress, "i");
    const producerRegex = new RegExp(producer, "i");
    const directorRegex = new RegExp(director, "i");
    const languageRegex = new RegExp(language, "i");

    const movies = await movieModel.find({
      movieName: { $regex: movieNameRegex },
      releaseYear,
      actor: { $regex: actorRegex },
      camera: { $regex: cameraRegex },
      actress: { $regex: actressRegex },
      producer: { $regex: producerRegex },
      director: { $regex: directorRegex },
      language: { $regex: languageRegex },
    });
    console.log(movies);

    if (movies.length > 0) {
      console.log(
        "Movies found:",
        movies.map((movie) => movie.movieName)
      );
      res.json({
        message: "Movie Already Exists",
        statusCode: 400,
        status: "failed to save",
        exists: true,
      });
    } else {
      var data = await new movieModel(req.body);
      data.save();
      res.send({
        message: "Saved successfully",
        statusCode: 200,
        status: "data saved",
      });
      console.log("data saved");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


const readAll = async (req, res) => {
  try {
    var movieData = await movieModel.find();

    if (movieData.length === 0) {
        // return res.status(404).json({ status: "error", message: "No movies found" });
        return res.status(404).json({status: "error", message: "No movies found"})
    }
      res.send({ status: "success", message: movieData });
    
      
  } catch (error) {
    res.status(500).send(error);
  }
};


const remove = async (req, res) => {
  try {
    const movieId = req.params.id;
    var deletedMovie = await movieModel.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({
        message: "Movie not found",
        statusCode: 404,
      });
    }

    return res.status(200).json({
      message: "Movie successfully deleted",
      statusCode: 200,
      status: "Deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

const searchDocumentsByLetters = async (req,res) => {
  try {
    let letters = req.params.letters
    console.log(req.params.letters);

    console.log(`Searching for documents with letters: ${letters}`);
    // const query = { actor: { $regex: `.*${letters}.*`, $options: 'i' } };
    const query = {
      $or: [
        { movieName: { $regex: `.*${letters}.*`, $options: 'i' } },
        { actress: { $regex: `.*${letters}.*`, $options: 'i' } },
        { actor: { $regex: `.*${letters}.*`, $options: 'i' } },
        { director: { $regex: `.*${letters}.*`, $options: 'i' } },
        { language: { $regex: `.*${letters}.*`, $options: 'i' } },
        { camera: { $regex: `.*${letters}.*`, $options: 'i' } },
        { producer: { $regex: `.*${letters}.*`, $options: 'i' } },
        // { releasedYear: { $in: letters } }

        // { releasedYear: { $regex: `.*${letters}.*`, $options: 'i' } }
      ]
    };
    const documents = await movieModel.find(query);
    console.log('Matching documents:', documents);
    res.send({data: documents})
  } catch (error) {
    console.error('Error searching documents:', error);
  }
}

const update = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
  
      const updatedMovie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (updatedMovie) {
        res.json({statusCode:200, status: "success", data: updatedMovie });
      } else {
        res.status(404).json({statusCode:400, status: "error", message: "Movie not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({statusCode:500, status: "error", message: "Internal server error" });
    }
  };



module.exports = { create, readAll, remove, update, searchDocumentsByLetters };
