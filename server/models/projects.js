const mongoose = require("mongoose");

const projects = new mongoose.Schema({
  imageSrc: {
    public_id: { type: String },
    url: { type: String },
  },
  title: { type: String, require: true },
  desc: { type: String, require: true },
  gitUrl: { type: String, require: true },
  previewUrl: { type: String, require: true },
});

module.exports = mongoose.model("Projects", projects);