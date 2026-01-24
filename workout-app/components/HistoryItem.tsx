import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Clock, Calendar } from "lucide-react-native";

interface HistoryItemProps {
  title: string;
  date: string;
  duration: string;
}

export default function HistoryItem({
  title,
  date,
  duration,
}: HistoryItemProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderBottomColor: theme.border },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Calendar size={14} color={theme.tabIconDefault} />
            <Text style={[styles.metaText, { color: theme.tabIconDefault }]}>
              {date}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.tabIconDefault} />
            <Text style={[styles.metaText, { color: theme.tabIconDefault }]}>
              {duration}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  content: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
});
