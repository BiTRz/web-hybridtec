import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HomeScreen;