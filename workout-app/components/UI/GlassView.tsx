import React from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

interface GlassViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
}

export default function GlassView({
  children,
  style,
  intensity = 20,
}: GlassViewProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Border Gradient */}
      <LinearGradient
        colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Blur Surface */}
      <BlurView
        intensity={intensity}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "rgba(15, 23, 42, 0.6)", // Fallback / Base tint
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  content: {
    // any padding provided by parent style flows here if not careful,
    // but usually parent style applies to container.
  },
});
