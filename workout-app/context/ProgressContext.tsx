import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import { useWorkout } from "./WorkoutContext";

export type WeightLog = {
  id: string;
  date: number;
  weight: number;
};

export type BodyMeasurement = {
  id: string;
  date: number;
  chest: string;
  waist: string;
  arms: string;
  legs: string;
};

export type ProgressPhoto = {
  id: string;
  date: number;
  uri: string;
  type: "front" | "side" | "back";
};

type ProgressContextType = {
  weightLogs: WeightLog[];
  measurements: BodyMeasurement[];
  photos: ProgressPhoto[];
  logWeight: (weight: number) => void;
  logMeasurement: (data: Omit<BodyMeasurement, "id" | "date">) => void; // Using simplified add
  addPhoto: (uri: string, type: "front" | "side" | "back") => void;
  getOneRepMax: (exerciseName: string) => number;
  getLatestWeight: () => number | null;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { history } = useWorkout();

  // Fake initial data for visualization
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([
    { id: "1", date: Date.now() - 86400000 * 5, weight: 70 },
    { id: "2", date: Date.now() - 86400000 * 3, weight: 69.5 },
    { id: "3", date: Date.now() - 86400000 * 1, weight: 69.2 },
  ]);

  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);

  const logWeight = (weight: number) => {
    const newLog: WeightLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now(),
      weight,
    };
    setWeightLogs((prev) => [...prev, newLog].sort((a, b) => a.date - b.date));
  };

  const logMeasurement = (data: Omit<BodyMeasurement, "id" | "date">) => {
    const newMeas: BodyMeasurement = {
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now(),
      ...data,
    };
    setMeasurements((prev) => [...prev, newMeas]);
  };

  const addPhoto = (uri: string, type: "front" | "side" | "back") => {
    const newPhoto: ProgressPhoto = {
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now(),
      uri,
      type,
    };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const getLatestWeight = () => {
    if (weightLogs.length === 0) return null;
    return weightLogs[weightLogs.length - 1].weight;
  };

  // Calculate 1RM using Epley Formula: Weight * (1 + Reps/30)
  const getOneRepMax = (exerciseName: string) => {
    let max1RM = 0;

    // Scan history for this exercise
    history.forEach((workout) => {
      workout.exercises.forEach((ex) => {
        if (ex.name.toLowerCase().includes(exerciseName.toLowerCase())) {
          ex.sets.forEach((set) => {
            const w = parseFloat(set.weight);
            const r = parseFloat(set.reps);
            if (!isNaN(w) && !isNaN(r) && w > 0 && r > 0) {
              const estimated1RM = w * (1 + r / 30);
              if (estimated1RM > max1RM) max1RM = estimated1RM;
            }
          });
        }
      });
    });

    return Math.round(max1RM * 10) / 10; // Round to 1 decimal
  };

  return (
    <ProgressContext.Provider
      value={{
        weightLogs,
        measurements,
        photos,
        logWeight,
        logMeasurement,
        addPhoto,
        getOneRepMax,
        getLatestWeight,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
