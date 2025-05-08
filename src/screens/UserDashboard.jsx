import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserDashboard = () => {
  return (
    <SafeAreaView style={styles.container} >
      <View>
        <Text>UserComponent</Text>
      </View>

    </SafeAreaView>
  )
}

export default UserDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 10,
  },
})
