import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { LucideIcon } from "lucide-react-native";

interface DashboardWidgetProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  onPress?: () => void;
  accentColor?: string;
}

export default function DashboardWidget({
  title,
  subtitle,
  icon: Icon,
  onPress,
  accentColor,
}: DashboardWidgetProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const iconColor = accentColor || theme.tint;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View
          style={[styles.iconContainer, { backgroundColor: iconColor + "20" }]}
        >
          <Icon size={24} color={iconColor} />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      </View>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.text + "99" }]}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
});
