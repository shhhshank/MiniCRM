const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: String,
  state: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("City", citySchema);
