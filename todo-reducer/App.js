import React, { useReducer, useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TASK', payload: input });
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New Task"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Save" onPress={addTask} />
      <FlatList
        data={state}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_TASK', payload: item.id })}>
            <View style={styles.item}>
              <Text>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginTop: 50,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  item: {
    padding: 20,
    backgroundColor: '#ffff99',
    borderBottomWidth: 1,
  },
});

export default App;