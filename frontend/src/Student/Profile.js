// src/screens/MyProfile.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import RemixIcon from "react-native-remix-icon";

export default function Profile({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("USER_DATA");
      if (!stored) return;
      setUser(JSON.parse(stored));
    };
    loadUser();
  }, []);

  if (!user) return null;

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0B1120" : "#F3FBFF" },
      ]}
    >
      {/* 🔙 BACK BUTTON */}
      <TouchableOpacity
        style={[
          styles.backBtn,
          {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.07)",
          },
        ]}
        onPress={() => navigation.goBack()}
      >
        <RemixIcon
          name="arrow-left-s-line"
          size={26}
          color={isDark ? "#E2E8F0" : "#0A1736"}
        />
      </TouchableOpacity>

      {/* PROFILE HEADER */}
      <View
        style={[
          styles.profileCard,
          { backgroundColor: isDark ? "#1E293B" : "#ffffff" },
        ]}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.avatar}
        />

        <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>
          {user.fullName}
        </Text>

        <Text style={[styles.email, { color: isDark ? "#ccc" : "#555" }]}>
          {user.email}
        </Text>

        <Text style={[styles.location, { color: isDark ? "#4DA3FF" : "#2E8CFF" }]}>
          {user.city}, {user.state} · India
        </Text>
      </View>

      {/* REWARDS CARD */}
      <View
        style={[
          styles.rewardCard,
          { backgroundColor: isDark ? "#0F172A" : "#E2F1FF" },
        ]}
      >
        <View>
          <Text style={[styles.rewardTitle, { color: isDark ? "#A8D0FF" : "#004A88" }]}>
            Reward Points
          </Text>
          <Text style={[styles.rewardPoints, { color: isDark ? "#4DA3FF" : "#007AFF" }]}>
            1,250 pts
          </Text>
        </View>
        <RemixIcon
          name="award-line"
          size={36}
          color={isDark ? "#4DA3FF" : "#007AFF"}
        />
      </View>

      {/* PROGRESS BAR */}
      <View
        style={[
          styles.progressCard,
          { backgroundColor: isDark ? "#1E293B" : "#ffffff" },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>
          Learning Progress
        </Text>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: "65%" }]} />
        </View>

        <Text style={[styles.progressPercent, { color: isDark ? "#A8D0FF" : "#333" }]}>
          65% Completed
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {statsBox("Completed", "12", "book-open-line", isDark)}
        {statsBox("Ongoing", "3", "play-circle-line", isDark)}
        {statsBox("Hours Learned", "48h", "time-line", isDark)}
      </View>

      {/* CONTINUE LEARNING */}
      <View
        style={[
          styles.continueCard,
          { backgroundColor: isDark ? "#1E293B" : "#ffffff" },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>
          Continue Learning
        </Text>

        <View style={styles.courseRow}>
          <Image
            source={{
              uri:
                "https://img.freepik.com/premium-vector/online-education-illustration_108061-547.jpg",
            }}
            style={styles.courseThumb}
          />

          <View style={{ flex: 1 }}>
            <Text style={[styles.courseTitle, { color: isDark ? "#fff" : "#000" }]}>
              Python for Beginners
            </Text>

            <View style={styles.progressBarBgSmall}>
              <View style={[styles.progressBarSmall, { width: "40%" }]} />
            </View>

            <Text style={[styles.coursePercent, { color: isDark ? "#A8D0FF" : "#666" }]}>
              40% completed
            </Text>
          </View>
        </View>
      </View>

      {/* OPTIONS */}
      <View
        style={[
          styles.optionsCard,
          { backgroundColor: isDark ? "#1E293B" : "#ffffff" },
        ]}
      >
        {optionRow("Edit Profile", "user-settings-line", isDark)}
        {optionRow("Your Courses", "book-2-line", isDark)}
        {optionRow("Certificates", "medal-line", isDark)}
        {optionRow("Help & Support", "questionnaire-line", isDark)}
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={async () => {
          await AsyncStorage.removeItem("LOGGED_IN");
          await AsyncStorage.removeItem("LOGGED_IN_EMAIL");
          navigation.navigate("LoginPage");
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

// ---------------- HELPERS ----------------
const statsBox = (label, value, icon, isDark) => (
  <View
    style={[
      styles.statBox,
      { backgroundColor: isDark ? "#1E293B" : "#ffffff" },
    ]}
  >
    <RemixIcon name={icon} size={26} color={isDark ? "#4DA3FF" : "#2E8CFF"} />
    <Text style={[styles.statValue, { color: isDark ? "#fff" : "#000" }]}>
      {value}
    </Text>
    <Text style={[styles.statLabel, { color: isDark ? "#ccc" : "#666" }]}>
      {label}
    </Text>
  </View>
);

const optionRow = (label, icon, isDark) => (
  <TouchableOpacity style={styles.optionRow}>
    <RemixIcon name={icon} size={24} color={isDark ? "#4DA3FF" : "#007AFF"} />
    <Text style={[styles.optionText, { color: isDark ? "#fff" : "#000" }]}>
      {label}
    </Text>
    <RemixIcon
      name="arrow-right-s-line"
      size={22}
      color={isDark ? "#888" : "#999"}
      style={{ marginLeft: "auto" }}
    />
  </TouchableOpacity>
);

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1  },

  /* BACK BUTTON */
  backBtn: {
    position: "absolute",
    top: 36,
    left: 16,
    padding: 10,
    borderRadius: 50,
    zIndex: 999,
  },

  // PROFILE HEADER
  profileCard: {
    alignItems: "center",
    paddingVertical: 60,
    
    borderRadius: 20,
    margin: 20,
    marginBottom: 30,
    top : 20,
    elevation: 4,
  },
  avatar: { width: 95, height: 95, borderRadius: 100, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: "800" },
  email: { fontSize: 14 },
  location: { marginTop: 6, fontSize: 14 },

  // REWARDS
  rewardCard: {
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardTitle: { fontSize: 14, fontWeight: "600" },
  rewardPoints: { fontSize: 26, fontWeight: "800" },

  // PROGRESS CARD
  progressCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  progressBarBg: {
    width: "100%",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginTop: 12,
  },
  progressBarFill: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#22C55E",
  },
  progressPercent: { marginTop: 6, fontSize: 14 },

  // STATS
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  statBox: {
    width: "31%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
  },
  statValue: { marginTop: 6, fontSize: 20, fontWeight: "800" },
  statLabel: { fontSize: 12, marginTop: 4 },

  // CONTINUE LEARNING
  continueCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
  },
  courseRow: { flexDirection: "row", marginTop: 10 },
  courseThumb: { width: 80, height: 80, borderRadius: 10, marginRight: 14 },
  courseTitle: { fontSize: 16, fontWeight: "700" },
  progressBarBgSmall: {
    width: "100%",
    height: 8,
    backgroundColor: "#ccc",
    marginTop: 10,
    borderRadius: 10,
  },
  progressBarSmall: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#4DA3FF",
  },
  coursePercent: { fontSize: 12, marginTop: 5 },

  // OPTIONS
  optionsCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionText: { fontSize: 16, marginLeft: 10 },

  // LOGOUT
  logoutBtn: {
    marginTop: 25,
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#FF4444",
    borderRadius: 14,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
