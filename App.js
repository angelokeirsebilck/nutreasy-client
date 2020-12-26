import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppLoading from 'expo-app-loading';

import LandingScreen from './src/screens/LandingScreen';

import { useFonts } from 'expo-font';
import { Inter_900Black } from '@expo-google-fonts/inter';

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
  console.log(fontsLoaded);
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  console.log(fontsLoaded);
  return (
    <Provider store={store}>
      <App style={styles.container} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
