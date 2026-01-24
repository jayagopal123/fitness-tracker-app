import React, { useMemo } from "react";
import { StyleSheet, Pressable, ViewStyle, StyleProp } from "react-native";
import { MotiView } from "moti";
import GlassView from "./GlassView";

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function AnimatedCard({
  children,
  index = 0,
  onPress,
  style,
}: AnimatedCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 500,
        delay: index * 100, // Stagger effect
      }}
    >
      {onPress ? (
        <Pressable onPress={onPress}>
          <GlassView style={[styles.card, style]}>{children}</GlassView>
        </Pressable>
      ) : (
        <GlassView style={[styles.card, style]}>{children}</GlassView>
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
  },
});
