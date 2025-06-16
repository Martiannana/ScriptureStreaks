import React, { useState, useEffect } from "react";
import {  View,  Text,  SafeAreaView,  TouchableOpacity,  TextInput,  ScrollView,  StyleSheet,  Image,  AsyncStorage,} from "react-native";
import { Bell, Trophy } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { loadDailyVerse } from "../VerseUtils";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [verseOfTheDay, setVerseOfTheDay] = useState("");
  const [streak, setStreak] = useState(9); // Default streak for testing

  useEffect(() => {
    async function getVerse() {
      loadDailyVerse()
        .then((response) => {
          setVerseOfTheDay(response);
        })
        .finally(() => setLoading(false));
    }
    getVerse();
  }, []);

  const handleContinueReading = async () => {
    const today = new Date().toDateString();
    const lastReadDate = await AsyncStorage.getItem("lastReadDate");

    if (lastReadDate !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      await AsyncStorage.setItem("streak", newStreak.toString());
      await AsyncStorage.setItem("lastReadDate", today);
    }
  };



  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Image
            source={require("../assets/user.jpg" )}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Bell size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Achievements")}>
            <Trophy size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Streak Section */}
        <View style={styles.streakBox}>
          <Image
           source={require("../assets/Flame.png" )} 
            style={styles.iconImage}
          />
          <Text style={styles.streakText}>Reading Streak</Text>
          <Text style={styles.streakText}>{user?.streak} <Text style={styles.daysText}>days</Text>
          </Text>
        </View>

        {/* Verse of the Day */}
        <View style={styles.verseCard}>
          <Text style={styles.verseLabel}>VERSE OF THE DAY</Text>
          <Text style={styles.verseText}>"{verseOfTheDay.text}"</Text>
          <Text style={styles.verseReference}>{verseOfTheDay.reference}</Text>
        </View>

        {/* Bible Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BIBLE</Text>
          <TouchableOpacity
            style={styles.continueReading}
            onPress={() => navigation.navigate("Reading")}
          >
            <Image
              source={require("../assets/Book.jpg" )} // 
              style={styles.iconImage}
            />
            <Text style={styles.continueText}>Continue Reading</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom:12,
    backgroundColor: "#D9D9D9",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  streakBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop:20,
    marginBottom: 16,
  },
  streakText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 8,
  },
  daysText: {
    fontSize: 14,
    color: "#000", // Lighter gray for distinction
    fontWeight: "400", // Normal weight to differentiate from the number
  },
  streakCount: {
    fontSize: 16,
    color: "#6b7280",
    marginLeft: "auto",
  },
  verseCard: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  verseLabel: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  verseText: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
    marginBottom: 8,
  },
  verseReference: {
    fontSize: 14,
    color: "#6b7280",
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  continueReading: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
