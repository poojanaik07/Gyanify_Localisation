import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

export default function SelectLanguage({ navigation }) {
  const { t } = useTranslation();

  const [selected, setSelected] = useState("en");

  const languages = [
    { label: "English", code: "en" },
    { label: "हिंदी / Hindi", code: "hi" },
    { label: "ગુજરાતી / Gujarati", code: "gu" },
    { label: "मराठी / Marathi", code: "mr" },
    { label: "ಕನ್ನಡ / Kannada", code: "ka" },
    { label: "ਪੰਜਾਬੀ / Punjabi", code: "pa" },
    { label: "اردو / Urdu", code: "ur" }, // <-- Urdu added
  ];

  const handleContinue = async () => {
    await changeLanguage(selected); // 🔥 Save + Apply Language
    navigation.navigate("HomeMain");
  };

  return (
    <View style={styles.container}>
      {/* Floating background circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t("choose_language") || "Choose Language"}</Text>

        <Text style={styles.subtitle}>
          {t("select_language_text") ||
            "Select the language in which you want to use the app."}
        </Text>

        <View style={{ marginTop: 25 }}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => setSelected(lang.code)}
              activeOpacity={0.7}
              style={[
                styles.languageRow,
                selected === lang.code && styles.activeRow,
              ]}
            >
              {/* RADIO BUTTON */}
              <View
                style={[
                  styles.radioOuter,
                  selected === lang.code && { borderColor: "#0D2B6F" },
                ]}
              >
                {selected === lang.code && <View style={styles.radioInner} />}
              </View>

              <Text
                style={[
                  styles.languageText,
                  selected === lang.code && {
                    color: "#0D2B6F",
                    fontWeight: "700",
                  },
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>{t("continue") || "Continue"}</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#F5F8FF",
  },

  circle1: {
    position: "absolute",
    width: 220,
    height: 220,
    backgroundColor: "#DCEBFF",
    borderRadius: 999,
    top: -40,
    left: -40,
    opacity: 0.45,
  },
  circle2: {
    position: "absolute",
    width: 250,
    height: 250,
    backgroundColor: "#E2F7F5",
    borderRadius: 999,
    bottom: -50,
    right: -50,
    opacity: 0.45,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0D2B6F",
    marginBottom: 8,
  },

  subtitle: {
    color: "#555",
    fontSize: 14,
  },

  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    borderColor: "#eaeaea",
  },

  activeRow: {
    backgroundColor: "#EEF4FF",
    borderColor: "#0D2B6F",
  },

  languageText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 12,
    height: 12,
    backgroundColor: "#0D2B6F",
    borderRadius: 6,
  },

  button: {
    backgroundColor: "#0D2B6F",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
