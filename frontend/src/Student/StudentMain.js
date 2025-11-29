// src/screens/StudentMain.js

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../context/ThemeContext";
import RemixIcon from "react-native-remix-icon";

// Screens
import StudentDashboard from "./StudentDashboard";
import MyCourses from "./MyCourses";
import BrowseCourses from "./BrowseCourses";
import AskDoubt from "./AskDoubt";
import Community from "./Community";


const Tab = createBottomTabNavigator();

export default function StudentMain({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View style={{ flex: 1 }}>

      {/* ⭐ Floating Bard-style AI Button */}
      <TouchableOpacity
        style={[styles.floatingBtn, { backgroundColor: "#3D7BFF" }]}
        onPress={() => navigation.navigate("RoadMap")} // working navigation
      >
        <RemixIcon name="sparkling-line" size={30} color="#fff" />
      </TouchableOpacity>

      {/* ⭐ Bottom Navigation */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
            borderTopColor: isDark ? "#333" : "#DDD",
          },
          tabBarActiveTintColor: "#3D7BFF",
          tabBarInactiveTintColor: isDark ? "#AAA" : "#666",
        }}
      >
        <Tab.Screen
          name="StudentDashboard"
          component={StudentDashboard}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color }) => (
              <RemixIcon name="home-5-line" size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="MyCourses"
          component={MyCourses}
          options={{
            tabBarLabel: "My Courses",
            tabBarIcon: ({ color }) => (
              <RemixIcon name="booklet-line" size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="BrowseCourses"
          component={BrowseCourses}
          options={{
            tabBarLabel: "Browse",
            tabBarIcon: ({ color }) => (
              <RemixIcon name="compass-3-line" size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="AskDoubt"
          component={AskDoubt}
          options={{
            tabBarLabel: "Ask Doubt",
            tabBarIcon: ({ color }) => (
              <RemixIcon name="question-answer-line" size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Community"
          component={Community}
          options={{
            tabBarLabel: "Community",
            tabBarIcon: ({ color }) => (
              <RemixIcon name="team-fill" size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

/* ------------------------------------------- */
/*                 STYLES                      */
/* ------------------------------------------- */

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    zIndex: 999,
  },
});
