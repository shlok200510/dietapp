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
    const patients = await Patient.find();
    res.json(patients);
});

module.exports = router;
