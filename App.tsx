import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/HomeScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
