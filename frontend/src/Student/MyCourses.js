import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import StudHeader from "../components/StudHeader";

export default function MyCourses({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const courses = [
    {
      id: 1,
      title: "Physics: Mechanics and Motion",
      description:
        "Understand the fundamentals of classical mechanics and Newton’s laws",
      instructor: "Dr. Anita Desai",
      lectures: 20,
      duration: "5 weeks",
      languagesAvailable: 4,
      tags: ["Physics", "English", "Hindi", "+2"],
    },
    {
      id: 2,
      title: "Indian History: Ancient Civilizations",
      description:
        "Journey through ancient India – from Indus Valley to Mauryan Empire",
      instructor: "Dr. Meera Reddy",
      lectures: 16,
      duration: "4 weeks",
      languagesAvailable: 6,
      tags: ["History", "English", "Hindi", "+4"],
    },
  ];

  return (
    <>
      <StudHeader />

      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0B1120" : "#F2FAFF" },
        ]}
      >
        {/* HEADER */}
        <Text style={[styles.header, { color: isDark ? "#fff" : "#000" }]}>
          My Courses
        </Text>
        <Text style={[styles.subHeader, { color: isDark ? "#ccc" : "#666" }]}>
          Continue your learning journey
        </Text>

        {/* COURSE CARDS */}
        {courses.map((course) => (
          <View
            key={course.id}
            style={[
              styles.card,
              { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
            ]}
          >
            {/* TAGS */}
            <View style={styles.tagRow}>
              {course.tags.map((tag, index) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    { backgroundColor: isDark ? "#0F172A" : "#E5EAF1" },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: isDark ? "#BBD1FF" : "#333" },
                    ]}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>

            {/* TITLE */}
            <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
              {course.title}
            </Text>

            {/* DESCRIPTION */}
            <Text
              style={[styles.description, { color: isDark ? "#ccc" : "#555" }]}
            >
              {course.description}
            </Text>

            {/* INSTRUCTOR */}
            <View style={styles.row}>
              <Text style={styles.icon}>👩‍🏫</Text>
              <Text style={[styles.meta, { color: isDark ? "#BBD1FF" : "#555" }]}>
                By {course.instructor}
              </Text>
            </View>

            {/* LECTURES & DURATION */}
            <View style={styles.row}>
              <Text style={styles.icon}>📚</Text>
              <Text style={[styles.meta, { color: isDark ? "#BBD1FF" : "#555" }]}>
                {course.lectures} Lectures
              </Text>

              <Text style={{ marginHorizontal: 10, color: isDark ? "#888" : "#666" }}>
                •
              </Text>

              <Text style={styles.icon}>⏳</Text>
              <Text style={[styles.meta, { color: isDark ? "#BBD1FF" : "#555" }]}>
                {course.duration}
              </Text>
            </View>

            {/* LANGUAGE INFO */}
            <View style={styles.row}>
              <Text style={styles.icon}>🌐</Text>
              <Text
                style={[
                  styles.meta,
                  { color: isDark ? "#FFB4C2" : "#E63950" },
                ]}
              >
                Available in {course.languagesAvailable} languages
              </Text>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
              ]}
              onPress={() =>
                navigation.navigate("LearningPage", { course })
              }
            >
              <Text style={styles.buttonText}>Continue Learning</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18 },
  header: { fontSize: 28, fontWeight: "700", marginTop: 40 },
  subHeader: { fontSize: 14, marginBottom: 20 },

  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },

  tagRow: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },

  tag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },

  tagText: { fontSize: 12, fontWeight: "600" },

  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },

  description: { fontSize: 14, marginBottom: 14, lineHeight: 20 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  icon: { fontSize: 14, marginRight: 6 },

  meta: { fontSize: 14, fontWeight: "500" },

  button: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
