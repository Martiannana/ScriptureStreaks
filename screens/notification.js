import React from 'react';
import { View, Image, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const navigation = useNavigation();

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
                                  <Text style={styles.headerText}>Notifications</Text>
              </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.notificationList}>
          <Text style={styles.notificationItem}>No new notifications</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  notificationList: {
    marginTop: 16,
    marginLeft: 15,
  },
  notificationItem: {
    fontSize: 18,
    marginBottom: 12
  }
});

export default NotificationsScreen;