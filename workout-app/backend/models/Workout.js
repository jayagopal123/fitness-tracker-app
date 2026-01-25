const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  weight: String,
  reps: String,
  completed: Boolean,
});

const exerciseSchema = new mongoose.Schema({
  id: String, // Preserving frontend ID just in case
  exerciseId: String,
  name: String,
  sets: [setSchema],
});

const workoutSchema = new mongoose.Schema(
  {
    clientId: { type: String, index: true },
    startTime: { type: Number, required: true },
    endTime: { type: Number },
    exercises: [exerciseSchema],
    status: { type: String, enum: ["active", "finished"], default: "finished" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Workout", workoutSchema);
