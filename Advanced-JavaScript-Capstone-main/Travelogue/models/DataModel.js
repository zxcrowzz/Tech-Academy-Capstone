const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },  // Optional image link
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const DataModel = mongoose.model("Data", DataSchema);
module.exports = DataModel;
