import React, { useMemo, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import HistoryItem from "@/components/HistoryItem";
import { useWorkout, Workout } from "@/context/WorkoutContext";

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { history, refreshHistory } = useWorkout();

  useFocusEffect(
    useCallback(() => {
      refreshHistory();
    }, [refreshHistory]),
  );

  // Helper to format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper to format duration
  const formatDuration = (start: number, end?: number) => {
    if (!end) return "In Progress";
    const diff = end - start;
    const minutes = Math.floor(diff / 60000);
    return `${minutes} min`;
  };

  const groupedHistory = useMemo(() => {
    const groups: { [key: string]: Workout[] } = {};
    [...history]
      .sort((a, b) => b.startTime - a.startTime)
      .forEach((workout) => {
        const dateKey = formatDate(workout.startTime);
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(workout);
      });
    return groups;
  }, [history]);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>History</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={{ color: theme.tabIconDefault }}>
              No workouts logged yet.
            </Text>
          </View>
        ) : (
          Object.entries(groupedHistory)
            .sort(
              ([dateA], [dateB]) =>
                new Date(dateB).getTime() - new Date(dateA).getTime(),
            )
            .map(([date, workouts]) => (
              <View key={date}>
                <Text
                  style={[
                    styles.sectionHeader,
                    { color: theme.tabIconDefault },
                  ]}
                >
                  {date}
                </Text>
                <View
                  style={[
                    styles.listContainer,
                    { backgroundColor: theme.card },
                  ]}
                >
                  {workouts.map((workout) => (
                    <HistoryItem
                      key={workout.id}
                      title={
                        workout.exercises.map((e) => e.name).join(", ") ||
                        "Untitled Workout"
                      }
                      date={new Date(workout.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      duration={formatDuration(
                        workout.startTime,
                        workout.endTime,
                      )}
                    />
                  ))}
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  listContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
