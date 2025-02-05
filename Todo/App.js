import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from './screens/TodoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerTitleAlign: 'center',}}>
        <Stack.Screen name="TodoScreen" component={TodoScreen} options={{ title: 'Todo List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;