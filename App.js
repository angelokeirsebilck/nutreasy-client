import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';

// Icons
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// Colors
import { BLUE_DARK, PRIMARY_COLOR } from './src/config/theme';

// Fonts
import { useFonts } from 'expo-font';
import {
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_300Light_Italic,
} from '@expo-google-fonts/roboto';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FoodScreen from './src/screens/FoodScreen';

// Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NavigationService from './NavigationService';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const LandingStack = createStackNavigator(
  {
    Landing: LandingScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Landing',
  }
);

const FoodStack = createStackNavigator(
  {
    Food: FoodScreen,
  },
  {
    initialRouteName: 'Food',
  }
);

const HomeStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return <Entypo name='home' size={24} color={tintColor} />;
        } else if (routeName === 'Profile') {
          return <FontAwesome name='user' size={24} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: BLUE_DARK,
      inactiveTintColor: 'white',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: PRIMARY_COLOR,
      },
    },
  }
);

const switchNavigator = createSwitchNavigator(
  {
    Landing: LandingStack,
    Home: HomeStack,
    Food: FoodStack,
  },
  {
    initialRouteName: 'Landing',
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_300Light_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <App
        style={styles.container}
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
