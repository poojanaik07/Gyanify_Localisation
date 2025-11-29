// src/screens/Settings.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigation = useNavigation();
  const { t } = useTranslation();

  // --- COLOR SYSTEM (MATCHING BrowseCourses EXACTLY) ---
  const COLORS = {
    bg: isDark ? "#0B1120" : "#F2FAFF",
    card: isDark ? "#1E293B" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
    subtext: isDark ? "#BBD1FF" : "#555",
    accent: isDark ? "#3B82F6" : "#007AFF",
    headerSubtitle: isDark ? "#AAB4CF" : "#777",
    border: isDark ? "rgba(180,180,180,0.22)" : "rgba(0,0,0,0.12)",
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: COLORS.bg }]}
      showsVerticalScrollIndicator={false}
    >
      {/* TOP HEADER WITH BACK BUTTON */}
      <View style={[styles.topHeader]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <RemixIcon name="arrow-left-line" size={26} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={[styles.pageTitle, { color: COLORS.text }]}>
          {t("settings.title")}
        </Text>

        <View style={{ width: 30 }} />
      </View>

      {/* HEADER CARD */}
      <View style={[styles.headerCard, { backgroundColor: COLORS.card }]}>
        <RemixIcon
          name="settings-3-line"
          size={40}
          color={COLORS.accent}
        />

        <Text style={[styles.headerTitle, { color: COLORS.text }]}>
           {t("settings.customize_experience")}
        </Text>

        <Text
          style={[styles.headerSubtitle, { color: COLORS.headerSubtitle }]}
        >
          {t("settings.adjust_preferences")}
        </Text>
      </View>

      {/* APPEARANCE SECTION */}
      <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
        {t("settings.appearance")}
      </Text>

      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        
        {/* DARK MODE */}
        <View style={[styles.row, { borderColor: COLORS.border }]}>
          <View style={styles.rowLeft}>
            <RemixIcon name="moon-clear-line" size={24} color={COLORS.text} />
            <Text style={[styles.label, { color: COLORS.text }]}>
              {t("settings.dark_mode")}
            </Text>
          </View>

          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={isDark ? COLORS.accent : "#f4f3f4"}
            trackColor={{ false: "#999", true: COLORS.accent }}
          />
        </View>

        {/* LANGUAGE */}
        <TouchableOpacity
          style={[styles.row, { borderColor: COLORS.border }]}
          onPress={() => navigation.navigate("SelectLanguage")}
        >
          <View style={styles.rowLeft}>
            <RemixIcon name="translate-2" size={24} color={COLORS.text} />
            <Text style={[styles.label, { color: COLORS.text }]}>
              {t("settings.app_language")}
            </Text>
          </View>

          <RemixIcon name="arrow-right-s-line" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* ACCOUNT */}
      <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
       {t("settings.account")}
      </Text>

      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        <TouchableOpacity
          style={[styles.row, { borderColor: COLORS.border }]}
        >
          <View style={styles.rowLeft}>
            <RemixIcon name="user-3-line" size={24} color={COLORS.text} />
            <Text style={[styles.label, { color: COLORS.text }]}>
              {t("settings.edit_profile")}
            </Text>
          </View>
          <RemixIcon name="arrow-right-s-line" size={22} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.row, { borderColor: COLORS.border }]}
        >
          <View style={styles.rowLeft}>
            <RemixIcon
              name="lock-password-line"
              size={24}
              color={COLORS.text}
            />
            <Text style={[styles.label, { color: COLORS.text }]}>
              {t("settings.change_password")}
            </Text>
          </View>
          <RemixIcon name="arrow-right-s-line" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* SUPPORT */}
      <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t("settings.support")}</Text>

      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        <TouchableOpacity
          style={[styles.row, { borderColor: COLORS.border }]}
        >
          <View style={styles.rowLeft}>
            <RemixIcon name="question-line" size={24} color={COLORS.text} />
            <Text style={[styles.label, { color: COLORS.text }]}>
              {t("settings.help_center")}
            </Text>
          </View>
          <RemixIcon name="arrow-right-s-line" size={22} color={COLORS.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.row, { borderColor: COLORS.border }]}
        >
          <View style={styles.rowLeft}>
            <RemixIcon name="mail-send-line" size={24} color={COLORS.text} />
            <Text style={[styles.label, { color: COLORS.text }]}>
              {t("settings.contact_us")}
            </Text>
          </View>
          <RemixIcon name="arrow-right-s-line" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },

  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 52,
    marginBottom: 16,
    justifyContent: "space-between",
  },

  backBtn: {
    padding: 4,
    borderRadius: 10,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  headerCard: {
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 18,
  },

  headerTitle: { fontSize: 20, fontWeight: "700", marginTop: 6 },

  headerSubtitle: { fontSize: 14, marginTop: 4 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 6,
  },

  card: {
    borderRadius: 14,
    paddingVertical: 4,
    marginBottom: 10,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  label: { fontSize: 16, fontWeight: "500" },
});
