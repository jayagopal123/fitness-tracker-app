import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";
import Stopwatch from "@/components/Timer/Stopwatch";
import IntervalTimer from "@/components/Timer/IntervalTimer";
import { TIMER_TEMPLATES, TimerTemplate } from "@/constants/TimerTemplates";
import { Clock, Timer } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlassView from "@/components/UI/GlassView";
import AnimatedCard from "@/components/UI/AnimatedCard";

export default function TimerScreen() {
  const theme = Colors.dark;

  const [activeTab, setActiveTab] = useState<"stopwatch" | "interval">(
    "stopwatch",
  );
  const [selectedTemplate, setSelectedTemplate] = useState<TimerTemplate>(
    TIMER_TEMPLATES[0],
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Custom Interval State
  const [customWork, setCustomWork] = useState(
    selectedTemplate.work.toString(),
  );
  const [customRest, setCustomRest] = useState(
    selectedTemplate.rest.toString(),
  );
  const [customRounds, setCustomRounds] = useState(
    selectedTemplate.rounds.toString(),
  );

  const handleTemplateSelect = (template: TimerTemplate) => {
    setSelectedTemplate(template);
    setCustomWork(template.work.toString());
    setCustomRest(template.rest.toString());
    setCustomRounds(template.rounds.toString());
    setActiveTab("interval");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <LinearGradient
        colors={[theme.background, "#1e293b"]}
        style={StyleSheet.absoluteFill}
      />
      <ScreenWrapper>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Timer</Text>
        </View>

        {/* Segmented Control */}
        <View style={styles.segmentContainer}>
          <View
            style={[styles.segmentBackground, { backgroundColor: theme.card }]}
          >
            <AnimatedCard
              style={[
                styles.activeSegment,
                {
                  backgroundColor: theme.tint,
                  width: "50%",
                  transform: [
                    { translateX: activeTab === "stopwatch" ? 0 : 100 },
                  ], // Simplified logic, better handled with Reanimated but this is static for now
                },
              ]}
            >
              <View />
            </AnimatedCard>

            <Pressable
              style={styles.segmentButton}
              onPress={() => setActiveTab("stopwatch")}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color:
                      activeTab === "stopwatch"
                        ? theme.background
                        : theme.tabIconDefault,
                  },
                ]}
              >
                STOPWATCH
              </Text>
            </Pressable>
            <Pressable
              style={styles.segmentButton}
              onPress={() => setActiveTab("interval")}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color:
                      activeTab === "interval"
                        ? theme.background
                        : theme.tabIconDefault,
                  },
                ]}
              >
                TIMER
              </Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 40 }}
        >
          {activeTab === "stopwatch" && <Stopwatch theme={theme} />}

          {activeTab === "interval" && (
            <View>
              <IntervalTimer
                theme={theme}
                workTime={selectedTemplate.work}
                restTime={selectedTemplate.rest}
                rounds={selectedTemplate.rounds}
                onEdit={() => setIsEditModalVisible(true)}
              />

              <Text
                style={[styles.sectionTitle, { color: theme.tabIconDefault }]}
              >
                Quick Presets
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
              >
                {TIMER_TEMPLATES.map((template) => (
                  <GlassView
                    key={template.id}
                    style={[
                      styles.templateCard,
                      selectedTemplate.id === template.id
                        ? {
                            borderColor: theme.tint,
                            borderWidth: 1,
                          }
                        : {},
                    ]}
                  >
                    <Pressable onPress={() => handleTemplateSelect(template)}>
                      <Text
                        style={[styles.templateName, { color: theme.text }]}
                      >
                        {template.name}
                      </Text>
                      <Text
                        style={{ color: theme.tabIconDefault, fontSize: 12 }}
                      >
                        {template.work}s / {template.rest}s
                      </Text>
                    </Pressable>
                  </GlassView>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>

        {/* Edit Modal */}
        <Modal
          visible={isEditModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsEditModalVisible(false)}
        >
          <View style={[styles.modalContainer, { backgroundColor: "#1E293B" }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Customize
              </Text>
              <Pressable onPress={() => setIsEditModalVisible(false)}>
                <Text style={{ color: theme.tint, fontSize: 16 }}>Done</Text>
              </Pressable>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.tabIconDefault }]}>
                Work (seconds)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: "rgba(0,0,0,0.3)" },
                ]}
                keyboardType="numeric"
                value={customWork}
                onChangeText={setCustomWork}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.tabIconDefault }]}>
                Rest (seconds)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: "rgba(0,0,0,0.3)" },
                ]}
                keyboardType="numeric"
                value={customRest}
                onChangeText={setCustomRest}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.tabIconDefault }]}>
                Rounds
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: "rgba(0,0,0,0.3)" },
                ]}
                keyboardType="numeric"
                value={customRounds}
                onChangeText={setCustomRounds}
              />
            </View>
          </View>
        </Modal>
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
  segmentContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  segmentBackground: {
    flexDirection: "row",
    height: 50,
    borderRadius: 25,
    width: "90%",
    position: "relative",
    overflow: "hidden",
  },
  activeSegment: {
    position: "absolute",
    height: "100%",
    borderRadius: 25,
    zIndex: 1,
  },
  segmentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  segmentText: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  sectionTitle: {
    marginTop: 40,
    marginBottom: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: 12,
  },
  templateCard: {
    padding: 16,
    minWidth: 140,
  },
  templateName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
});
