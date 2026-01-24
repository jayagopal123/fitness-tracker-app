import React, { useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { EXERCISES } from "@/constants/Exercises";
import { Dumbbell } from "lucide-react-native";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const exercise = useMemo(() => {
    return EXERCISES.find((e) => e.id === id);
  }, [id]);

  if (!exercise) {
    return (
      <ScreenWrapper>
        <View style={styles.center}>
          <Text style={{ color: theme.text }}>Exercise not found.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={[styles.hero, { backgroundColor: theme.card }]}>
          <Dumbbell size={64} color={theme.tint} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              {exercise.name}
            </Text>
            <View
              style={[
                styles.badge,
                { borderColor: theme.tint, borderWidth: 1 },
              ]}
            >
              <Text style={[styles.badgeText, { color: theme.tint }]}>
                {exercise.difficulty}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: theme.tabIconDefault }]}
            >
              Primary Muscles
            </Text>
            <View style={styles.tagContainer}>
              {exercise.primaryMuscles.map((muscle) => (
                <View
                  key={muscle}
                  style={[styles.tag, { backgroundColor: theme.tint }]}
                >
                  <Text style={[styles.tagText, { color: theme.background }]}>
                    {muscle}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {exercise.secondaryMuscles.length > 0 && (
            <View style={styles.section}>
              <Text
                style={[styles.sectionTitle, { color: theme.tabIconDefault }]}
              >
                Secondary Muscles
              </Text>
              <View style={styles.tagContainer}>
                {exercise.secondaryMuscles.map((muscle) => (
                  <View
                    key={muscle}
                    style={[styles.tag, { backgroundColor: theme.card }]}
                  >
                    <Text style={[styles.tagText, { color: theme.text }]}>
                      {muscle}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: theme.tabIconDefault }]}
            >
              Instructions
            </Text>
            <Text style={[styles.bodyText, { color: theme.text }]}>
              {exercise.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: theme.tabIconDefault }]}
            >
              Benefits
            </Text>
            {exercise.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitRow}>
                <View
                  style={[styles.bullet, { backgroundColor: theme.tint }]}
                />
                <Text style={[styles.bodyText, { color: theme.text }]}>
                  {benefit}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 8,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 1,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontWeight: "600",
    fontSize: 14,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
