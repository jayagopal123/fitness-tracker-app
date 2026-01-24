import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";
import GlassView from "@/components/UI/GlassView";
import AnimatedCard from "@/components/UI/AnimatedCard";
import {
  X,
  Camera,
  Ruler,
  Activity,
  Dumbbell,
  Calendar,
} from "lucide-react-native";
import { useProgress } from "@/context/ProgressContext";
import { LineChart } from "react-native-chart-kit";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const SAMPLE_1RM = [
  "Barbell Bench Press",
  "Squat",
  "Deadlift",
  "Overhead Press",
];

export default function ProgressModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = Colors.dark;
  const {
    weightLogs,
    measurements,
    photos,
    logWeight,
    addPhoto,
    getOneRepMax,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<"stats" | "photos" | "analytics">(
    (params.tab as "stats" | "photos" | "analytics") || "stats",
  );

  const [newWeight, setNewWeight] = useState("");

  const handleWeightLog = () => {
    if (newWeight && !isNaN(parseFloat(newWeight))) {
      logWeight(parseFloat(newWeight));
      setNewWeight("");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      addPhoto(result.assets[0].uri, "front");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <LinearGradient
        colors={[theme.background, "#1e293b"]}
        style={StyleSheet.absoluteFill}
      />
      <ScreenWrapper>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Your Journey
          </Text>
          <Pressable onPress={() => router.back()} style={styles.closeBtn}>
            <X size={24} color={theme.text} />
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(["stats", "photos", "analytics"] as const).map((tab) => (
            <Pressable
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && {
                  borderBottomColor: theme.tint,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={{
                  color: activeTab === tab ? theme.tint : theme.tabIconDefault,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {activeTab === "stats" && (
            <View style={styles.section}>
              <GlassView style={styles.chartContainer}>
                <Text style={styles.cardHeader}>Weight Trend</Text>
                <Text style={styles.cardHeader}>Weight Trend</Text>
                <LineChart
                  data={{
                    labels: weightLogs
                      .map((log) => new Date(log.date).getDate().toString())
                      .filter((_, i) => i % 2 === 0), // Reduce labels
                    datasets: [
                      {
                        data:
                          weightLogs.length > 0
                            ? weightLogs.map((l) => l.weight)
                            : [0],
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 40}
                  height={220}
                  yAxisSuffix="kg"
                  chartConfig={{
                    backgroundColor: theme.background,
                    backgroundGradientFrom: "#1e293b",
                    backgroundGradientTo: "#0F172A",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 240, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: theme.tint,
                    },
                  }}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                />
              </GlassView>

              <GlassView style={[styles.inputCard, { marginTop: 20 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    placeholder="Enter current weight (kg)"
                    placeholderTextColor={theme.tabIconDefault}
                    style={[styles.mainInput, { color: theme.text }]}
                    keyboardType="numeric"
                    value={newWeight}
                    onChangeText={setNewWeight}
                  />
                  <Pressable
                    style={[styles.logBtn, { backgroundColor: theme.tint }]}
                    onPress={handleWeightLog}
                  >
                    <Text
                      style={{ fontWeight: "bold", color: theme.background }}
                    >
                      LOG
                    </Text>
                  </Pressable>
                </View>
              </GlassView>
            </View>
          )}

          {activeTab === "photos" && (
            <View style={styles.section}>
              <AnimatedCard
                onPress={pickImage}
                style={{
                  alignItems: "center",
                  padding: 30,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderColor: theme.border,
                }}
              >
                <Camera size={40} color={theme.tint} />
                <Text style={{ color: theme.tabIconDefault, marginTop: 12 }}>
                  Tap to upload progress photo
                </Text>
              </AnimatedCard>

              <View style={styles.gallery}>
                {photos.length === 0 ? (
                  <Text
                    style={{
                      color: theme.tabIconDefault,
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    No photos yet.
                  </Text>
                ) : (
                  photos.map((photo) => (
                    <View key={photo.id} style={styles.photoFrame}>
                      <Image source={{ uri: photo.uri }} style={styles.photo} />
                      <Text style={styles.photoDate}>
                        {new Date(photo.date).toLocaleDateString()}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            </View>
          )}

          {activeTab === "analytics" && (
            <View style={styles.section}>
              <Text
                style={[styles.subHeading, { color: theme.tabIconDefault }]}
              >
                1 Rep Max Estimates
              </Text>

              {SAMPLE_1RM.map((exercise, index) => {
                const max = getOneRepMax(exercise);
                return (
                  <GlassView
                    key={index}
                    style={{
                      marginBottom: 12,
                      padding: 16,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <Dumbbell
                        size={20}
                        color={index % 2 === 0 ? theme.tint : "#F472B6"}
                      />
                      <Text
                        style={{
                          color: theme.text,
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        {exercise}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: theme.text,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {max > 0 ? max : "--"}{" "}
                      <Text
                        style={{ fontSize: 12, color: theme.tabIconDefault }}
                      >
                        kg
                      </Text>
                    </Text>
                  </GlassView>
                );
              })}

              <GlassView style={{ marginTop: 20, padding: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Activity size={24} color={theme.success} />
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Volume Consistency
                  </Text>
                </View>
                <Text style={{ color: theme.tabIconDefault, lineHeight: 22 }}>
                  You are in the top 10% of users this week! Keep pushing your
                  limits on the compound lifts to see your estimated 1RM grow.
                </Text>
              </GlassView>
            </View>
          )}
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  closeBtn: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  section: {
    width: "100%",
  },
  chartContainer: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 10,
  },
  cardHeader: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  inputCard: {
    padding: 16,
  },
  mainInput: {
    flex: 1,
    fontSize: 18,
    padding: 8,
  },
  logBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },
  photoFrame: {
    width: "48%",
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoDate: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    textAlign: "center",
    padding: 4,
    fontSize: 10,
  },
  subHeading: {
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: "600",
  },
});
