const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const villainsSchema = Schema({
  name: String,
  alias: String,
  company: String,
  gender: String,
  species: String,
  image: String,
  side: String,
  powers: [String],
});

module.exports = mongoose.model("villains", villainsSchema);
