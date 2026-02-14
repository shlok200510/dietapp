const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    phone: String,
    treatmentPlan: String,
    roomNumber: String,
    emergencyContact: String,
    allergens: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", PatientSchema);
