const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ayurcare")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const patientRoutes = require("./routes/patientRoutes");
const therapistRoutes = require("./routes/therapistRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

app.use("/api/patients", patientRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/sessions", sessionRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
