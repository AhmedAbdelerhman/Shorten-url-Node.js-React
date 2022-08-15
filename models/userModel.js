const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true  ,trim: true},
    email: { type: "String", unique: true, required: true ,trim: true},
    password: { type: "String", required: true },
    birthDate: { type: "String" ,trim: true },
    userCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    userMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    pic: {
      type: "String",
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
