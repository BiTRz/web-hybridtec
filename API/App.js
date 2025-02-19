import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';


export default function App() {
  const [fact, setFact] = useState('')
  const [error, setError] = useState('')
  const [theme, setTheme] = useState('dark')

  const getFact = async () => {
    try {
      setError('')  
      const response = await axios.get('https://meowfacts.herokuapp.com/')
      setFact(response.data.data[0])
    } catch (error) {
      console.error('Error fetching cat facts:', error)
      setError('Unable to fetch cat fact. Please try again later.')
    }
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Press the button to receive random cat facts</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : <Text style={styles.factText}>{fact}</Text>}
      <View style={styles.buttonContainer}>
      <Button title="Get Cat Fact" onPress={getFact} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  )
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    },
    instructionText: {
      fontSize: 15,
      marginBottom: 100,
      textAlign: 'center',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    factText: {
      fontSize: 20,
      margin: 20,
      textAlign: 'center',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    errorText: {
      fontSize: 20,
      margin: 20,
      textAlign: 'center',
      color: 'red',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '70%',
    },
  })
