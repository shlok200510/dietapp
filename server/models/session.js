const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
    patientId: { type: String },
    patientName: { type: String, required: true },
    treatment: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

module.exports = mongoose.model("Session", sessionSchema);
