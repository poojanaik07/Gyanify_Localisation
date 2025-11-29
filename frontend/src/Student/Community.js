// src/screens/Community.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import RemixIcon from "react-native-remix-icon";
import StudHeader from "../components/StudHeader";

export default function Community() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const posts = [
    {
      id: 1,
      title: "How to optimize Python loops?",
      author: "Rahul S",
      time: "2 hours ago",
      language: "English",
      content:
        "I am working on a large dataset and my loops are taking too long. Any suggestions for optimization?",
      tags: ["Python", "Performance"],
      upvotes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "Best resources for learning React?",
      author: "Priya M",
      time: "5 hours ago",
      language: "Hindi",
      content:
        "Can someone recommend good tutorials or courses for learning React from scratch?",
      tags: ["React", "Web Development"],
      upvotes: 15,
      comments: 12,
    },
    {
      id: 3,
      title: "Database design question",
      author: "Amit K",
      time: "1 day ago",
      language: "English",
      content:
        "Should I use SQL or NoSQL for an e-commerce application? What are the pros and cons?",
      tags: ["Database", "Backend"],
      upvotes: 18,
      comments: 5,
    },
  ];

  return (
    <>
      <StudHeader />

      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0B1120" : "#F8FAFF" },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.headerWrapper}>
            <Text
              style={[styles.headerTitle, { color: isDark ? "#FFFFFF" : "#000" }]}
            >
              Community Forum
            </Text>

            <Text
              style={[
                styles.headerSubtitle,
                { color: isDark ? "#AAB4CF" : "#555" },
              ]}
            >
              Ask questions and help fellow learners
            </Text>

            {/* LANGUAGE + NEW POST ROW */}
            <View style={styles.topActions}>
              {/* Language Selector */}
              <TouchableOpacity
                style={[
                  styles.languageBtn,
                  { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
                ]}
              >
                <RemixIcon
                  name="translate-2"
                  size={18}
                  color={isDark ? "#BBD1FF" : "#000"}
                />
                <Text
                  style={[
                    styles.languageText,
                    { color: isDark ? "#BBD1FF" : "#000" },
                  ]}
                >
                  English
                </Text>
              </TouchableOpacity>

              {/* New Post Button */}
              <TouchableOpacity style={styles.newPostBtn}>
                <RemixIcon name="edit-line" size={18} color="#fff" />
                <Text style={styles.newPostText}>New Post</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* POSTS LIST */}
          {posts.map((post) => (
            <View
              key={post.id}
              style={[
                styles.postCard,
                { backgroundColor: isDark ? "#1E293B" : "#FFFFFF" },
              ]}
            >
              {/* AUTHOR ROW */}
              <View style={styles.authorRow}>
                {/* Initial Avatar */}
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: isDark ? "#0F172A" : "#E2E8F0" },
                  ]}
                >
                  <Text
                    style={[
                      styles.avatarText,
                      { color: isDark ? "#BBD1FF" : "#000" },
                    ]}
                  >
                    {post.author.charAt(0)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.postTitle, { color: isDark ? "#FFFFFF" : "#000" }]}
                    numberOfLines={2}
                  >
                    {post.title}
                  </Text>
                  <Text
                    style={[
                      styles.postMeta,
                      { color: isDark ? "#AAB4CF" : "#666" },
                    ]}
                  >
                    {post.author} • {post.time}
                  </Text>
                </View>

                {/* LANGUAGE TAG */}
                <View
                  style={[
                    styles.languageTag,
                    { backgroundColor: "#3B82F6" }, // accent from AskDoubt
                  ]}
                >
                  <Text style={styles.languageTagText}>{post.language}</Text>
                </View>
              </View>

              {/* CONTENT */}
              <Text
                style={[
                  styles.postContent,
                  { color: isDark ? "#D1D5DB" : "#444" },
                ]}
              >
                {post.content}
              </Text>

              {/* TAGS */}
              <View style={styles.tagRow}>
                {post.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tag,
                      { backgroundColor: isDark ? "#0F172A" : "#1E3A8A" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        { color: isDark ? "#BBD1FF" : "#fff" },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>

              {/* LIKES + COMMENTS */}
              <View style={styles.interactionRow}>
                <View style={styles.interactionItem}>
                  <RemixIcon
                    name="thumb-up-line"
                    size={18}
                    color={isDark ? "#9CA3AF" : "#555"}
                  />
                  <Text
                    style={[
                      styles.interactionText,
                      { color: isDark ? "#AAB4CF" : "#555" },
                    ]}
                  >
                    {post.upvotes}
                  </Text>
                </View>

                <View style={styles.interactionItem}>
                  <RemixIcon
                    name="message-3-line"
                    size={18}
                    color={isDark ? "#9CA3AF" : "#555"}
                  />
                  <Text
                    style={[
                      styles.interactionText,
                      { color: isDark ? "#AAB4CF" : "#555" },
                    ]}
                  >
                    {post.comments}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    </>
  );
}

/* ------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  headerWrapper: {
    marginBottom: 8,
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
  },

  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  topActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  languageBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    elevation: 2,
    gap: 8,
  },

  languageText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 8,
  },

  newPostBtn: {
    flexDirection: "row",
    backgroundColor: "#3B82F6", // accent
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    gap: 8,
  },

  newPostText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 8,
  },

  postCard: {
    padding: 16,
    borderRadius: 15,
    marginTop: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: "700",
  },

  postTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  postMeta: {
    fontSize: 12,
    marginTop: 2,
  },

  languageTag: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  languageTagText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  postContent: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },

  tag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },

  interactionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },

  interactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
  },

  interactionText: {
    fontSize: 14,
    marginLeft: 6,
  },
});
