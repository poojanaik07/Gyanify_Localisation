import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Easing } from "react-native";

export default function Splash({ navigation }) {
  const words = [
    "Gyanify",
    "ग्यानिफ़ाय",
    "গ্যানিফাই",
   " گیانیفائی",
    "ग्यानिफाय",
    "જ્ઞાનિફાય",
    "ग्यानिफाय",
    "గ్యానిఫై",
    "ஜ்ஞானிபை",
    "ಜ್ಞಾನಿಫೈ",
  ];

  const [index, setIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animateWord = () => {
    animatedValue.setValue(0);

    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 250, // fast fade-in
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150, // fast fade-out
        easing: Easing.in(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (index < words.length - 1) {
        setIndex(index + 1);
      } else {
        navigation.replace("SelectLanguage");
      }
    });
  };

  useEffect(() => {
    animateWord();
  }, [index]);

  // Animation values
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0], // quick slide in
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <Animated.Text
        style={[
          styles.text,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        {words[index]}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
    alignItems: "center",
    justifyContent: "center",
  },

  circle1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "#DCEBFF",
    top: -40,
    left: -40,
    opacity: 0.5,
  },

  circle2: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: "#E2F7F5",
    bottom: -50,
    right: -50,
    opacity: 0.45,
  },

  text: {
    fontSize: 46,
    fontWeight: "800",
    color: "#0D2B6F",
  },
});
