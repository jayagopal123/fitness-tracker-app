import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

type IntervalTimerProps = {
  theme: any;
  workTime: number;
  restTime: number;
  rounds: number;
  onEdit: () => void;
};

export default function IntervalTimer({
  theme,
  workTime,
  restTime,
  rounds,
  onEdit,
}: IntervalTimerProps) {
  const [currentRound, setCurrentRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Reset state when props change (template selection)
    resetTimer();
  }, [workTime, restTime, rounds]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isFinished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Phase transition
            if (isWork) {
              if (restTime > 0) {
                setIsWork(false);
                return restTime;
              } else {
                // No rest, go to next round directly
                if (currentRound < rounds) {
                  setCurrentRound((r) => r + 1);
                  return workTime;
                } else {
                  setIsActive(false);
                  setIsFinished(true);
                  return 0;
                }
              }
            } else {
              // Rest finished, start Work or Finish
              if (currentRound < rounds) {
                setCurrentRound((r) => r + 1);
                setIsWork(true);
                return workTime;
              } else {
                setIsActive(false);
                setIsFinished(true);
                return 0;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isFinished, isWork, currentRound, rounds, workTime, restTime]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsFinished(false);
    setCurrentRound(1);
    setIsWork(true);
    setTimeLeft(workTime);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        {isFinished ? (
          <Text style={[styles.phaseText, { color: theme.tint }]}>
            COMPLETED
          </Text>
        ) : (
          <>
            <Text
              style={[
                styles.phaseText,
                { color: isWork ? "#4CAF50" : "#FF9800" }, // Green for work, Orange for rest
              ]}
            >
              {isWork ? "WORK" : "REST"}
            </Text>
            <Text style={[styles.roundText, { color: theme.tabIconDefault }]}>
              Round {currentRound} / {rounds}
            </Text>
          </>
        )}
      </View>

      <Text
        style={[
          styles.timerText,
          { color: isWork ? theme.text : theme.tabIconDefault },
        ]}
      >
        {formatTime(timeLeft)}
      </Text>

      <View style={styles.controls}>
        <Pressable
          style={[styles.button, { backgroundColor: theme.card }]}
          onPress={resetTimer}
        >
          <RotateCcw size={24} color={theme.text} />
        </Pressable>
        {!isFinished && (
          <Pressable
            style={[
              styles.playButton,
              { backgroundColor: isActive ? theme.tint : theme.tint },
            ]}
            onPress={toggleTimer}
          >
            {isActive ? (
              <Pause size={32} color={theme.background} />
            ) : (
              <Play
                size={32}
                color={theme.background}
                style={{ marginLeft: 4 }}
              />
            )}
          </Pressable>
        )}
      </View>

      <Pressable onPress={onEdit} style={{ marginTop: 30 }}>
        <Text style={{ color: theme.tint, fontSize: 16 }}>
          Customize / Edit
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: 20,
    height: 60,
    justifyContent: "center",
  },
  phaseText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: 2,
  },
  roundText: {
    fontSize: 16,
  },
  timerText: {
    fontSize: 80,
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
    marginBottom: 40,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  button: {
    padding: 16,
    borderRadius: 50,
  },
  playButton: {
    padding: 24,
    borderRadius: 50,
  },
});
