// src/screens/LoginPage.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function LoginPage({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  // ---------------- STATES ----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------------- POPUP SYSTEM ----------------
  const popupAnim = useRef(new Animated.Value(0)).current;
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("error");

  const showPopup = (msg, type = "error") => {
    setPopupMsg(msg);
    setPopupType(type);

    Animated.timing(popupAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(popupAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  };

  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword)
      return showPopup("Please enter email & password");

    try {
      const storedData = await AsyncStorage.getItem("USER_DATA");

      if (!storedData) return showPopup("No account found. Please sign up");

      const user = JSON.parse(storedData);

      if (user.email.toLowerCase() !== cleanEmail)
        return showPopup("Email not registered");

      if (user.password !== cleanPassword)
        return showPopup("Incorrect password");

      showPopup("Login Successful!", "success");

      setTimeout(() => {
        navigation.navigate("StudentMain");
      }, 1200);
    } catch (error) {
      showPopup("Login failed. Try again");
    }
  };

  return (
    <>
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
          {t("login.studentPortal")}
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#666" }]}>
          {t("login.accessDashboard")}
        </Text>

        {/* TABS */}
        <View style={styles.tabWrapper}>
          <View
            style={[
              styles.tabActive,
              { backgroundColor: isDark ? "#4DA3FF" : "#007AFF33" },
            ]}
          >
            <Text style={styles.tabActiveText}>{t("login.login")}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.tab,
              { backgroundColor: isDark ? "#1E293B" : "#E2EAF3" },
            ]}
            onPress={() => navigation.navigate("SignUpPage")}
          >
            <Text style={[styles.tabText, { color: isDark ? "#bbb" : "#555" }]}>
              {t("login.signup")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CARD */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
        >
          <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#000" }]}>
            {t("login.welcomeBack")}
          </Text>
          <Text style={[styles.cardSub, { color: isDark ? "#ccc" : "#666" }]}>
            {t("login.continueJourney")}
          </Text>

          {/* EMAIL */}
          <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
            {t("login.email")}
          </Text>
          <TextInput
            placeholder="student@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
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
            {t("login.password")}
          </Text>
          <TextInput
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#0F172A" : "#F7FAFC",
                color: isDark ? "#fff" : "#000",
              },
            ]}
          />

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={[
              styles.loginBtn,
              { backgroundColor: isDark ? "#22C55E" : "#17C964" },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
            <Text
              style={[
                styles.switchText,
                { color: isDark ? "#4DA3FF" : "#2E8CFF" },
              ]}
            >
             {t("login.switchToSignup")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* BACK */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 30,
              fontSize: 14,
              color: isDark ? "#4DA3FF" : "#2E8CFF",
            }}
          >
            ← {t("login.back")}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* POPUP */}
      <Animated.View
        style={[
          styles.popupBox,
          {
            opacity: popupAnim,
            transform: [
              {
                translateY: popupAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
            ],
            backgroundColor:
              popupType === "error" ? "#FF4D4D" : "#22C55E",
          },
        ]}
      >
        <Text style={styles.popupIcon}>
          {popupType === "error" ? "⚠️" : "✔️"}
        </Text>
        <Text style={styles.popupText}>{popupMsg}</Text>
      </Animated.View>
    </>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1 },

  iconWrapper: { alignItems: "center", marginTop: 40 },
  logo: { width: 50, height: 50, marginBottom: 8 },

  title: { fontSize: 26, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 20 },

  tabWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 50,
    overflow: "hidden",
  },

  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabActive: { flex: 1, paddingVertical: 12, alignItems: "center" },

  tabText: { fontSize: 16 },
  tabActiveText: { fontSize: 16, color: "#000", fontWeight: "700" },

  card: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 5,
  },

  cardTitle: { fontSize: 22, fontWeight: "800" },
  cardSub: { fontSize: 14, marginBottom: 20 },

  label: { fontSize: 14, marginBottom: 4 },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 14,
  },

  loginBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 14,
  },

  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  switchText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },

  popupBox: {
    position: "absolute",
    right: 20,
    bottom: 40,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
  },
  popupIcon: { fontSize: 18, marginRight: 6, color: "#fff" },
  popupText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
