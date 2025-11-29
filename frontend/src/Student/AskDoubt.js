import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import StudHeader from "../components/StudHeader";
import { useTranslation } from "react-i18next";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AskDoubt() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  // Form fields
  const [course, setCourse] = useState("");
  const [lecture, setLecture] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");

  // Dropdown controls
  const [showCourseList, setShowCourseList] = useState(false);
  const [showLectureList, setShowLectureList] = useState(false);

  // Doubt expand toggle
  const [expanded, setExpanded] = useState(false);

  const courseOptions = ["Python Basics", "Web Dev Bootcamp", "AI Fundamentals"];
  const lectureOptions = ["Lecture 1.1", "Lecture 1.2", "Lecture 2.1"];

  const toggleExpand = () => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(!expanded);
  };

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
      {/* HEADER */}
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        {t("ask_doubt.title")}
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#AAB4CF" : "#666" }]}>
        {t("ask_doubt.subtitle")}
      </Text>

  

      {/* FORM CARD */}
      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
        ]}
      >
        {/* COURSE DROPDOWN */}
        <Text style={[styles.label, { color: isDark ? "#FFF" : "#000" }]}>
          {t("form.select_course")}
        </Text>
        <TouchableOpacity
          style={[
            styles.dropdown,
            { backgroundColor: isDark ? "#0F172A" : "#F7FAFC" },
          ]}
          onPress={() => setShowCourseList(!showCourseList)}
        >
          <Text style={{ color: isDark ? "#FFF" : "#000" }}>
            {course || "Choose a course"}
          </Text>
        </TouchableOpacity>

        {showCourseList &&
          courseOptions.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => {
                setCourse(c);
                setShowCourseList(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={{ color: isDark ? "#FFF" : "#000" }}>{c}</Text>
            </TouchableOpacity>
          ))}

        {/* LECTURE DROPDOWN */}
        <Text style={[styles.label, { color: isDark ? "#FFF" : "#000" }]}>
          {t("form.select_lecture")}
        </Text>
        <TouchableOpacity
          style={[
            styles.dropdown,
            { backgroundColor: isDark ? "#0F172A" : "#F7FAFC" },
          ]}
          onPress={() => setShowLectureList(!showLectureList)}
        >
          <Text style={{ color: isDark ? "#FFF" : "#000" }}>
            {lecture || "Choose lecture"}
          </Text>
        </TouchableOpacity>

        {showLectureList &&
          lectureOptions.map((l) => (
            <TouchableOpacity
              key={l}
              onPress={() => {
                setLecture(l);
                setShowLectureList(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={{ color: isDark ? "#FFF" : "#000" }}>{l}</Text>
            </TouchableOpacity>
          ))}

        {/* TOPIC */}
        <Text style={[styles.label, { color: isDark ? "#FFF" : "#000" }]}>
          {t("form.topic")}
        </Text>
        <TextInput
          value={topic}
          onChangeText={setTopic}
          placeholder={t("form.topic_placeholder")}
          placeholderTextColor={isDark ? "#7C8CAB" : "#999"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#0F172A" : "#F7FAFC",
              color: isDark ? "#FFF" : "#000",
            },
          ]}
        />

        {/* QUESTION */}
        <Text style={[styles.label, { color: isDark ? "#FFF" : "#000" }]}>
          {t("form.your_question")}
        </Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder={t("form.question_placeholder")}
          placeholderTextColor={isDark ? "#7C8CAB" : "#999"}
          multiline
          style={[
            styles.textarea,
            {
              backgroundColor: isDark ? "#0F172A" : "#F7FAFC",
              color: isDark ? "#FFF" : "#000",
            },
          ]}
        />

        {/* ATTACH IMAGE BUTTON */}
        <TouchableOpacity
          style={[
            styles.attachBtn,
            { backgroundColor: isDark ? "#0F172A" : "#E5EAF1" },
          ]}
        >
          <Text
            style={{ color: isDark ? "#BBD1FF" : "#003E9C", fontWeight: "700" }}
          >
            {t("form.attach_image")}
          </Text>
        </TouchableOpacity>

        {/* SUBMIT */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
          ]}
        >
          <Text style={styles.submitText}>{t("form.submit_doubt")}</Text>
        </TouchableOpacity>
      </View>

      {/* MY DOUBTS */}
      <Text
        style={[styles.myDoubtsTitle, { color: isDark ? "#FFF" : "#000" }]}
      >
        {t("my_doubts.title")}
      </Text>

      {/* EXPANDABLE DOUBT CARD */}
      <TouchableOpacity
        style={[
          styles.doubtCard,
          { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
        ]}
        onPress={toggleExpand}
      >
        <View style={styles.doubtHeaderRow}>
          <Text
            style={[
              styles.doubtTitle,
              { color: isDark ? "#FFF" : "#000" },
            ]}
          >
            {t("doubt_card.sample_title")}
          </Text>

          <Text style={{ color: isDark ? "#BBD1FF" : "#555" }}>
            {expanded ? "▲" : "▼"}
          </Text>
        </View>

        {expanded && (
          <>
            <Text
              style={[
                styles.doubtSub,
                { color: isDark ? "#AAB4CF" : "#555" },
              ]}
            >
              {t("doubt_card.sample_sub")}
            </Text>

            <Text
              style={[styles.qLabel, { color: isDark ? "#CCC" : "#444" }]}
            >
              {t("doubt_card.question_label")}
            </Text>
            <Text
              style={[styles.qText, { color: isDark ? "#FFF" : "#111" }]}
            >
              {t("doubt_card.sample_question")}
            </Text>

            <View
              style={[
                styles.divider,
                { backgroundColor: isDark ? "#0F172A" : "#DDD" },
              ]}
            />

            <Text
              style={[
                styles.answerLabel,
                { color: isDark ? "#4ADE80" : "#0F9D58" },
              ]}
            >
              {t("doubt_card.answer_label")}
            </Text>
            <Text
              style={[styles.answerText, { color: isDark ? "#FFF" : "#000" }]}
            >
              {t("doubt_card.sample_answer")}
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  title: { fontSize: 26, fontWeight: "700", marginTop: 40 },
  subtitle: { fontSize: 14, marginBottom: 18 },

  /* STEP INDICATOR */
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  stepBox: {
    padding: 6,
    backgroundColor: "transparent",
  },
  stepText: { fontSize: 12, fontWeight: "700" },

  card: {
    padding: 18,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 20,
  },

  label: { marginBottom: 6, fontSize: 14 },

  dropdown: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  dropdownItem: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },

  input: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 14,
  },

  textarea: {
    padding: 12,
    borderRadius: 10,
    height: 110,
    textAlignVertical: "top",
    marginBottom: 16,
  },

  attachBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 14,
  },

  submitBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  submitText: { color: "#FFF", fontWeight: "700", fontSize: 16 },

  /* MY DOUBTS */
  myDoubtsTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  doubtCard: {
    padding: 18,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 20,
  },

  doubtHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  doubtTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  doubtSub: { fontSize: 13, marginTop: 4 },

  qLabel: { marginTop: 12, fontWeight: "600", fontSize: 14 },
  qText: { marginTop: 4, fontSize: 14 },

  divider: { height: 1, marginVertical: 12 },

  answerLabel: { fontWeight: "700", fontSize: 14 },
  answerText: { marginTop: 4, fontSize: 14 },
});
