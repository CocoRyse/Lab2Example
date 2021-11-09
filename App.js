import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Импортируем экраны нашего приложения
import MainScreen from './src/screens/MainScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import EditBookScreen from './src/screens/EditBookScreen';

const Stack = createNativeStackNavigator();

// В корне храним только Навигацию
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'MainScreen'} component={MainScreen} />
        <Stack.Screen name={'EditBook'} component={EditBookScreen} />
        <Stack.Screen name={'BookDetails'} component={BookDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
