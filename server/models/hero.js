const mongoose = require("mongoose");

const hero = new mongoose.Schema({
  type: { type: String },
  banner: {
    image: {
      public_id: { type: String },
      url: { type: String },
    },
    title: { type: String },
    desc: { type: String },
  },
});

module.exports = mongoose.model("Hero", hero);
