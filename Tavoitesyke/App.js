import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const [limits, setLimits] = useState('');

  const calculateLimits = () => {
    const ageNumber = parseInt(age);
    if (!isNaN(ageNumber)) {
      const lowerLimit = (220 - ageNumber) * 0.65;
      const upperLimit = (220 - ageNumber) * 0.85;
      setLimits(`${lowerLimit.toFixed(0)} - ${upperLimit.toFixed(0)}`);
    } else {
      setLimits('Invalid age');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Age</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        />
        <Button title="Calculate" onPress={calculateLimits} />
        <Text>Limits: {limits}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '30%',
  },
});
