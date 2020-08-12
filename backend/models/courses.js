const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  field: { type: String,},
  imagePath: { type: String,},
  url: {type: String},
});

//model camp is created.
module.exports = mongoose.model("Course", courseSchema);
