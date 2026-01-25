import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import AnimatedCard from "@/components/UI/AnimatedCard";
import { TrendingUp, Scale } from "lucide-react-native";
import { useProgress } from "@/context/ProgressContext";
import { LineChart } from "react-native-chart-kit";

export default function ProgressWidget() {
  const router = useRouter();
  const theme = Colors.dark;
  const { weightLogs, getLatestWeight } = useProgress();

  const latestWeight = getLatestWeight() || "--";

  const latestLog = weightLogs[weightLogs.length - 1];
  const prevLog = weightLogs[weightLogs.length - 2];
  const delta = latestLog && prevLog ? latestLog.weight - prevLog.weight : null;
  const deltaText =
    delta === null ? "--" : `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`;
  const deltaColor =
    delta === null
      ? theme.tabIconDefault
      : delta <= 0
        ? theme.success
        : "#F97316";
  const lastUpdated = latestLog
    ? new Date(latestLog.date).toLocaleDateString()
    : "--";

  // Transform log data for chart
  const chartData = weightLogs.map((log) => log.weight);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          My Progress
        </Text>
        <Pressable onPress={() => router.push("/modal/progress")}>
          <Text style={{ color: theme.tint, fontSize: 14, fontWeight: "bold" }}>
            View All
          </Text>
        </Pressable>
      </View>

      <AnimatedCard onPress={() => router.push("/modal/progress")}>
        <View style={styles.content}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Weight Trend
              </Text>
              <Text style={{ color: theme.tabIconDefault, fontSize: 12 }}>
                Last update: {lastUpdated}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={{ color: theme.text, fontSize: 12 }}>
                {weightLogs.length} logs
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItemLarge}>
              <View style={styles.statLabelRow}>
                <Scale size={14} color={theme.tabIconDefault} />
                <Text style={{ color: theme.tabIconDefault, fontSize: 12 }}>
                  CURRENT WEIGHT
                </Text>
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {latestWeight}{" "}
                <Text style={{ fontSize: 14, color: theme.tabIconDefault }}>
                  kg
                </Text>
              </Text>
            </View>

            <View style={styles.statItemLarge}>
              <View style={styles.statLabelRow}>
                <TrendingUp size={14} color={deltaColor} />
                <Text style={{ color: theme.tabIconDefault, fontSize: 12 }}>
                  CHANGE
                </Text>
              </View>
              <Text style={[styles.statValue, { color: deltaColor }]}>
                {deltaText}{" "}
                <Text style={{ fontSize: 14, color: theme.tabIconDefault }}>
                  kg
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Text style={{ color: theme.tabIconDefault, fontSize: 11 }}>
                Target
              </Text>
              <Text style={{ color: theme.text, fontSize: 13 }}>Lean</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={{ color: theme.tabIconDefault, fontSize: 11 }}>
                Goal
              </Text>
              <Text style={{ color: theme.text, fontSize: 13 }}>-2 kg</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={{ color: theme.tabIconDefault, fontSize: 11 }}>
                Streak
              </Text>
              <Text style={{ color: theme.text, fontSize: 13 }}>3 days</Text>
            </View>
          </View>

          {/* Mini Sparkline Chart */}
          <View style={{ marginTop: 10, height: 70, overflow: "hidden" }}>
            <LineChart
              data={{
                labels: [],
                datasets: [{ data: chartData.length > 0 ? chartData : [0] }],
              }}
              width={300}
              height={70}
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
                color: (opacity = 1) => theme.tint,
                strokeWidth: 3,
                decimalPlaces: 0,
              }}
              bezier
              style={{ paddingRight: 0 }}
            />
          </View>
        </View>
      </AnimatedCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  statItemLarge: {
    flex: 1,
  },
  statLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
  },
  metaPill: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
  },
});
