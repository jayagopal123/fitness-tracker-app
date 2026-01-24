import React, { useState, useEffect, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";
import { Plus, Check, Clock, Trash2, X, Play } from "lucide-react-native";
import { useWorkout, WorkoutExercise } from "@/context/WorkoutContext";
import { EXERCISES } from "@/constants/Exercises";
import GlassView from "@/components/UI/GlassView";
import AnimatedCard from "@/components/UI/AnimatedCard";
import { LinearGradient } from "expo-linear-gradient";

// Extracted Component
const ExerciseBlock = memo(
  ({
    exercise,
    theme,
    removeExercise,
    updateSet,
    removeSet,
    addSet,
  }: {
    exercise: WorkoutExercise;
    theme: any;
    removeExercise: (id: string) => void;
    updateSet: (
      exId: string,
      setId: string,
      field: "weight" | "reps" | "completed",
      val: any,
    ) => void;
    removeSet: (exId: string, setId: string) => void;
    addSet: (exId: string) => void;
  }) => (
    <AnimatedCard style={{ padding: 0, overflow: "hidden" }}>
      {/* Header */}
      <View
        style={[
          styles.exerciseHeader,
          { backgroundColor: "rgba(0,0,0,0.2)", padding: 12 },
        ]}
      >
        <Text style={[styles.exerciseName, { color: theme.text }]}>
          {exercise.name}
        </Text>
        <Pressable onPress={() => removeExercise(exercise.id)}>
          <Trash2 size={18} color={theme.danger} />
        </Pressable>
      </View>

      <View style={{ padding: 12 }}>
        {/* Header Row */}
        <View style={styles.setRow}>
          <Text
            style={[
              styles.headerText,
              { flex: 0.5, color: theme.tabIconDefault },
            ]}
          >
            #
          </Text>
          <Text
            style={[
              styles.headerText,
              { flex: 2, color: theme.tabIconDefault, textAlign: "center" },
            ]}
          >
            KG
          </Text>
          <Text
            style={[
              styles.headerText,
              { flex: 2, color: theme.tabIconDefault, textAlign: "center" },
            ]}
          >
            REPS
          </Text>
          <Text
            style={[
              styles.headerText,
              { flex: 1, color: theme.tabIconDefault, textAlign: "center" },
            ]}
          >
            Done
          </Text>
        </View>

        {exercise.sets.map((set, index) => (
          <View
            key={set.id}
            style={[
              styles.setRow,
              {
                borderBottomColor: "rgba(255,255,255,0.05)",
                borderBottomWidth: 1,
                paddingVertical: 12,
              },
            ]}
          >
            <View style={{ flex: 0.5 }}>
              <View
                style={[styles.setNumberBadge, { backgroundColor: theme.tint }]}
              >
                <Text
                  style={{
                    color: theme.background,
                    fontWeight: "bold",
                    fontSize: 10,
                  }}
                >
                  {index + 1}
                </Text>
              </View>
            </View>
            <View style={styles.colInput}>
              <TextInput
                placeholder="0"
                placeholderTextColor="rgba(255,255,255,0.2)"
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: "rgba(0,0,0,0.3)" },
                ]}
                keyboardType="numeric"
                value={set.weight}
                onChangeText={(text) =>
                  updateSet(exercise.id, set.id, "weight", text)
                }
                editable={!set.completed}
              />
            </View>
            <View style={styles.colInput}>
              <TextInput
                placeholder="0"
                placeholderTextColor="rgba(255,255,255,0.2)"
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: "rgba(0,0,0,0.3)" },
                ]}
                keyboardType="numeric"
                value={set.reps}
                onChangeText={(text) =>
                  updateSet(exercise.id, set.id, "reps", text)
                }
                editable={!set.completed}
              />
            </View>
            <View style={styles.colCheck}>
              <Pressable
                onPress={() =>
                  updateSet(exercise.id, set.id, "completed", !set.completed)
                }
                style={[
                  styles.checkBox,
                  {
                    backgroundColor: set.completed
                      ? theme.success
                      : "rgba(255,255,255,0.1)",
                  },
                ]}
              >
                {set.completed && <Check size={14} color="#000" />}
              </Pressable>
            </View>
          </View>
        ))}

        <Pressable
          style={[styles.addSetBtn, { borderColor: theme.border }]}
          onPress={() => addSet(exercise.id)}
        >
          <Plus size={14} color={theme.tabIconDefault} />
          <Text style={[styles.addSetText, { color: theme.tabIconDefault }]}>
            ADD SET
          </Text>
        </Pressable>
      </View>
    </AnimatedCard>
  ),
);

export default function TrackScreen() {
  const router = useRouter();
  const theme = Colors.dark;
  const {
    currentWorkout,
    startWorkout,
    startTimer,
    finishWorkout,
    addExercise,
    removeExercise,
    addSet,
    removeSet,
    updateSet,
  } = useWorkout();

  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentWorkout?.status === "active" && currentWorkout?.startTime) {
      const updateTimer = () => {
        const now = Date.now();
        const diff = now - currentWorkout.startTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        );
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else {
      setElapsedTime("00:00:00");
    }
    return () => clearInterval(interval);
  }, [currentWorkout?.status, currentWorkout?.startTime]);

  const handleSelectExercise = (exerciseId: string, name: string) => {
    addExercise(exerciseId, name);
    setIsModalVisible(false);
  };

  const handleFinish = () => {
    finishWorkout();
    router.push("/(tabs)/history");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={[theme.background, "#1e293b", theme.background]}
        style={StyleSheet.absoluteFill}
      />

      <ScreenWrapper>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Active Session
          </Text>
          {currentWorkout && (
            <GlassView style={styles.timerPill}>
              {currentWorkout.status === "preparing" ? (
                <Pressable
                  onPress={startTimer}
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Play size={16} color={theme.tint} fill={theme.tint} />
                  <Text style={{ color: theme.tint, fontWeight: "bold" }}>
                    START
                  </Text>
                </Pressable>
              ) : (
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Clock size={16} color={theme.tint} />
                  <Text style={[styles.timerText, { color: theme.text }]}>
                    {elapsedTime}
                  </Text>
                </View>
              )}
            </GlassView>
          )}
        </View>

        {!currentWorkout ? (
          <View style={styles.emptyState}>
            <View style={[styles.glow, { backgroundColor: theme.tint }]} />
            <GlassView style={styles.startButtonContainer}>
              <Pressable style={styles.startButton} onPress={startWorkout}>
                <Play size={40} color={theme.text} fill={theme.text} />
              </Pressable>
            </GlassView>
            <Text style={[styles.emptyText, { color: theme.tabIconDefault }]}>
              Tap to start tracking
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {currentWorkout.exercises.length === 0 ? (
              <View style={{ padding: 40, alignItems: "center" }}>
                <Text style={{ color: theme.tabIconDefault }}>
                  No exercises added.
                </Text>
              </View>
            ) : (
              currentWorkout.exercises.map((exercise) => (
                <ExerciseBlock
                  key={exercise.id}
                  exercise={exercise}
                  theme={theme}
                  removeExercise={removeExercise}
                  updateSet={updateSet}
                  removeSet={removeSet}
                  addSet={addSet}
                />
              ))
            )}

            <Pressable
              style={[styles.addExerciseBtn, { borderColor: theme.tint }]}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={[styles.addExerciseText, { color: theme.tint }]}>
                + ADD EXERCISE
              </Text>
            </Pressable>

            <TouchableOpacity activeOpacity={0.8} onPress={handleFinish}>
              <LinearGradient
                colors={[theme.tint, "#3B82F6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.finishBtn}
              >
                <Text style={[styles.finishText, { color: theme.background }]}>
                  FINISH WORKOUT
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* Add Exercise Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContainer, { backgroundColor: "#1E293B" }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Select Exercise
              </Text>
              <Pressable onPress={() => setIsModalVisible(false)}>
                <Text style={{ color: theme.tint, fontSize: 16 }}>Close</Text>
              </Pressable>
            </View>
            <FlatList
              data={EXERCISES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    { borderBottomColor: "rgba(255,255,255,0.1)" },
                  ]}
                  onPress={() => handleSelectExercise(item.id, item.name)}
                >
                  <Text style={[styles.modalItemText, { color: theme.text }]}>
                    {item.name}
                  </Text>
                  <Text style={{ color: theme.tabIconDefault }}>
                    {item.muscle}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  timerPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    fontSize: 16,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  colInput: { flex: 2, alignItems: "center", paddingHorizontal: 6 },
  colCheck: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  setNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  checkBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addSetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "dashed",
    marginTop: 12,
    gap: 8,
  },
  addSetText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  addExerciseBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 24,
    borderStyle: "dashed",
  },
  addExerciseText: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  finishBtn: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  finishText: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    gap: 30,
  },
  startButtonContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.3,
    top: -25,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalItemText: {
    fontSize: 18,
  },
});
