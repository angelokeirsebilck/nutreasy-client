import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as AppAuth from 'expo-app-auth';
import { AsyncStorage } from 'react-native';

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
import SearchFood from './src/screens/SearchFoodScreen';
import FavoFood from './src/screens/FavoFoodScreen';
import OwnFoodScreen from './src/screens/OwnFoodScreen';
import NewFoodScreen from './src/screens/NewFoodScreen';

// Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
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
    Food: {
      screen: FoodScreen,
    },
    NewFood2: {
      screen: NewFoodScreen,
    },
    AddFood: {
      screen: createMaterialTopTabNavigator(
        {
          Search: SearchFood,
          Favo: FavoFood,
          OwnFood: OwnFoodScreen,
        },
        {
          initialRouteName: 'Search',

          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              if (routeName === 'Search') {
                return <FontAwesome name='search' size={24} color={tintColor} />;
              } else if (routeName === 'Favo') {
                return <FontAwesome name='star' size={24} color={tintColor} />;
              } else if (routeName === 'OwnFood') {
                return <FontAwesome name='home' size={24} color={tintColor} />;
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
            indicatorStyle: {
              backgroundColor: BLUE_DARK,
              height: 3,
            },
          },
        }
      ),
    },
  },
  {
    initialRouteName: 'Food',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => ({
      title: navigation.getParam('title'),
      cardStyle: { backgroundColor: '#FFFFFF' },
      headerTitleStyle: {
        color: PRIMARY_COLOR,
        fontFamily: 'Roboto_700Bold',
        fontSize: 30,
      },
    }),
  }
);

const HomeStack = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator(
        {
          Home: {
            screen: HomeScreen,
          },
        },
        {
          initialRouteName: 'Home',
          headerMode: 'screen',
          defaultNavigationOptions: {
            cardStyle: { backgroundColor: '#FFFFFF' },
          },
        }
      ),
    },
    Profile: createStackNavigator(
      {
        Profile: {
          screen: ProfileScreen,
        },
      },
      {
        initialRouteName: 'Profile',
        headerMode: 'screen',
        defaultNavigationOptions: {
          cardStyle: { backgroundColor: '#FFFFFF' },
        },
      }
    ),
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
