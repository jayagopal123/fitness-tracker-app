import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";
import { Search, Filter } from "lucide-react-native";
import { EXERCISES } from "@/constants/Exercises";
import GlassView from "@/components/UI/GlassView";
import AnimatedCard from "@/components/UI/AnimatedCard";
import { LinearGradient } from "expo-linear-gradient";

// Inline simplified component for library items using new style
const LibraryItem = ({
  exercise,
  onPress,
}: {
  exercise: any;
  onPress: () => void;
}) => (
  <AnimatedCard
    onPress={onPress}
    style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
  >
    <View style={styles.iconPlaceholder}>
      <Text style={{ color: "#64748B", fontWeight: "bold" }}>
        {exercise.name[0]}
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.itemTitle}>{exercise.name}</Text>
      <Text style={styles.itemSubtitle}>{exercise.muscle}</Text>
    </View>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{exercise.difficulty}</Text>
    </View>
  </AnimatedCard>
);

export default function LibraryScreen() {
  const router = useRouter();
  const theme = Colors.dark;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryList = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
    "Cardio",
  ];

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((exercise) => {
      const matchesSearch = exercise.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || exercise.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <LinearGradient
        colors={[theme.background, "#1e293b"]}
        style={StyleSheet.absoluteFill}
      />
      <ScreenWrapper>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Library</Text>
        </View>

        <GlassView style={styles.searchContainer}>
          <Search size={20} color={theme.tabIconDefault} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor={theme.tabIconDefault}
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </GlassView>

        <View style={{ height: 50, marginBottom: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {categoryList.map((cat, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      selectedCategory === cat
                        ? theme.tint
                        : "rgba(255,255,255,0.05)",
                    borderColor:
                      selectedCategory === cat
                        ? theme.tint
                        : "rgba(255,255,255,0.1)",
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      selectedCategory === cat ? theme.background : theme.text,
                    fontWeight: "600",
                  }}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {filteredExercises.length === 0 ? (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: theme.tabIconDefault }}>
                No exercises found.
              </Text>
            </View>
          ) : (
            filteredExercises.map((exercise) => (
              <LibraryItem
                key={exercise.id}
                exercise={exercise}
                onPress={() =>
                  router.push({
                    pathname: "/library/[id]",
                    params: { id: exercise.id },
                  })
                }
              />
            ))
          )}
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  itemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  itemSubtitle: {
    color: "#00F0FF",
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
  },
  badgeText: {
    color: "#aaa",
    fontSize: 10,
    textTransform: "uppercase",
  },
});
