const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroesSchema = Schema({
  name: String,
  alias: String,
  company: String,
  gender: String,
  species: String,
  image: String,
  side: String,
  powers: [String],
});

module.exports = mongoose.model("heroes", heroesSchema);
