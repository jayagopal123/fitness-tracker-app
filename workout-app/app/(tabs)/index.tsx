import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";
import AnimatedCard from "@/components/UI/AnimatedCard";
import GlassView from "@/components/UI/GlassView";
import ProgressWidget from "@/components/Progress/ProgressWidget";
import { PlayCircle, Calendar, Dumbbell, Activity } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { useProgress } from "@/context/ProgressContext";
import { useWorkout } from "@/context/WorkoutContext";

export default function DashboardScreen() {
  const router = useRouter();
  const theme = Colors.dark; // Force dark
  const { weightLogs, getLatestWeight } = useProgress();
  const { history } = useWorkout();

  const chartData = weightLogs.map((log) => log.weight);
  const latestWeight = getLatestWeight() ?? 0;
  const totalMinutes = history.reduce((sum, w) => {
    if (!w.endTime) return sum;
    return sum + Math.round((w.endTime - w.startTime) / 60000);
  }, 0);
  const chartWidth = Dimensions.get("window").width - 64;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Ambient Background Gradient */}
      <LinearGradient
        colors={[theme.background, "#1e293b", theme.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Decorative Blob */}
      <View
        style={[
          styles.blob,
          { backgroundColor: theme.tint, opacity: 0.1, top: -100, left: -100 },
        ]}
      />
      <View
        style={[
          styles.blob,
          { backgroundColor: "#A855F7", opacity: 0.1, top: 200, right: -100 },
        ]}
      />

      <ScreenWrapper>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.header}>
            <Text style={[styles.greeting, { color: theme.tabIconDefault }]}>
              Welcome back
            </Text>
            <Text style={[styles.username, { color: theme.text }]}>
              Spartan
            </Text>
          </View>

          {/* Progress Widget */}
          <ProgressWidget />

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <GlassView style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.tint }]}>
                {history.length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>
                Workouts
              </Text>
            </GlassView>
            <GlassView style={styles.statCard}>
              <Text style={[styles.statValue, { color: "#A855F7" }]}>
                {totalMinutes}
              </Text>
              <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>
                Minutes
              </Text>
            </GlassView>
            <GlassView style={styles.statCard}>
              <Text style={[styles.statValue, { color: "#F472B6" }]}>12</Text>
              <Text style={[styles.statLabel, { color: theme.tabIconDefault }]}>
                Streak
              </Text>
            </GlassView>
          </View>

          {/* Analytics */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Performance Analytics
          </Text>
          <GlassView style={styles.analyticsCard}>
            <View style={styles.analyticsHeader}>
              <View>
                <Text style={[styles.analyticsTitle, { color: theme.text }]}>
                  Weekly Trend
                </Text>
                <Text style={{ color: theme.tabIconDefault, fontSize: 12 }}>
                  Weight & session intensity
                </Text>
              </View>
              <View style={styles.analyticsBadge}>
                <Text style={{ color: theme.text, fontSize: 12 }}>Last 7</Text>
              </View>
            </View>

            <View style={styles.analyticsStats}>
              <View style={styles.analyticsStatItem}>
                <Text style={styles.analyticsLabel}>Current</Text>
                <Text style={[styles.analyticsValue, { color: theme.text }]}>
                  {latestWeight}
                  <Text style={{ fontSize: 12, color: theme.tabIconDefault }}>
                    kg
                  </Text>
                </Text>
              </View>
              <View style={styles.analyticsStatItem}>
                <Text style={styles.analyticsLabel}>Sessions</Text>
                <Text style={[styles.analyticsValue, { color: theme.text }]}>
                  {history.length}
                </Text>
              </View>
              <View style={styles.analyticsStatItem}>
                <Text style={styles.analyticsLabel}>Volume</Text>
                <Text style={[styles.analyticsValue, { color: theme.text }]}>
                  {totalMinutes}
                  <Text style={{ fontSize: 12, color: theme.tabIconDefault }}>
                    min
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.analyticsChart}>
              <LineChart
                data={{
                  labels: [],
                  datasets: [
                    {
                      data: chartData.length > 0 ? chartData : [0],
                    },
                  ],
                }}
                width={chartWidth}
                height={160}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                chartConfig={{
                  backgroundGradientFrom: theme.card,
                  backgroundGradientTo: theme.card,
                  color: (opacity = 1) => `rgba(0, 240, 255, ${opacity})`,
                  strokeWidth: 3,
                  decimalPlaces: 0,
                }}
                bezier
                style={{ borderRadius: 12 }}
              />
            </View>
          </GlassView>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Actions
          </Text>

          <AnimatedCard index={0} onPress={() => router.push("/(tabs)/track")}>
            <View style={styles.actionContent}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: "rgba(0, 240, 255, 0.2)" },
                ]}
              >
                <PlayCircle size={32} color={theme.tint} />
              </View>
              <View>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  Start Training
                </Text>
                <Text
                  style={[styles.cardSubtitle, { color: theme.tabIconDefault }]}
                >
                  Begin your next session
                </Text>
              </View>
            </View>
          </AnimatedCard>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <AnimatedCard
                index={1}
                onPress={() => router.push("/(tabs)/history")}
              >
                <View style={{ alignItems: "center", gap: 12 }}>
                  <Calendar size={28} color="#FACC15" />
                  <Text
                    style={[
                      styles.cardTitle,
                      { color: theme.text, fontSize: 16 },
                    ]}
                  >
                    History
                  </Text>
                </View>
              </AnimatedCard>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <AnimatedCard
                index={2}
                onPress={() => router.push("/(tabs)/library")}
              >
                <View style={{ alignItems: "center", gap: 12 }}>
                  <Dumbbell size={28} color="#4ADE80" />
                  <Text
                    style={[
                      styles.cardTitle,
                      { color: theme.text, fontSize: 16 },
                    ]}
                  >
                    Library
                  </Text>
                </View>
              </AnimatedCard>
            </View>
          </View>

          <Text
            style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}
          >
            Activity Feed
          </Text>

          <AnimatedCard index={3}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  Upper Body Power
                </Text>
                <Text
                  style={[styles.cardSubtitle, { color: theme.tabIconDefault }]}
                >
                  Yesterday • 45 min
                </Text>
              </View>
              <Activity size={20} color={theme.tabIconDefault} />
            </View>
          </AnimatedCard>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  username: {
    fontSize: 40,
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    borderRadius: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    marginLeft: 4,
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  analyticsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  analyticsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  analyticsStats: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  analyticsStatItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  analyticsLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  analyticsValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  analyticsChart: {
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
  },
});
