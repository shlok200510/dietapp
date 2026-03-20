const express = require("express");
const Therapist = require("../models/therapist");
const Session = require("../models/session");

const router = express.Router();

// Get all therapists
router.get("/", async (req, res) => {
    try {
        let therapists = await Therapist.find();
        if (therapists.length === 0) {
            const dummyTherapists = [
                { name: "Dr. Aditi Menon", therapy: "Panchakarma Therapy", phone: "+91 98765 11111" },
                { name: "Dr. Vikram Singh", therapy: "Abhyanga Massage", phone: "+91 87654 22222" },
                { name: "Dr. Sneha Nair", therapy: "Shirodhara", phone: "+91 76543 33333" },
                { name: "Dr. Rakesh Patil", therapy: "Detoxification", phone: "+91 65432 44444" },
                { name: "Dr. Maya Gupta", therapy: "Nasya Therapy", phone: "+91 54321 55555" }
            ];
            await Therapist.insertMany(dummyTherapists);
            therapists = await Therapist.find();
        }
        
        // Transform _id to id for frontend compatibility
        const mappedTherapists = therapists.map(t => ({
            id: t._id,
            name: t.name,
            therapy: t.therapy,
            phone: t.phone
        }));

        res.json(mappedTherapists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific therapist
router.get("/:id", async (req, res) => {
    try {
        const t = await Therapist.findById(req.params.id);
        if (!t) return res.status(404).json({ error: "Therapist not found" });
        res.json({
            id: t._id,
            name: t.name,
            therapy: t.therapy,
            phone: t.phone
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all sessions for a specific therapist
router.get("/:id/sessions", async (req, res) => {
    try {
        const sessions = await Session.find({ therapistId: req.params.id });
        const mappedSessions = sessions.map(s => ({
            id: s._id,
            therapistId: s.therapistId,
            patientId: s.patientId,
            patientName: s.patientName,
            treatment: s.treatment,
            startTime: s.startTime,
            endTime: s.endTime
        }));
        res.json(mappedSessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new session for a therapist
router.post("/:id/sessions", async (req, res) => {
    try {
        const newSession = new Session({
            ...req.body,
            therapistId: req.params.id
        });
        await newSession.save();
        res.status(201).json({
            id: newSession._id,
            ...req.body
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
