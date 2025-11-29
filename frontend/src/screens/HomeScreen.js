import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import RemixIcon from "react-native-remix-icon";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  /* SLIDER IMAGES */
  const sliderImages = [
    require("../assets/images/farming.png"),
    require("../assets/images/beauty.png"),
    require("../assets/images/electrician.png"),
    require("../assets/images/tailoring.png"),
  ];

  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % sliderImages.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setIndex(nextIndex);
    }, 2200);

    return () => clearInterval(interval);
  }, [index]);

  const onScroll = (e) => {
    const slideIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(slideIndex);
  };

  /* TOP CATEGORIES */
  const categoryData = [
    { name: t("home.categories.programming"), icon: "ri-code-box-line" },
    { name: t("home.categories.design"), icon: "ri-paint-brush-line" },
    { name: t("home.categories.business"), icon: "ri-briefcase-line" },
    { name: t("home.categories.photography"), icon: "ri-camera-lens-line" },
    { name: t("home.categories.marketing"), icon: "ri-megaphone-line" },
    { name: t("home.categories.datascience"), icon: "ri-bar-chart-grouped-line" }
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0B1120" : "#F2FAFF" },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ---------------- SLIDER SECTION ---------------- */}
      <View style={styles.sliderWrapper}>
        <FlatList
          ref={flatListRef}
          data={sliderImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={[
                styles.slideImage,
                { backgroundColor: isDark ? "#1E293B" : "#ffffff" },
              ]}
              resizeMode="cover"
            />
          )}
        />

        {/* SLIDER DOTS */}
        <View style={styles.dotsWrapper}>
          {sliderImages.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                index === i ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* ---------------- POPULAR COURSES ---------------- */}
      <Text
        style={[
          styles.sectionTitle,
          { color: isDark ? "#FFFFFF" : "#000000" },
        ]}
      >
        {t("home.popularCourses")}
      </Text>

      <View style={styles.gridWrapper}>
        {[
          {
            title: t("home.popular.masterPhoto"),
            icon: require("../assets/images/Group1.png"),
          },
          {
            title: t("home.popular.creativeWriting"),
            icon: require("../assets/images/Group2.png"),
          },
          {
            title: t("home.popular.basicComputer"),
            icon: require("../assets/images/Group3.png"),
          },
          {
            title: t("home.popular.foodProduction"),
            icon: require("../assets/images/Group4.png"),
          },
        ].map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.card,
              { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
            ]}
          >
            <Image source={item.icon} style={styles.courseIcon} />

            <Text
              style={[
                styles.cardTitle,
                { color: isDark ? "#FFFFFF" : "#000000" },
              ]}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </View>

      {/* ---------------- TOP CATEGORIES ---------------- */}
      <Text
        style={[
          styles.sectionTitle,
          { color: isDark ? "#FFF" : "#000" },
        ]}
      >
        {t("home.topCategories")}
      </Text>

      <View style={styles.gridWrapper}>
        {categoryData.map((cat, idx) => (
          <View
            key={idx}
            style={[
              styles.categoryCard,
              { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
            ]}
          >
            <RemixIcon
              name={cat.icon}
              size={36}
              color={isDark ? "#FFF" : "#000"}
              style={{ marginBottom: 6 }}
            />
            <Text style={{ color: isDark ? "#FFF" : "#000", fontSize: 13 }}>
              {cat.name}
            </Text>
          </View>
        ))}
      </View>

      {/* ---------------- RECOMMENDED ---------------- */}
      <Text
        style={[
          styles.sectionTitle,
          { color: isDark ? "#FFF" : "#000" },
        ]}
      >
        {t("home.recommended")}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          {
            title: t("home.recommend.photoClass"),
            img: require("../assets/images/photo.png"),
          },
          {
            title: t("home.recommend.farming"),
            img: require("../assets/images/farm.png"),
          },
          {
            title: t("home.recommend.cooking"),
            img: require("../assets/images/cooking.png"),
          },
          {
            title: t("home.recommend.electrician"),
            img: require("../assets/images/elect.png"),
          },
        ].map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.recommendCard,
              { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
            ]}
          >
            <Image source={item.img} style={styles.recommendImg} />

            <Text
              style={[
                styles.recommendTitle,
                { color: isDark ? "#FFF" : "#000" },
              ]}
            >
              {item.title}
            </Text>

            <Text style={{ color: isDark ? "#AAB4CF" : "#555", fontSize: 12 }}>
              4.7 ★ • {t("home.beginner")}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* ---------------- CONTINUE LEARNING ---------------- */}
      <Text
        style={[
          styles.sectionTitle,
          { color: isDark ? "#FFF" : "#000" },
        ]}
      >
        {t("home.continueLearning")}
      </Text>

      {[
        { title: t("home.continue.python"), progress: 70 },
        { title: t("home.continue.aiml"), progress: 45 },
      ].map((course, idx) => (
        <View
          key={idx}
          style={[
            styles.continueCard,
            { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
          ]}
        >
          <View style={styles.continueRow}>
            <Image
              source={require("../assets/images/Gyanify_Logo.png")}
              style={styles.continueImg}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: isDark ? "#FFF" : "#000",
                  fontWeight: "600",
                }}
              >
                {course.title}
              </Text>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${course.progress}%`, backgroundColor: isDark ? "#3B82F6" : "#007AFF" },
                  ]}
                />
              </View>

              <Text style={{ color: isDark ? "#AAB4CF" : "#555", fontSize: 12 }}>
                {course.progress}% {t("home.completed")}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* ---------------- TRENDING ---------------- */}
      <Text
        style={[
          styles.sectionTitle,
          { color: isDark ? "#FFF" : "#000" },
        ]}
      >
        {t("home.trending")}
      </Text>

      <View style={styles.gridWrapper}>
        {[
          { title: t("home.trending.react"), img: require("../assets/images/beauty.png") },
          { title: t("home.trending.fullstack"), img: require("../assets/images/photo.png") },
          { title: t("home.trending.cyber"), img: require("../assets/images/photo.png") },
          { title: t("home.trending.chatgpt"), img: require("../assets/images/photo.png") },
        ].map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.trendingCard,
              { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
            ]}
          >
            <Image source={item.img} style={styles.trendingImg} />
            <Text
              style={[
                styles.trendingTitle,
                { color: isDark ? "#FFF" : "#000" },
              ]}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ height: 70 }} />
    </ScrollView>
  );
}

/* -------------------------------------- */
/*                 STYLES                 */
/* -------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },

  /* SLIDER */
  slideImage: {
    width: width,
    height: 200,
    borderRadius: 12,
  },
  sliderWrapper: {
    width: width,
    alignSelf: "center",
  },

  dotsWrapper: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  dot: { height: 8, borderRadius: 6, marginHorizontal: 4 },
  dotActive: { width: 20, backgroundColor: "#007AFF" },
  dotInactive: { width: 8, backgroundColor: "#A0A0A0" },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 25,
    marginBottom: 10,
  },

  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  /* Popular Courses */
  card: {
    width: "48%",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    elevation: 3,
    alignItems: "center",
  },

  courseIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },

  cardTitle: { textAlign: "center", fontSize: 14, fontWeight: "600" },

  /* Top Categories */
  categoryCard: {
    width: "30%",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },

  /* Recommended */
  recommendCard: {
    width: 180,
    padding: 10,
    marginRight: 12,
    borderRadius: 14,
  },
  recommendImg: {
    width: "100%",
    height: 140,
    borderRadius: 12,
  },
  recommendTitle: {
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },

  /* Continue Learning */
  continueCard: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  continueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  continueImg: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 10,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#d1d1d1",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 6,
    marginBottom: 4,
  },

  /* Trending */
  trendingCard: {
    width: "48%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 18,
  },
  trendingImg: {
    width: "100%",
    height: 90,
    borderRadius: 12,
  },
  trendingTitle: {
    marginTop: 8,
    fontWeight: "600",
  },
});
