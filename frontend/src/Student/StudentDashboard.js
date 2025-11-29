// src/screens/StudentDashboard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";   // <-- i18n hook
import StudHeader from "../components/StudHeader";

export default function StudentDashboard({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();  // <-- translation function

  const stats = [
    { label: t("dashboard.coursesEnrolled"), value: 8 },
    { label: t("dashboard.completedLectures"), value: 126 },
    { label: t("dashboard.certificatesEarned"), value: 3 },
    { label: t("dashboard.pendingAssignments"), value: 4 },
  ];

  const progressItems = [
    { label: "Python Basics", percent: 80 },
    { label: "Web Development", percent: 56 },
    { label: "AI Fundamentals", percent: 40 },
  ];

  return (
    <>
      <StudHeader />

      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0B1120" : "#F2FAFF" },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          {t("dashboard.title")}
        </Text>

        <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#666" }]}>
          {t("dashboard.subtitle")}
        </Text>

        {/* QUICK ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
            ]}
            onPress={() => navigation.navigate("MyCourses")}
          >
            <Text style={styles.actionText}>{t("dashboard.continueLearning")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionBtn2,
              { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
            ]}
            onPress={() => navigation.navigate("AskDoubt")}
          >
            <Text
              style={[
                styles.actionText2,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {t("dashboard.askDoubt")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* STATS GRID */}
        <View style={styles.statsWrapper}>
          {stats.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.statCard,
                { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
              ]}
            >
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? "#BBD1FF" : "#555" },
                ]}
              >
                {item.label}
              </Text>

              <Text
                style={[
                  styles.statValue,
                  { color: isDark ? "#fff" : "#000" },
                ]}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* COURSE PROGRESS */}
        <View
          style={[
            styles.progressCard,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
        >
          <Text style={[styles.progressTitle, { color: isDark ? "#fff" : "#000" }]}>
            {t("dashboard.courseProgress")}
          </Text>

          <Text
            style={[
              styles.progressSubtitle,
              { color: isDark ? "#BBD1FF" : "#555" },
            ]}
          >
            {t("dashboard.continueWhereLeft")}
          </Text>

          {progressItems.map((item, idx) => (
            <View key={idx} style={{ marginTop: 16 }}>
              <View style={styles.progressRow}>
                <Text
                  style={[
                    styles.progressLabel,
                    { color: isDark ? "#fff" : "#000" },
                  ]}
                >
                  {item.label}
                </Text>

                <Text
                  style={[
                    styles.progressPercent,
                    { color: isDark ? "#ccc" : "#666" },
                  ]}
                >
                  {item.percent}%
                </Text>
              </View>

              {/* Progress bar */}
              <View
                style={[
                  styles.progressBar,
                  { backgroundColor: isDark ? "#0F172A" : "#E5EAF1" },
                ]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.percent}%`,
                      backgroundColor: isDark ? "#3B82F6" : "#007AFF",
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18 },
  title: { fontSize: 26, fontWeight: "700", marginTop: 40 },
  subtitle: { fontSize: 14, marginBottom: 20 },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  actionBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },
  actionBtn2: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  actionText2: { fontSize: 15, fontWeight: "700" },

  statsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
  },
  statLabel: { fontSize: 14, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: "700" },

  progressCard: {
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
    elevation: 3,
  },
  progressTitle: { fontSize: 20, fontWeight: "700" },
  progressSubtitle: { marginTop: 4, fontSize: 13 },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: { fontSize: 14, fontWeight: "600" },
  progressPercent: { fontSize: 14 },

  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 6,
  },
  progressFill: { height: "100%", borderRadius: 10 },
});
