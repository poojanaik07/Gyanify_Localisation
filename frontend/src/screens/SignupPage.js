// src/screens/SignUpPage.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Modal,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function SignUpPage({ navigation }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();


  // ---------------- INPUT STATES ----------------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [stateVal, setStateVal] = useState("");
  const [city, setCity] = useState("");
  const [region] = useState("India");


  // ---------------- STATE LIST ----------------
  const stateList = [
    "Maharashtra", "Gujarat", "Rajasthan", "Goa", "Delhi", "Uttar Pradesh",
    "Karnataka", "Tamil Nadu", "Kerala", "Bihar", "Punjab", "Haryana",
    "West Bengal", "Assam", "Madhya Pradesh", "Telangana",
    "Andhra Pradesh", "Odisha", "Chhattisgarh",
  ];
  const [stateModal, setStateModal] = useState(false);

  // ---------------- POPUP ANIMATION ----------------
  const popupAnim = useRef(new Animated.Value(0)).current;
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("error");

  const showPopup = (msg, type = "error") => {
    setPopupMsg(msg);
    setPopupType(type);

    Animated.timing(popupAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(popupAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    if (!fullName.trim()) return showPopup(t("signup.popup_fullname_error"));

    if (!email.trim()) return showPopup(t("signup.popup_email_required"));


    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return showPopup(t("signup.popup_invalid_email"));

    if (!password.trim()) return showPopup(t("signup.popup_password_empty"));
    if (password.length < 6) return showPopup(t("signup.popup_password_min"));

    if (password !== confirmPassword)
      return showPopup(t("signup.popup_password_not_match"));

  
    if (!stateVal.trim()) return showPopup(t("signup.popup_select_state"));
    if (!city.trim()) return showPopup(t("signup.popup_enter_city"));

    return true;
  };

  // ---------------- SAVE ACCOUNT ----------------
  const handleSignUp = async () => {
    if (!validate()) return;

    const userData = {
      fullName,
      email,
      password,     // <-- IMPORTANT FIX
      state: stateVal,
      city,
      region,
};


    try {
      await AsyncStorage.setItem("USER_DATA", JSON.stringify(userData));
      showPopup(t("signup.popup_account_created"), "success");

      setTimeout(() => navigation.navigate("LoginPage"), 1500);
    } catch (err) {
      showPopup(t("signup.popup_error_saving"), "error");
    }
  };

  // ---------------- REUSABLE DROPDOWN OPTION ----------------
  const renderItem = (item, setter, modalSetter) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        { backgroundColor: isDark ? "#0F172A" : "#F7FAFC" },
      ]}
      onPress={() => {
        setter(item);
        modalSetter(false);
      }}
    >
      <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 16 }}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0B1120" : "#F3FBFF" },
        ]}
      >
        {/* TOP ICON */}
        <View style={styles.iconWrapper}>
          <Image
            source={require("../assets/images/Gyanify_Logo.png")}
            style={[
              styles.topIcon,
              { tintColor: isDark ? "#4DA3FF" : "#2E8CFF" },
            ]}
          />
        </View>

        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          {t("signup.student_portal")}
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#666" }]}>
          {t("signup.access_dashboard")}
        </Text>

        {/* TABS */}
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[
              styles.tab,
              { backgroundColor: isDark ? "#243049" : "#E2EAF3" },
            ]}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={[styles.tabText, { color: isDark ? "#ccc" : "#444" }]}>
              {t("signup.login")}
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.tabActive,
              { backgroundColor: isDark ? "#4DA3FF" : "#2E8CFF" },
            ]}
          >
            <Text style={styles.tabActiveText}>Sign Up</Text>
          </View>
        </View>

        {/* CARD */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1E293B" : "#ffffff" },
          ]}
        >
          <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#000" }]}>
            {t("signup.signup")}
          </Text>

          {/* Full Name */}
          <TextInput
            placeholder={t("signup.full_name")}
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#aaa"
            style={[
              styles.input,
              { backgroundColor: isDark ? "#0F172A" : "#F7FAFC", color: isDark ? "#fff" : "#000" },
            ]}
          />

          {/* Email */}
          <TextInput
            placeholder={t("signup.email")}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#aaa"
            style={[
              styles.input,
              { backgroundColor: isDark ? "#0F172A" : "#F7FAFC", color: isDark ? "#fff" : "#000" },
            ]}
          />

          {/* Password */}
          <TextInput
            placeholder={t("signup.password")}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#aaa"
            style={[
              styles.input,
              { backgroundColor: isDark ? "#0F172A" : "#F7FAFC", color: isDark ? "#fff" : "#000" },
            ]}
          />

          {/* Confirm Password */}
          <TextInput
            placeholder={t("signup.confirm_password")}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#aaa"
            style={[
              styles.input,
              { backgroundColor: isDark ? "#0F172A" : "#F7FAFC", color: isDark ? "#fff" : "#000" },
            ]}
          />

       

          {/* STATE + CITY */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.inputSmall,
                { backgroundColor: isDark ? "#0F172A" : "#F7FAFC" },
              ]}
              onPress={() => setStateModal(true)}
            >
              <Text style={{ color: stateVal ? (isDark ? "#fff" : "#000") : "#888" }}>
                {stateVal || t("signup.state")}
              </Text>
            </TouchableOpacity>

            <TextInput
              placeholder={t("signup.city")}
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#aaa"
              style={[
                styles.inputSmall,
                { backgroundColor: isDark ? "#0F172A" : "#F7FAFC", color: isDark ? "#fff" : "#000" },
              ]}
            />
          </View>

          {/* REGION */}
          <TextInput
            value={t("signup.region")}
            editable={false}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#0F172A" : "#DFF0FF",
                color: isDark ? "#A8D0FF" : "#000",
                opacity: 0.7,
              },
            ]}
          />

          {/* SIGNUP BUTTON */}
          <TouchableOpacity
            style={[
              styles.createBtn,
              { backgroundColor: isDark ? "#22C55E" : "#17C964" },
            ]}
            onPress={handleSignUp}
          >
            <Text style={styles.createBtnText}>{t("signup.create_account_btn")}</Text>
          </TouchableOpacity>
        </View>

        {/* BACK BUTTON */}
        <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 30,
              fontSize: 14,
              color: isDark ? "#4DA3FF" : "#2E8CFF",
            }}
          >
            ← {t("signup.back_to_home")}
          </Text>
        </TouchableOpacity>
      </ScrollView>

     
     

      {/* STATE MODAL */}
      <Modal visible={stateModal} transparent animationType="slide">
        <View style={styles.modalWrap}>
          <View
            style={[
              styles.modalBox,
              { backgroundColor: isDark ? "#1E293B" : "#fff" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {t("signup.select_state")}
            </Text>

            <FlatList
              data={stateList}
              renderItem={({ item }) =>
                renderItem(item, setStateVal, setStateModal)
              }
            />

            <TouchableOpacity onPress={() => setStateModal(false)}>
              <Text
                style={[
                  styles.modalClose,
                  { color: isDark ? "#4DA3FF" : "#2E8CFF" },
                ]}
              >
                {t("signup.close")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* POPUP */}
      <Animated.View
        style={[
          styles.popupBox,
          {
            opacity: popupAnim,
            transform: [
              {
                translateY: popupAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
            ],
            backgroundColor:
              popupType === "error" ? "#FF4D4D" : "#22C55E",
          },
        ]}
      >
        <Text style={styles.popupIcon}>
          {popupType === "error" ? "⚠️" : "✔️"}
        </Text>
        <Text style={styles.popupText}>{popupMsg}</Text>
      </Animated.View>
    </>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1 },

  iconWrapper: { alignItems: "center", marginTop: 40 },
  topIcon: { width: 50, height: 50, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 20 },

  tabWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 50,
    overflow: "hidden",
  },

  tab: { flex: 1, paddingVertical: 10, alignItems: "center" },
  tabActive: { flex: 1, paddingVertical: 10, alignItems: "center" },
  tabActiveText: { fontSize: 16, color: "#fff", fontWeight: "600" },

  card: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
  },
  cardTitle: { fontSize: 20, fontWeight: "700", marginBottom: 10 },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 14,
  },

  inputSmall: {
    width: "48%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 14,
  },

  row: { flexDirection: "row", justifyContent: "space-between" },

  createBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  createBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  // POPUP
  popupBox: {
    position: "absolute",
    right: 20,
    bottom: 40,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
  },
  popupIcon: { fontSize: 18, marginRight: 6, color: "#fff" },
  popupText: { color: "#fff", fontSize: 15, fontWeight: "600" },

  // MODAL
  modalWrap: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    borderRadius: 12,
    padding: 20,
    maxHeight: "70%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
  },

  modalClose: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});
