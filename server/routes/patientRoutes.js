const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");

router.post("/register", async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.json({ message: "Patient Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id/medicines", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        
        patient.medicines = req.body.medicines;
        await patient.save();
        
        res.json({ message: "Medicines updated successfully", patient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
