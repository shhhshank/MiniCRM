const mongoose = require('mongoose')

const communicationLogSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "campaign" },
    status: String,
    email: String,
    message: String
});

module.exports = mongoose.model("communication_log", communicationLogSchema, "communication_log");