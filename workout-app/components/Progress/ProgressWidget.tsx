import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import GlassView from "@/components/UI/GlassView";
import AnimatedCard from "@/components/UI/AnimatedCard";
import { TrendingUp, Camera, Scale } from "lucide-react-native";
import { useProgress } from "@/context/ProgressContext";
import { LineChart } from "react-native-chart-kit";

export default function ProgressWidget() {
  const router = useRouter();
  const theme = Colors.dark;
  const { weightLogs, getLatestWeight } = useProgress();

  const latestWeight = getLatestWeight() || "--";

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
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 4,
                }}
              >
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
            <View style={styles.statItem}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                <TrendingUp size={14} color={theme.success} />
                <Text style={{ color: theme.tabIconDefault, fontSize: 12 }}>
                  TREND
                </Text>
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>
                -0.8{" "}
                <Text style={{ fontSize: 14, color: theme.tabIconDefault }}>
                  kg
                </Text>
              </Text>
            </View>
          </View>

          {/* Mini Sparkline Chart */}
          <View style={{ marginTop: 10, height: 60, overflow: "hidden" }}>
            <LineChart
              data={{
                labels: [],
                datasets: [{ data: chartData.length > 0 ? chartData : [0] }],
              }}
              width={280}
              height={60}
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

      <View style={styles.quickActions}>
        <GlassView style={styles.actionBtn}>
          <Pressable
            style={styles.pressable}
            onPress={() => router.push("/modal/progress?tab=photos")}
          >
            <Camera size={20} color={theme.text} />
            <Text
              style={{
                color: theme.text,
                marginTop: 4,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              ADD PHOTO
            </Text>
          </Pressable>
        </GlassView>
        <GlassView style={styles.actionBtn}>
          <Pressable
            style={styles.pressable}
            onPress={() => router.push("/modal/progress?tab=weight")}
          >
            <Scale size={20} color={theme.text} />
            <Text
              style={{
                color: theme.text,
                marginTop: 4,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              LOG WEIGHT
            </Text>
          </Pressable>
        </GlassView>
      </View>
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
    //
  },
  stats: {
    flexDirection: "row",
    gap: 20,
  },
  statItem: {},
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 0,
  },
  actionBtn: {
    flex: 1,
    height: 70,
  },
  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
