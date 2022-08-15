const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema(
  {
    slug: { type: "String", unique: true, required: true, trim: true },
    ios: {
      primary: {
        type: "String",
        required: true,
        trim: true,
      },
      fallback: {
        type: "String",
        required: true,
        trim: true,
      },
    },
    android: {
      primary: {
        type: "String",
        required: true,
        trim: true,
      },
      fallback: {
        type: "String",
        required: true,
        trim: true,
      },
    },
    web: { type: "String",  required: true, trim: true },
    urlUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Url = mongoose.model("url", UrlSchema);

module.exports = Url;
