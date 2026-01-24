import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

interface ExerciseCardProps {
  name: string;
  muscle: string;
  difficulty: string;
  onPress?: () => void;
}

export default function ExerciseCard({
  name,
  muscle,
  difficulty,
  onPress,
}: ExerciseCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View
        style={[styles.imagePlaceholder, { backgroundColor: theme.border }]}
      >
        <Text style={{ color: theme.tabIconDefault }}>IMG</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.subtitle, { color: theme.tint }]}>{muscle}</Text>
        <View style={[styles.badge, { borderColor: theme.border }]}>
          <Text style={[styles.badgeText, { color: theme.tabIconDefault }]}>
            {difficulty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    textTransform: "uppercase",
  },
});
