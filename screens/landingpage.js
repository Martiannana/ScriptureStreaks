import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/unsplash_sjHDn0oakCc.png" )} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>SCRIPTURE STREAKS</Text>
        <Text style={styles.subtitle}>Connect with faith, friends, and scripture</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, styles.loginButtonText]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'black',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 50, 
    alignItems: 'center',
  },
  signUpButton: {
    width: '85%',
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20, // Spacing between buttons
  },
  loginButton: {
    width: '85%',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonText: {
    color: 'black',
  },
  signUpButtonText: {
    color: 'white',
  },
});

export default LandingPage;
