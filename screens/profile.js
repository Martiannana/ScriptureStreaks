import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Modal,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const AccountScreen = () => {
  const navigation = useNavigation();
  
  // State for the modal visibility and selected time
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");

  const handleDeleteAccount = () => {
    alert("Delete Account clicked");
  };

  const handleLogOut = () => {
    alert("Log Out clicked");
  };

  const handleAddReminder = () => {
    setShowTimePicker(true); // Shows the time picker modal
  };

  const handleSaveReminder = () => {
    alert(`Reminder set for ${hour}:${minute}`);
    setShowTimePicker(false); // Closes the time picker modal
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/Arrow.png")} style={styles.backButton} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require("../assets/user.jpg")} style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
      </View>

      {/* Add Reminder Button */}
      <View style={styles.detailsCard}>
        <TouchableOpacity style={styles.reminderButton} onPress={handleAddReminder}>
          <Text style={styles.reminderText}>Add Reminder</Text>
        </TouchableOpacity>

        {/* Change Username */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.optionText}>Change username</Text>
          <Image source={require("../assets/Arrow-R.png")} style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* Change Password */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.optionText}>Change password</Text>
          <Image source={require("../assets/Arrow-R.png")} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Image source={require("../assets/Trash.png")} style={styles.binIcon} />
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate ("Login")}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <Modal transparent={true} visible={showTimePicker} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Time</Text>
              
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Hour</Text>
                <Picker
                  selectedValue={hour}
                  style={styles.picker}
                  onValueChange={(itemValue) => setHour(itemValue)}
                >
                  {Array.from({ length: 24 }, (_, index) => (
                    <Picker.Item label={String(index).padStart(2, '0')} value={String(index).padStart(2, '0')} key={index} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Minute</Text>
                <Picker
                  selectedValue={minute}
                  style={styles.picker}
                  onValueChange={(itemValue) => setMinute(itemValue)}
                >
                  {Array.from({ length: 60 }, (_, index) => (
                    <Picker.Item label={String(index).padStart(2, '0')} value={String(index).padStart(2, '0')} key={index} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
                <Text style={styles.saveText}>Save Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 15,
    backgroundColor: "#D9D9D9",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
  },
  detailsCard: {
    margin: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 15,
  },
  reminderText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f3f5",
  },
  optionText: {
    fontSize: 16,
    color: "#007bff",
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: "#6c757d",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginTop: 12,
    marginHorizontal: 25,
  },
  binIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
    tintColor: "red",
  },
  deleteText: {
    fontSize: 20,
    color: "red",
    fontWeight: "500",
  },
  logoutButton: {
    width: "80%",
    marginTop: 150,
    backgroundColor: "red",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  picker: {
    height: 120,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 15,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountScreen;
