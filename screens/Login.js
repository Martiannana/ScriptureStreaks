import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/auth/thunks';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }   
    dispatch(login({ email, password })).then(()=> {
        navigation.navigate('Home');
    }).catch((err) => {
        Alert.alert('Error', err.message);
    }); // API integration
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
              <TouchableOpacity
              onPress={() => navigation.navigate('LandingPage')}>
                <Image
                  source={require ('../assets/Arrow.png')}
                  style={styles.backButton}
                />
              </TouchableOpacity>
            </View>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
      >
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A5A5A5',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '85%',
    padding: 15,
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'regular',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: 'black',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Login;
