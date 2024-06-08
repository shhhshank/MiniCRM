const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  source: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Visit", visitSchema);
