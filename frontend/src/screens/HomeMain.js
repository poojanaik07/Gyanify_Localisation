// src/screens/HomeMain.js

import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";   // <-- added
import RemixIcon from "react-native-remix-icon";

// Screens
import HomeScreen from "./HomeScreen";
import LearnMain from "./LearnMain";
import AppHeader from "../components/AppHeader";

const Tab = createBottomTabNavigator();

export default function HomeMain({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();   // <-- translation hook

  const isDark = theme === "dark";

  return (
    <View style={{ flex: 1 }}>
      {/* ⭐ Global Header */}
      <AppHeader />

      {/* ⭐ Bottom Navigation */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 62,
            backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
            borderTopColor: isDark ? "#333" : "#DDD",
          },
          tabBarActiveTintColor: "#3B82F6",
          tabBarInactiveTintColor: isDark ? "#AAA" : "#666",
        }}
      >
        {/* ---------------- HOME TAB ---------------- */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: t("tabs.home"),   // <-- translated
            tabBarIcon: ({ color }) => (
              <RemixIcon name="home-5-line" size={24} color={color} />
            ),
          }}
        />

        {/* ---------------- LEARN TAB ---------------- */}
        <Tab.Screen
          name="Learn"
          component={LearnMain}
          options={{
            tabBarLabel: t("tabs.learn"),   // <-- translated
            tabBarIcon: ({ color }) => (
              <RemixIcon name="book-open-line" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

/* -------------------------------------- */
/*               STYLES                   */
/* -------------------------------------- */

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 80,
    right: 22,
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },

    elevation: 10,
    zIndex: 999,
  },
});
