const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters"],
    },
    image: {
      publicId: String,
      url: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

user.pre('save', async function (next) {
  if (!this.isModified('password')) {
      next()
  }

  this.password = await bcrypt.hash(this.password, 10)
}) 

user.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", user);
