import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function RewardPopup({ visible, points, onClaim, onLater }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scaleAnim = new Animated.Value(0.5);
  const opacityAnim = new Animated.Value(0);

  if (visible) {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Glow Border */}
        <View
          style={[
            styles.borderGlow,
            { borderColor: isDark ? "#3B82F6" : "#007AFF" },
          ]}
        />

        {/* Gift Circle */}
        <View
          style={[
            styles.giftCircle,
            { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
          ]}
        >
          <RemixIcon name="gift-line" size={42} color="#FFF" />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: isDark ? "#FFF" : "#000" }]}>
          Congratulations!
        </Text>

        {/* Subtitle */}
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? "#AAB4CF" : "#555" },
          ]}
        >
          You've earned a special reward
        </Text>

        {/* Reward Points Box */}
        <View
          style={[
            styles.rewardCard,
            {
              backgroundColor: isDark ? "#0F172A" : "#E5EAF1",
              borderColor: isDark ? "#3B82F6" : "#007AFF",
            },
          ]}
        >
          <Text
            style={[
              styles.pointsText,
              { color: isDark ? "#3B82F6" : "#007AFF" },
            ]}
          >
            {points}
          </Text>

          <Text
            style={[
              styles.pointsLabel,
              { color: isDark ? "#AAB4CF" : "#555" },
            ]}
          >
            Reward Points
          </Text>
        </View>

        {/* Claim Button */}
        <TouchableOpacity
          style={[
            styles.claimBtn,
            { backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
          ]}
          onPress={onClaim}
        >
          <Text style={styles.claimText}>🎉 Claim Reward</Text>
        </TouchableOpacity>

        {/* Later Button */}
        <TouchableOpacity onPress={onLater}>
          <Text
            style={[
              styles.laterText,
              { color: isDark ? "#BBD1FF" : "#333" },
            ]}
          >
            I’ll claim this later
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  box: {
    width: width * 0.82,
    padding: 22,
    borderRadius: 18,
    alignItems: "center",
    position: "relative",
  },

  borderGlow: {
    position: "absolute",
    top: -2, bottom: -2, left: -2, right: -2,
    borderRadius: 20,
    borderWidth: 2,
    opacity: 0.35,
  },

  giftCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  rewardCard: {
    width: "90%",
    paddingVertical: 18,
    marginTop: 20,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.4,
  },

  pointsText: {
    fontSize: 38,
    fontWeight: "800",
  },

  pointsLabel: {
    marginTop: 4,
    fontSize: 14,
  },

  claimBtn: {
    marginTop: 22,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  claimText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  laterText: {
    marginTop: 12,
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
