import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/homescreen";
import AchievementsScreen from "./screens/achievements";
import NotificationsScreen from "./screens/notification";
import LandingPage from "./screens/landingpage"; // Path to your Landing Page
import SignUp from "./screens/SignUp"; // Path to your Sign Up screen
import Login from "./screens/Login"; // Path to your Log In screen
import AccountScreen from "./screens/profile";
import axios from "axios";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAuth, getAchievements } from "./Redux/auth/thunks";
import { Text } from "react-native";

const Stack = createStackNavigator();

 axios.defaults.baseURL = "http://10.20.224.207:8000/api/v1";
//axios.defaults.baseURL = "http://192.168.245.50:8000/api/v1";

function AppContent() {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          dispatch(checkAuth(token)).then(() => {
            dispatch(getAchievements(token));
          });
        }
      } catch (err) {
        console.log("Error fetching token", err);
      }
    };

    initialize();
  }, [dispatch]);

  if(loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Home" : "LandingPage"}
        screenOptions={{
          headerStyle: { backgroundColor: "#4338ca" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
        }}
      >
        {/* Public Screens */}
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Protected Screens */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
