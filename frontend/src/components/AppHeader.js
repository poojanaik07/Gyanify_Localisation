// src/components/AppHeader.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import RemixIcon from "react-native-remix-icon";
import { useTranslation } from "react-i18next";

export default function AppHeader() {
  // ✅ ALL HOOKS MUST BE HERE — TOP OF FUNCTION
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation();

  const isDark = theme === "dark";

  // --------------------------------------
  // RETURN STARTS HERE
  // --------------------------------------
  return (
    <>
      {/* HEADER */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? "#0B1120" : "#FFFFFF",
            shadowColor: isDark ? "#000" : "#CCC",
          },
        ]}
      >
        {/* Left Section */}
        <View style={styles.left}>
          <Image
            source={require("../assets/images/Gyanify_Logo.png")}
            style={styles.logo}
          />
          <Text
            style={[
              styles.title,
              { color: isDark ? "#4DA3FF" : "#007AFF" },
            ]}
          >
            {t("header.appName")}
          </Text>
        </View>

        {/* Right Section */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
         
        

          {/* Profile Icon */}
          <TouchableOpacity
            onPress={() => setShowPopup(true)}
            style={[styles.iconWrapper, { marginLeft: 6 }]}
          >
            <RemixIcon
              name="ri-account-circle-line"
              size={35}
              color={isDark ? "#FFF" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* DARKEN BACKDROP: tap outside to close */}
      {showPopup && (
        <Pressable style={styles.backdrop} onPress={() => setShowPopup(false)} />
      )}

      {/* POPUP MENU */}
      {showPopup && (
        <View style={styles.popupContainer}>
          <View
            style={[
              styles.popup,
              {
                backgroundColor: isDark
                  ? "rgba(20,25,35,0.92)"
                  : "rgba(255,255,255,0.93)",
              },
            ]}
          >
            {/* View Profile */}
            <TouchableOpacity
              style={styles.popupRow}
              onPress={() => {
                setShowPopup(false);
                navigation.navigate("MyProfile");
              }}
            >
              <View style={styles.popupItem}>
                <RemixIcon
                  name="user-3-line"
                  size={22}
                  color={isDark ? "#FFF" : "#000"}
                />
                <Text
                  style={[
                    styles.popupText,
                    { color: isDark ? "#FFF" : "#000" },
                  ]}
                >
                  {t("header.login")}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              style={styles.popupRow}
              onPress={() => {
                setShowPopup(false);
                navigation.navigate("Settings");
              }}
            >
              <View style={styles.popupItem}>
                <RemixIcon
                  name="settings-3-line"
                  size={22}
                  color={isDark ? "#FFF" : "#000"}
                />
                <Text
                  style={[
                    styles.popupText,
                    { color: isDark ? "#FFF" : "#000" },
                  ]}
                >
                  {t("header.settings")}
                </Text>
              </View>
            </TouchableOpacity>

  
            
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 42,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 6,
  },
  left: { flexDirection: "row", alignItems: "center" },
  logo: { width: 50, height: 50, resizeMode: "contain", marginRight: 10 },
  title: { fontSize: 24, fontWeight: "700" },
  iconWrapper: { padding: 6, borderRadius: 50 },
  popupContainer: {
    position: "absolute",
    top: 90,
    right: 20,
    zIndex: 999,
  },
  popup: {
    width: 190,
    paddingVertical: 8,
    borderRadius: 16,
    elevation: 10,
  },
  popupRow: { paddingVertical: 12, paddingHorizontal: 14 },
  popupItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  popupText: { fontSize: 16, fontWeight: "500" },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
