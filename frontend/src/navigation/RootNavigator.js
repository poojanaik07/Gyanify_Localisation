import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import SelectLanguage from "../screens/SelectLanguage";
import HomeMain from "../screens/HomeMain";
import MyProfile from "../screens/MyProfile";
import SignUpPage from "../screens/SignupPage";
import LoginPage from "../screens/LoginPage";
import Teacherlogin from "../screens/Teacherlogin";
import TeacherDashboard from "../screens/TeacherDashboard";
import AskDoubt from "../Student/AskDoubt";
import StudentDashboard from "../Student/StudentDashboard";
import MyCourses from "../Student/MyCourses";
import BrowseCourses from "../Student/BrowseCourses";
import Profile from "../Student/Profile";
import StudentMain from "../Student/StudentMain";
import RoadMap from "../Student/RoadMap";
import Community from "../Student/Community";
import LearningPage from "../Student/LearningPage";
import RewardPopup from "../Student/RewardPopup";
import Settings from "../screens/Setting";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
      <Stack.Screen name="HomeMain" component={HomeMain} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="TeacherLogin" component={Teacherlogin} />
      <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
      <Stack.Screen name="AskDoubt" component={AskDoubt} />
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="MyCourses" component={MyCourses} />
      <Stack.Screen name="BrowseCourses" component={BrowseCourses} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="StudentMain" component={StudentMain} />
      <Stack.Screen name="RoadMap" component={RoadMap} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="LearningPage" component={LearningPage} />
      <Stack.Screen name="RewardPopup" component={RewardPopup} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
