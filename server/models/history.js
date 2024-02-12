const mongoose = require("mongoose");

const history = new mongoose.Schema({
  imageSrc: {
    public_id: { type: String },
    url: { type: String },
  },
  organisation: { type: String, require: true },
  endDate: { type: String, require: true },
  experiences: { type: String, require: true },
  startDate: { type: String, require: true },
  role: { type: String, require: true },
});

module.exports = mongoose.model("History", history);
