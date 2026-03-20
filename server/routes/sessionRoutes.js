const express = require("express");
const Session = require("../models/session");

const router = express.Router();

// Update a session
router.put("/:id", async (req, res) => {
    try {
        const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            id: updatedSession._id,
            therapistId: updatedSession.therapistId,
            patientId: updatedSession.patientId,
            patientName: updatedSession.patientName,
            treatment: updatedSession.treatment,
            startTime: updatedSession.startTime,
            endTime: updatedSession.endTime
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a session
router.delete("/:id", async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        res.json({ message: "Session deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
