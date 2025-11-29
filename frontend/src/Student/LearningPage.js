// src/screens/LearningPage.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import StudHeader from "../components/StudHeader";
import RemixIcon from "react-native-remix-icon";

const { width } = Dimensions.get("window");

export default function LearningPage({ navigation, route }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const safeCourse =
    route?.params?.course || {
      title: "Course Title",
      description: "This is a sample course description.",
      instructor: "Instructor Name",
    };

  const modules = [
    {
      id: 1,
      title: "Basics of Programming",
      lessons: [
        { id: "1-1", title: "What is Programming?", duration: "3:40", desc: "Overview of programming and history." },
        { id: "1-2", title: "Variables & Data Types", duration: "8:20", desc: "Learn about variables, types and usage." },
        { id: "1-3", title: "Operators Overview", duration: "9:15", desc: "Arithmetic and logical operators." },
      ],
    },
    {
      id: 2,
      title: "Core Concepts",
      lessons: [
        { id: "2-1", title: "Conditional Statements", duration: "12:10", desc: "If/else, switch and patterns." },
        { id: "2-2", title: "Loops Deep Dive", duration: "10:22", desc: "For, while and loop control." },
      ],
    },
    {
      id: 3,
      title: "Project & Assessment",
      lessons: [
        { id: "3-1", title: "Mini Project", duration: "18:50", desc: "Build a small CLI project." },
        { id: "3-2", title: "Final Assessment", duration: "Locked", desc: "Final assessment & certificate." },
      ],
    },
  ];

  const [expandedModule, setExpandedModule] = useState(1);
  const [currentLesson, setCurrentLesson] = useState(modules[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [points, setPoints] = useState(0);

  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  const [showCertificate, setShowCertificate] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.4)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  const isLessonUnlocked = (moduleIndex, lessonIndex) => {
    if (moduleIndex === 0 && lessonIndex === 0) return true;

    if (lessonIndex > 0) {
      const prevLesson = modules[moduleIndex].lessons[lessonIndex - 1];
      return completedLessons.includes(prevLesson.id);
    }

    const prevModule = modules[moduleIndex - 1];
    if (!prevModule) return false;

    const prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
    return completedLessons.includes(prevLesson.id);
  };

  const showRewardPopup = (amount) => {
    setRewardAmount(amount);
    setShowReward(true);

    scaleAnim.setValue(0.4);
    opacityAnim.setValue(0);

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const markComplete = () => {
    const cur = currentLesson;
    if (!cur) return;
    if (completedLessons.includes(cur.id)) return;

    const nextCompleted = [...completedLessons, cur.id];
    setCompletedLessons(nextCompleted);

    const award = 10;
    setPoints((p) => p + award);

    showRewardPopup(award);

    let foundModuleIndex = -1;
    let foundLessonIndex = -1;

    modules.forEach((m, mIndex) => {
      const idx = m.lessons.findIndex((l) => l.id === cur.id);
      if (idx !== -1) {
        foundModuleIndex = mIndex;
        foundLessonIndex = idx;
      }
    });

    if (foundModuleIndex === -1) return;

    const module = modules[foundModuleIndex];
    const nextLessonInModule = module.lessons[foundLessonIndex + 1];

    if (nextLessonInModule) {
      setCurrentLesson(nextLessonInModule);
      setExpandedModule(module.id);
      return;
    }

    const nextModule = modules[foundModuleIndex + 1];
    if (nextModule) {
      setExpandedModule(nextModule.id);
      setCurrentLesson(nextModule.lessons[0]);
      return;
    }

    setShowCertificate(true);
  };

  const onSelectLesson = (mIndex, lIndex) => {
    if (!isLessonUnlocked(mIndex, lIndex)) return;
    setCurrentLesson(modules[mIndex].lessons[lIndex]);
    setExpandedModule(modules[mIndex].id);
  };

  return (
    <>
      <StudHeader />

      <View style={[styles.root, { backgroundColor: isDark ? "#0B1120" : "#F2FAFF" }]}>

        <ScrollView contentContainerStyle={{ padding: 16 }}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backAboveVideo}
          >
            <RemixIcon name="arrow-left-line" size={26} color={isDark ? "#fff" : "#000"} />
            <Text style={[styles.backText, { color: isDark ? "#fff" : "#000" }]}>Back</Text>
          </TouchableOpacity>

          <View style={[styles.videoBox, { backgroundColor: isDark ? "#1E293B" : "#EAF2FF" }]}>
            <RemixIcon name="play-circle-line" size={72} color={isDark ? "#3B82F6" : "#007AFF"} />
          </View>

          <Text style={[styles.lessonTitle, { color: isDark ? "#fff" : "#000" }]}>
            {currentLesson.title}
          </Text>

          <Text style={[styles.lessonDesc, { color: isDark ? "#AAB4CF" : "#666" }]}>
            {currentLesson.desc}
          </Text>

          <TouchableOpacity
            onPress={markComplete}
            style={[
              styles.markBtn,
              {
                backgroundColor: completedLessons.includes(currentLesson.id)
                  ? "#16A34A"
                  : (isDark ? "#3B82F6" : "#007AFF"),
              },
            ]}
          >
            <Text style={styles.markBtnText}>
              {completedLessons.includes(currentLesson.id) ? "✔ Completed" : "Mark Complete"}
            </Text>
          </TouchableOpacity>

          <View style={styles.progressWrap}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <Text style={{ marginTop: 6, color: isDark ? "#BBD1FF" : "#555" }}>
            {progress}% Completed
          </Text>

          <Text style={[styles.sectionHeader, { color: isDark ? "#fff" : "#000" }]}>
            Course Content
          </Text>

          {modules.map((module, mIndex) => {
            const moduleCompleted = module.lessons.every((l) =>
              completedLessons.includes(l.id)
            );

            return (
              <View
                key={module.id}
                style={[styles.moduleCard, { backgroundColor: isDark ? "#1E293B" : "#fff" }]}
              >
                <TouchableOpacity
                  style={styles.moduleHeader}
                  onPress={() =>
                    setExpandedModule(expandedModule === module.id ? null : module.id)
                  }
                >
                  <Text style={[styles.moduleTitle, { color: isDark ? "#fff" : "#000" }]}>
                    {module.title}
                  </Text>

                  {moduleCompleted && (
                    <RemixIcon name="checkbox-circle-line" size={18} color="#22C55E" />
                  )}
                </TouchableOpacity>

                {expandedModule === module.id &&
                  module.lessons.map((lesson, lIndex) => {
                    const unlocked = isLessonUnlocked(mIndex, lIndex);
                    const completed = completedLessons.includes(lesson.id);

                    return (
                      <TouchableOpacity
                        key={lesson.id}
                        style={styles.lessonRow}
                        disabled={!unlocked}
                        onPress={() => onSelectLesson(mIndex, lIndex)}
                      >
                        <RemixIcon
                          name={
                            completed
                              ? "checkbox-circle-line"
                              : unlocked
                              ? "play-line"
                              : "lock-line"
                          }
                          size={20}
                          color={
                            completed
                              ? "#22C55E"
                              : unlocked
                              ? (isDark ? "#BBD1FF" : "#333")
                              : "#777"
                          }
                        />

                        <Text
                          style={{
                            marginLeft: 12,
                            fontSize: 15,
                            color: unlocked ? (isDark ? "#D1D5DB" : "#222") : "#777",
                            flex: 1,
                          }}
                        >
                          {lesson.title}
                        </Text>

                        <Text style={{ color: "#999" }}>{lesson.duration}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            );
          })}

          <View style={{ height: 150 }} />
        </ScrollView>

        {/* ===================== REWARD POPUP (Updated Colors Match Theme) ====================== */}
        {showReward && (
          <View style={styles.rewardOverlay}>
            <Animated.View
              style={[
                styles.rewardPopup,
                {
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                  opacity: opacityAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Glow Border */}
              <View
                style={[
                  styles.glowBorder,
                  { borderColor: isDark ? "#3B82F6" : "#007AFF" },
                ]}
              />

              {/* Gift Circle */}
              <View
                style={[
                  styles.giftCircle,
                  { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
                ]}
              >
                <RemixIcon name="gift-line" size={40} color="#fff" />
              </View>

              <Text style={[styles.rewardTitle, { color: isDark ? "#fff" : "#000" }]}>
                🎉 Reward Unlocked!
              </Text>

              <Text
                style={[styles.rewardSubtitle, { color: isDark ? "#AAB4CF" : "#666" }]}
              >
                Congratulations! You earned:
              </Text>

              {/* Points Box */}
              <View
                style={[
                  styles.pointsCard,
                  {
                    backgroundColor: isDark ? "#0F172A" : "#E5EAF1",
                    borderColor: isDark ? "#3B82F6" : "#007AFF",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pointsValue,
                    { color: isDark ? "#FFB4C2" : "#E63950" },
                  ]}
                >
                  {rewardAmount}
                </Text>
                <Text
                  style={[
                    styles.pointsLabel,
                    { color: isDark ? "#AAB4CF" : "#555" },
                  ]}
                >
                  Points
                </Text>
              </View>

              {/* Claim Button */}
              <TouchableOpacity
                style={[
                  styles.claimBtn,
                  { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
                ]}
                onPress={() => setShowReward(false)}
              >
                <Text style={styles.claimText}>Claim Reward</Text>
              </TouchableOpacity>

              {/* Later */}
              <TouchableOpacity onPress={() => setShowReward(false)}>
                <Text
                  style={[
                    styles.laterText,
                    { color: isDark ? "#BBD1FF" : "#333" },
                  ]}
                >
                  I’ll claim later
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}

        {/* ===================== CERTIFICATE POPUP ====================== */}
        {showCertificate && (
          <View style={styles.modalOverlay}>
            <View style={[styles.modalBox, { backgroundColor: isDark ? "#1E293B" : "#fff" }]}>
              <Text style={[styles.modalTitle, { color: isDark ? "#fff" : "#000" }]}>
                🎉 Course Complete!
              </Text>

              <Text style={[styles.modalDesc, { color: isDark ? "#AAB4CF" : "#444" }]}>
                Download your certificate and celebrate your achievement!
              </Text>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#3B82F6" }]}
                onPress={() => setShowCertificate(false)}
              >
                <Text style={styles.modalBtnText}>View Certificate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#22C55E", marginTop: 10 }]}
                onPress={() => setShowCertificate(false)}
              >
                <Text style={styles.modalBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

/* ----------------------------- STYLES ------------------------------ */
const styles = StyleSheet.create({
  root: { flex: 1 },

  backAboveVideo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  backText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
  },

  videoBox: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  lessonTitle: { fontSize: 20, fontWeight: "700", marginTop: 12 },

  lessonDesc: { fontSize: 14, marginTop: 6, lineHeight: 20 },

  markBtn: {
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  markBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  progressWrap: {
    marginTop: 14,
    height: 8,
    backgroundColor: "#0F172A",
    borderRadius: 8,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 8,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
  },

  moduleCard: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },

  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  moduleTitle: { fontSize: 16, fontWeight: "700" },

  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 6,
  },

  /* ---------------- REWARD POPUP ---------------- */
  rewardOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },

  rewardPopup: {
    width: width * 0.82,
    padding: 22,
    borderRadius: 18,
    alignItems: "center",
    position: "relative",
  },

  glowBorder: {
    position: "absolute",
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    borderWidth: 2,
    borderRadius: 20,
    opacity: 0.35,
  },

  giftCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  rewardTitle: { fontSize: 22, fontWeight: "800", marginTop: 10 },

  rewardSubtitle: { fontSize: 14, marginTop: 4 },

  pointsCard: {
    width: "85%",
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1.4,
  },

  pointsValue: { fontSize: 36, fontWeight: "900" },

  pointsLabel: { fontSize: 14 },

  claimBtn: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  claimText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  laterText: {
    marginTop: 12,
    fontSize: 13,
    textDecorationLine: "underline",
  },

  /* ---------------- CERTIFICATE ---------------- */
  modalOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: width * 0.86,
    padding: 18,
    borderRadius: 14,
  },

  modalTitle: { fontSize: 20, fontWeight: "800" },

  modalDesc: { marginTop: 8, fontSize: 14 },

  modalBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  modalBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
