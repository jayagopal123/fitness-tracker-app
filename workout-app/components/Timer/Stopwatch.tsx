import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Play, Pause, RotateCcw } from "lucide-react-native";

export default function Stopwatch({ theme }: { theme: any }) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const toggleTimer = () => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      const startTime = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsed(0);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.timerText, { color: theme.text }]}>
        {formatTime(elapsed)}
      </Text>
      <View style={styles.controls}>
        <Pressable
          style={[styles.button, { backgroundColor: theme.card }]}
          onPress={resetTimer}
        >
          <RotateCcw size={24} color={theme.text} />
        </Pressable>
        <Pressable
          style={[
            styles.playButton,
            { backgroundColor: isRunning ? theme.tint : theme.tint }, // Can change color if needed
          ]}
          onPress={toggleTimer}
        >
          {isRunning ? (
            <Pause size={32} color={theme.background} />
          ) : (
            <Play
              size={32}
              color={theme.background}
              style={{ marginLeft: 4 }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  timerText: {
    fontSize: 64,
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
