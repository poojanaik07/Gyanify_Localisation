import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import StudHeader from "../components/StudHeader";

export default function BrowseCourses() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const allCourses = [
    {
      id: 1,
      title: "Python Basics for Beginners",
      description: "A beginner friendly introduction to Python programming.",
      instructor: "Priya Sharma",
      lectures: 5,
      duration: "07:41",
      image: require("../assets/images/Gyanify_Logo.png"),
      tags: ["Python", "Beginner", "English", "+2"],
      languagesAvailable: 4,
      views: 340,
      category: "Python",
    },
    {
      id: 2,
      title: "Advanced Flask for Backend",
      description: "Master Flask framework and build real-world APIs.",
      instructor: "Dinesh Rao",
      lectures: 8,
      duration: "11:20",
      image: require("../assets/images/Gyanify_Logo.png"),
      tags: ["Backend", "Flask", "API", "+3"],
      languagesAvailable: 3,
      views: 289,
      category: "Web Dev",
    },
    {
      id: 3,
      title: "Machine Learning Zero to Hero",
      description: "Learn ML algorithms, models, and real industry workflows.",
      instructor: "Anita Mehta",
      lectures: 12,
      duration: "14:10",
      image: require("../assets/images/Gyanify_Logo.png"),
      tags: ["AI/ML", "English", "Math", "+1"],
      languagesAvailable: 4,
      views: 458,
      category: "AI/ML",
    },
  ];

  const categories = [
    "All",
    "Python",
    "Web Dev",
    "AI/ML",
    "Data Science",
    "Cloud",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCourses = allCourses.filter((course) => {
    const matchCat =
      selectedCategory === "All" || course.category === selectedCategory;

    const matchSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  const handleEnroll = async (courseId) => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) navigation.navigate("LoginPage");
    else navigation.navigate("MyCourses", { courseId });
  };

  return (
    <>
    <StudHeader />
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0B1120" : "#F2FAFF" },
      ]}
    >
      {/* SEARCH BAR */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDark ? "#1E293B" : "#E9EEF5" },
        ]}
      >
        <Image
          source={require("../assets/images/Gyanify_Logo.png")}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search courses..."
          placeholderTextColor={isDark ? "#AAB4CF" : "#777"}
          style={[styles.searchInput, { color: isDark ? "#FFF" : "#000" }]}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* CATEGORY FILTERS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryItem,
              {
                backgroundColor:
                  selectedCategory === cat
                    ? isDark
                      ? "#3B82F6"
                      : "#007AFF"
                    : isDark
                    ? "#1E293B"
                    : "#E5EAF1",
              },
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    selectedCategory === cat
                      ? "#FFF"
                      : isDark
                      ? "#BBD1FF"
                      : "#333",
                },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TITLE */}
      <Text style={[styles.pageTitle, { color: isDark ? "#FFF" : "#000" }]}>
        Browse Courses
      </Text>

      {/* COURSE CARDS (Same as MyCourses) */}
      {filteredCourses.map((course) => (
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
          <Text style={[styles.title, { color: isDark ? "#FFF" : "#000" }]}>
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
            <Text
              style={[styles.meta, { color: isDark ? "#BBD1FF" : "#555" }]}
            >
              By {course.instructor}
            </Text>
          </View>

          {/* LECTURES & DURATION */}
          <View style={styles.row}>
            <Text style={styles.icon}>📚</Text>
            <Text
              style={[styles.meta, { color: isDark ? "#BBD1FF" : "#555" }]}
            >
              {course.lectures} Lectures
            </Text>

            <Text
              style={{
                marginHorizontal: 10,
                color: isDark ? "#888" : "#666",
              }}
            >
              •
            </Text>

            <Text style={styles.icon}>⏳</Text>
            <Text
              style={[styles.meta, { color: isDark ? "#BBD1FF" : "#555" }]}
            >
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
            onPress={() => handleEnroll(course.id)}
          >
            <Text style={styles.buttonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={{ height: 80 }} />
    </ScrollView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },

  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#666",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },

  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 40,
    marginRight: 10,
    marginBottom: 10,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

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

  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  icon: {
    fontSize: 14,
    marginRight: 6,
  },

  meta: {
    fontSize: 14,
    fontWeight: "500",
  },

  button: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
