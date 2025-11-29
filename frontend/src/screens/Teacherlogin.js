import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Teacherlogin({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0B1120" : "#F3FBFF" },
      ]}
    >
      {/* TOP ICON */}
      <View style={styles.iconWrapper}>
        <Image
          source={require("../assets/images/Gyanify_Logo.png")}
          style={[styles.logo, { tintColor: isDark ? "#4DA3FF" : "#2E8CFF" }]}
        />
      </View>

      {/* TITLE */}
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Teacher Portal
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#666" }]}>
        Access your teaching dashboard
      </Text>

      {/* CARD */}
      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
        ]}
      >
        <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#000" }]}>
          Welcome Back, Educator
        </Text>

        <Text style={[styles.cardSub, { color: isDark ? "#ccc" : "#666" }]}>
          Login to manage your courses and content
        </Text>

        {/* EMAIL */}
        <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
          Email
        </Text>
        <TextInput
          placeholder="teacher@example.com"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#0F172A" : "#F7FAFC",
              color: isDark ? "#fff" : "#000",
            },
          ]}
        />

        {/* PASSWORD */}
        <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
          Password
        </Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#0F172A" : "#F7FAFC",
              color: isDark ? "#fff" : "#000",
            },
          ]}
        />

        {/* NOTE BOX */}
        <View
          style={[
            styles.noteBox,
            { backgroundColor: isDark ? "#0F172A" : "#F1F5F9" },
          ]}
        >
          <Text
            style={[
              styles.noteText,
              { color: isDark ? "#ddd" : "#555" },
            ]}
          >
            <Text style={{ fontWeight: "700", color: "#D97706" }}>Note:</Text>{" "}
            Teacher accounts are created by existing teachers. If you need
            access, please contact an administrator.
          </Text>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={[
            styles.loginBtn,
            { backgroundColor: isDark ? "#22C55E" : "#17C964" },
          ]}
          onPress={() => navigation.navigate("TeacherDashboard")}
        >
          <Text style={styles.loginBtnText}>Login to Dashboard</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  iconWrapper: { alignItems: "center", marginTop: 40 },
  logo: { width: 60, height: 60, marginBottom: 10 },

  title: { fontSize: 26, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 24 },

  card: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 5,
  },

  cardTitle: { fontSize: 20, fontWeight: "700" },
  cardSub: { fontSize: 13, marginTop: 4, marginBottom: 20 },

  label: { fontSize: 14, marginBottom: 4 },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 14,
  },

  noteBox: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  noteText: {
    fontSize: 13,
    lineHeight: 18,
  },

  loginBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
