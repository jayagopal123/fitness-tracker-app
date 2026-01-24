import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";
import { API_URL } from "@/constants/Config";

export type WorkoutSet = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export type WorkoutExercise = {
  id: string; // unique instance id
  exerciseId: string;
  name: string;
  sets: WorkoutSet[];
};

export type Workout = {
  id: string;
  startTime: number;
  endTime?: number;
  exercises: WorkoutExercise[];
  status: "preparing" | "active" | "finished";
};

type WorkoutContextType = {
  currentWorkout: Workout | null;
  history: Workout[];
  startWorkout: () => void;
  startTimer: () => void;
  finishWorkout: () => void;
  addExercise: (exerciseId: string, name: string) => void;
  removeExercise: (exerciseInstanceId: string) => void;
  addSet: (exerciseInstanceId: string) => void;
  removeSet: (exerciseInstanceId: string, setId: string) => void;
  updateSet: (
    exerciseInstanceId: string,
    setId: string,
    field: "weight" | "reps" | "completed",
    value: string | boolean,
  ) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [history, setHistory] = useState<Workout[]>([]);

  // load history from backend
  React.useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHistory(data);
        }
      })
      .catch((err) => console.log("Failed to fetch history:", err));
  }, []);

  const startWorkout = () => {
    if (currentWorkout) return;
    setCurrentWorkout({
      id: generateId(),
      startTime: Date.now(), // Will be reset when timer starts
      exercises: [],
      status: "preparing",
    });
  };

  const startTimer = () => {
    setCurrentWorkout((prev) => {
      if (!prev) return null;
      return { ...prev, status: "active", startTime: Date.now() };
    });
  };

  const finishWorkout = async () => {
    if (!currentWorkout) return;
    const finishedWorkout = {
      ...currentWorkout,
      endTime: Date.now(),
      status: "finished" as const,
    };

    // Optimistic update
    setHistory((prev) => [finishedWorkout, ...prev]);
    setCurrentWorkout(null);

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finishedWorkout),
      });
    } catch (error) {
      Alert.alert("Sync Error", "Could not save workout to backend.");
      console.error(error);
    }
  };

  const addExercise = (exerciseId: string, name: string) => {
    if (!currentWorkout) return;
    const newExercise: WorkoutExercise = {
      id: generateId(),
      exerciseId,
      name,
      sets: [
        {
          id: generateId(),
          weight: "",
          reps: "",
          completed: false,
        },
      ],
    };

    setCurrentWorkout((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        exercises: [...prev.exercises, newExercise],
      };
    });
  };

  const removeExercise = (exerciseInstanceId: string) => {
    setCurrentWorkout((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        exercises: prev.exercises.filter((ex) => ex.id !== exerciseInstanceId),
      };
    });
  };

  const addSet = (exerciseInstanceId: string) => {
    setCurrentWorkout((prev) => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.id === exerciseInstanceId) {
          // Copy previous set values for convenience
          const lastSet = ex.sets[ex.sets.length - 1];
          return {
            ...ex,
            sets: [
              ...ex.sets,
              {
                id: generateId(),
                weight: lastSet ? lastSet.weight : "",
                reps: lastSet ? lastSet.reps : "",
                completed: false,
              },
            ],
          };
        }
        return ex;
      });
      return { ...prev, exercises: updatedExercises };
    });
  };

  const removeSet = (exerciseInstanceId: string, setId: string) => {
    setCurrentWorkout((prev) => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.id === exerciseInstanceId) {
          return {
            ...ex,
            sets: ex.sets.filter((s) => s.id !== setId),
          };
        }
        return ex;
      });
      return { ...prev, exercises: updatedExercises };
    });
  };

  const updateSet = (
    exerciseInstanceId: string,
    setId: string,
    field: "weight" | "reps" | "completed",
    value: string | boolean,
  ) => {
    setCurrentWorkout((prev) => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.id === exerciseInstanceId) {
          const updatedSets = ex.sets.map((s) => {
            if (s.id === setId) {
              return { ...s, [field]: value };
            }
            return s;
          });
          return { ...ex, sets: updatedSets };
        }
        return ex;
      });
      return { ...prev, exercises: updatedExercises };
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        history,
        startWorkout,
        startTimer,
        finishWorkout,
        addExercise,
        removeExercise,
        addSet,
        removeSet,
        updateSet,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
