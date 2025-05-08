import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../component/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../app/features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, user_type } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter email and password');
      console.log(email, password)
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user_type === 'driver') {
      navigation.replace('RiderLoadBoard');
    } else if (user_type === 'business') {
      navigation.replace('UserDashboard');
    }
  }, [user_type, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRightIcon}>
        <Image
          source={require('../../assets/whatsapp-logo.png')}
          style={styles.whatsappLogo}
        />
      </View>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <Text style={styles.heading}>
        Sign in to <Text style={styles.appName}>MyApp</Text>
      </Text>


      <Text style={styles.subtext}>
        Welcome back! Please enter your account details.
      </Text>

      <InputField
        placeholder="Enter Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefefe', justifyContent: 'center', padding: 20 },
  topRightIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  whatsappLogo: {
    width: 40,
    height: 40,
  },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 30 },
  heading: { fontSize: 24, textAlign: 'center', fontWeight: 'bold' },
  appName: { color: 'green' },
  subtext: { textAlign: 'center', color: '#666', marginBottom: 20 },
  button: {
    backgroundColor: 'green',
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 20,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  switchText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'green',
    fontWeight: '500',
  },
});

export default LoginScreen;
