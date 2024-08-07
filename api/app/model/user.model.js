const mongoose = require("mongoose");
const commonSchema = require("./common.schema");
const UserSchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "librarian", "student"],
      default: "student",
    },
    preferredGenres: {
      type: String,
    },

    image: String,
  },
  commonSchema.trigger
);
const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;
