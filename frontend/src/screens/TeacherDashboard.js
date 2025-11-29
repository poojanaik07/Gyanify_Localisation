import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function TeacherDashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const stats = [
    { label: "Total Courses", value: 5 },
    { label: "Total Students", value: 342 },
    { label: "Total Lectures", value: 67 },
    { label: "Course Materials", value: 45 },
  ];

  const regions = [
    { name: "North India", students: 125 },
    { name: "South India", students: 98 },
    { name: "West India", students: 76 },
    { name: "East India", students: 43 },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0B1120" : "#F2FAFF" },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* TITLE */}
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Teacher Dashboard
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#666" }]}>
        Manage your courses and track student engagement
      </Text>

      {/* TOP ACTION BUTTONS */}
      <View style={styles.topActions}>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              backgroundColor: isDark ? "#16A34A" : "#17C964",
            },
          ]}
        >
          <Text style={styles.actionText}>Upload Content</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnSecondary,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
        >
          <Text
            style={[
              styles.actionSecondaryText,
              { color: isDark ? "#fff" : "#000" },
            ]}
          >
            Manage Courses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnSecondary,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
        >
          <Text
            style={[
              styles.actionSecondaryText,
              { color: isDark ? "#fff" : "#000" },
            ]}
          >
            View Analytics
          </Text>
        </TouchableOpacity>
      </View>

      {/* STATS CARDS */}
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

      {/* STUDENT DISTRIBUTION */}
      <View
        style={[
          styles.regionCard,
          { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
        ]}
      >
        <Text
          style={[
            styles.regionTitle,
            { color: isDark ? "#FFFFFF" : "#000" },
          ]}
        >
          Student Distribution by Region
        </Text>

        <Text
          style={[
            styles.regionSubtitle,
            { color: isDark ? "#BBD1FF" : "#555" },
          ]}
        >
          See where your students are learning from
        </Text>

        {regions.map((item, idx) => (
          <View key={idx} style={{ marginTop: 16 }}>
            <View style={styles.regionRow}>
              <Text
                style={[
                  styles.regionName,
                  { color: isDark ? "#fff" : "#000" },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.regionCount,
                  { color: isDark ? "#ccc" : "#666" },
                ]}
              >
                {item.students} students
              </Text>
            </View>

            {/* Progress Bar */}
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
                    width: `${(item.students / 125) * 100}%`,
                    backgroundColor: isDark ? "#16A34A" : "#17C964",
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 40,
  },

  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },

  topActions: {
    flexDirection: "column",
    marginBottom: 20,
  },

  actionBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  actionBtnSecondary: {
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  actionSecondaryText: {
    fontSize: 16,
    fontWeight: "600",
  },

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

  statLabel: {
    fontSize: 14,
    marginBottom: 6,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },

  regionCard: {
    padding: 18,
    borderRadius: 16,
    marginTop: 15,
    elevation: 3,
  },

  regionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  regionSubtitle: {
    marginTop: 4,
    fontSize: 13,
  },

  regionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  regionName: {
    fontSize: 14,
    fontWeight: "600",
  },

  regionCount: {
    fontSize: 13,
  },

  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 6,
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
});
