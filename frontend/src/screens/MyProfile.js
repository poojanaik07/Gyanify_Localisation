// src/screens/MyProfile.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import RemixIcon from "react-native-remix-icon";
import { useTranslation } from "react-i18next";

export default function MyProfile() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { backgroundColor: isDark ? "#0A0F1C" : "#F1F8FF" },
      ]}
    >
      <View style={styles.container}>

        {/* 🔙 BACK BUTTON */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <RemixIcon
            name="arrow-left-s-line"
            size={28}
            color={isDark ? "#E2E8F0" : "#0A1736"}
          />
        </TouchableOpacity>

        {/* Header */}
        <Text style={[styles.title, { color: isDark ? "#E2E8F0" : "#0A1736" }]}>
          {t("profile.choose_portal")}
        </Text>

        <Image
          source={require("../assets/images/Gyanify_Logo.png")}
          style={styles.logo}
        />

        {/* ========= STUDENT ========== */}
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("LoginPage")}
        >
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <RemixIcon name="graduation-cap-fill" size={34} color="#3B82F6" />
            </View>

            <View>
              <Text
                style={[
                  styles.cardTitle,
                  { color: isDark ? "#E2E8F0" : "#0C1B3A" },
                ]}
              >
                {t("profile.student_login")}
              </Text>
              <Text
                style={[
                  styles.cardSubtitle,
                  { color: isDark ? "#B8C5D6" : "#56627A" },
                ]}
              >
                {t("profile.student_subtitle")}
              </Text>
            </View>
          </View>

          <View style={styles.arrowBox}>
            <RemixIcon
              name="arrow-right-s-line"
              size={28}
              color={isDark ? "#9AB6FF" : "#3B82F6"}
            />
          </View>
        </TouchableOpacity>

        {/* ========= TEACHER ========== */}
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("TeacherLogin")}
        >
          <View style={styles.row}>
            <View style={styles.iconCircleTeacher}>
              <RemixIcon name="user-voice-fill" size={34} color="#10B981" />
            </View>

            <View>
              <Text
                style={[
                  styles.cardTitle,
                  { color: isDark ? "#E2E8F0" : "#0C1B3A" },
                ]}
              >
                {t("profile.teacher_login")}
              </Text>
              <Text
                style={[
                  styles.cardSubtitle,
                  { color: isDark ? "#B8C5D6" : "#56627A" },
                ]}
              >
               {t("profile.teacher_subtitle")}
              </Text>
            </View>
          </View>

          <View style={styles.arrowBox}>
            <RemixIcon
              name="arrow-right-s-line"
              size={28}
              color={isDark ? "#9AB6FF" : "#10B981"}
            />
          </View>
        </TouchableOpacity>

        {/* Footer */}
        <Text
          style={[
            styles.footerText,
            { color: isDark ? "#7488A6" : "#5D6D85" },
          ]}
        >
          {t("profile.footer")}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 160, // increased for safe back button spacing
    alignItems: "center",
  },

  /* 🔙 Back button absolute top-left */
  backBtn: {
    position: "absolute",
    top: 50,
    left: 15,
    padding: 8,
    zIndex: 999,
    elevation: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 5,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: "contain",
  },

  card: {
    width: "100%",
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    width: "80%",
  },

  iconCircle: {
    backgroundColor: "rgba(59,130,246,0.15)",
    padding: 14,
    borderRadius: 50,
  },

  iconCircleTeacher: {
    backgroundColor: "rgba(16,185,129,0.15)",
    padding: 14,
    borderRadius: 50,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  cardSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },

  arrowBox: {
    backgroundColor: "rgba(133, 146, 255, 0.12)",
    padding: 10,
    borderRadius: 50,
  },

  footerText: {
    fontSize: 14,
    marginTop: 20,
  },
});
