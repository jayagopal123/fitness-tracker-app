const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Workout = require("./models/Workout");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/workout-app";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// GET: Fetch all workouts (history)
app.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ startTime: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save a new workout
app.post("/api/workouts", async (req, res) => {
  try {
    const { startTime, endTime, exercises, status } = req.body;
    const newWorkout = new Workout({ startTime, endTime, exercises, status });
    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
