const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  totalSpent: Number,
  totalVisits: Number,
  lastVisit: Date,
});

module.exports = mongoose.model("Customer", customerSchema);
