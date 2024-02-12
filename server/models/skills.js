const mongoose = require("mongoose");

const skills = new mongoose.Schema({
    img: {
    public_id: { type: String },
    url: { type: String },
  },
  title: { type: String, require: true },
});

module.exports = mongoose.model("Skills", skills);
