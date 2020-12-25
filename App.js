import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LandingScreen from './src/screens/LandingScreen';

// Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const navigator = createStackNavigator(
  {
    Landing: LandingScreen,
  },
  {
    initialRouteName: 'Landing',
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
