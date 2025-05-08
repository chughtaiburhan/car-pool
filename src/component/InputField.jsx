import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputField = ({
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleSecureEntry = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#666"
          />        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    marginLeft: 10,
  },
});

export default InputField;
