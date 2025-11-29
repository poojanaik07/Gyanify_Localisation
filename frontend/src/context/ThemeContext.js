// src/context/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  // Load saved theme on app start
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("appTheme");
        if (savedTheme) setTheme(savedTheme);
      } catch (e) {
        console.log("Failed to load saved theme:", e);
      }
    })();
  }, []);

  // Toggle theme
  const toggleTheme = async () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      await AsyncStorage.setItem("appTheme", newTheme);
    } catch (e) {
      console.log("Failed to save theme:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
