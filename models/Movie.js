const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  backdrop_path:{type:String},
  title:{type:String},
  id:{type:Number},
  poster_path:{type:String},
  release_date:{type:String},
  overview:{type:String}
});

const Movie = mongoose.model("Movie",MovieSchema);

module.exports = Movie;