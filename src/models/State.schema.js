const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("State", stateSchema);
