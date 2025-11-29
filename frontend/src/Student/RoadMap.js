import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  LayoutAnimation,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import StudHeader from "../components/StudHeader";
import RemixIcon from "react-native-remix-icon";   // <-- Added

export default function Roadmap({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const suggestions = [
    "Python Development",
    "Web Development",
    "AI / Machine Learning",
    "Full-Stack Development",
    "Cybersecurity",
    "Data Science",
  ];

  const generateRoadmap = () => {
    if (!skill) return;

    setLoading(true);
    setRoadmap(null);

    setTimeout(() => {
      setLoading(false);

      setRoadmap({
        title: `Roadmap for ${skill}`,
        steps: [
          "1️⃣ Basics: Learn fundamentals & tools",
          "2️⃣ Core Skills: Build hands-on projects",
          "3️⃣ Advanced Topics",
          "4️⃣ Portfolio Building",
          "5️⃣ Apply for internships / freelance",
        ],
      });
    }, 1400);
  };

  const toggleExpand = () => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(!expanded);
  };

  return (
    <>
      <StudHeader />

      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.navigate("StudentMain")}
      >
        <RemixIcon name="close-line" size={32} color="#4DA3FF" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 22,
        }}
        style={{
          backgroundColor: isDark ? "#0B1120" : "#F2FAFF",
        }}
      >
        {/* HEADER ICON */}
        <View style={styles.center}>
          <Text
            style={{
              fontSize: 50,
              color: isDark ? "#4DA3FF" : "#007AFF",
            }}
          >
            ✨
          </Text>

          <Text
            style={[
              styles.mainTitle,
              { color: isDark ? "#FFF" : "#000" },
            ]}
          >
            AI Learning Roadmap
          </Text>

          <Text
            style={[
              styles.subTitle,
              { color: isDark ? "#AAB4CF" : "#555" },
            ]}
          >
            Get a personalized learning path to achieve your goals
          </Text>
        </View>

        {/* INPUT + BUTTON */}
        <View
          style={[
            styles.inputBox,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
        >
          <TextInput
            value={skill}
            onChangeText={setSkill}
            placeholder="Enter a skill (e.g., Python Development)"
            placeholderTextColor={isDark ? "#AAB4CF" : "#777"}
            style={[
              styles.input,
              { color: isDark ? "#FFF" : "#000" },
            ]}
          />

          <TouchableOpacity
            onPress={generateRoadmap}
            style={[
              styles.button,
              { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
            ]}
          >
            <Text style={styles.buttonText}>Generate Roadmap ✨</Text>
          </TouchableOpacity>
        </View>

        {/* SUGGESTED SKILLS */}
        <Text
          style={[
            styles.suggestionTitle,
            { color: isDark ? "#FFF" : "#000" },
          ]}
        >
          Try these:
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestions.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSkill(item)}
              style={[
                styles.suggestionPill,
                { backgroundColor: isDark ? "#0F172A" : "#E5EAF1" },
              ]}
            >
              <Text
                style={{ color: isDark ? "#BBD1FF" : "#333" }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LOADING ANIMATION */}
        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text
              style={{
                marginTop: 10,
                color: isDark ? "#FFF" : "#000",
              }}
            >
              Generating roadmap...
            </Text>
          </View>
        )}

        {/* GENERATED ROADMAP */}
        {roadmap && (
          <TouchableOpacity
            onPress={toggleExpand}
            style={[
              styles.roadmapCard,
              { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
            ]}
          >
            <Text
              style={[
                styles.roadmapTitle,
                { color: isDark ? "#FFF" : "#000" },
              ]}
            >
              {roadmap.title}
            </Text>

            {expanded && (
              <View style={{ marginTop: 10 }}>
                {roadmap.steps.map((step, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.stepText,
                      { color: isDark ? "#BBD1FF" : "#333" },
                    ]}
                  >
                    {step}
                  </Text>
                ))}
              </View>
            )}

            <Text
              style={{
                marginTop: 10,
                color: isDark ? "#4DA3FF" : "#007AFF",
                fontWeight: "600",
              }}
            >
              {expanded ? "Hide Steps ▲" : "View Steps ▼"}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    position: "absolute",
    top: 100, // below AppHeader
    right: 20,
    zIndex: 999,
    padding: 6,

  },

  center: { alignItems: "center" },

  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },

  subTitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 6,
  },

  inputBox: {
    marginTop: 30,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },

  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 12,
    fontSize: 14,
  },

  button: {
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  suggestionTitle: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },

  suggestionPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
    height: 40,
  },

  loadingBox: {
    marginTop: 30,
    alignItems: "center",
  },

  roadmapCard: {
    marginTop: 30,
    padding: 18,
    borderRadius: 16,
    elevation: 3,
  },

  roadmapTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  stepText: {
    fontSize: 14,
    marginVertical: 6,
  },
});
