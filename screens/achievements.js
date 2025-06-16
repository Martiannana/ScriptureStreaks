import React from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const AchievementsScreen = () => {
  const { awards, user } = useSelector((state) => state.auth);

  const navigation = useNavigation();

  const achieved = (award) => {
    return user.awards.includes(award._id);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
               <TouchableOpacity
                            onPress={() => navigation.navigate('Home')}>
                              <Image
                                source={require ('../assets/Arrow.png')}
                                style={styles.backButton}
                              />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Achievements</Text>
        </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.achievementList}>
          {awards.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Text
                style={[
                  styles.badge,
                  !achieved(achievement) && styles.greyedOut,
                ]}
              >
                {achievement.badge}
              </Text>
              <Text
                style={[
                  styles.achievementText,
                  !achieved(achievement) && styles.greyedOut,
                ]}
              >
                {achievement.title}
              </Text>
            </View>
          ))}
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
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom:15,
    backgroundColor: "#D9D9D9",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 20,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  achievementList: {
    marginTop: 16,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  badge: {
    fontSize: 40,
    marginRight: 12,
  },
  greyedOut: {
    color: "#ccc",
  },
  achievementText: {
    fontSize: 18,
  },
});

export default AchievementsScreen;
