import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { HeaderBackButton } from 'react-navigation-stack';

// Screens
import FoodScreen from '../screens/FoodScreen';
import NewFoodScreen from '../screens/NewFoodScreen';
import SaveFoodEntries from '../screens/SaveFoodEntriesScreen';
import SaveFoodEntriesScreen from '../screens/SaveFoodEntriesScreenNew';

// Navigation
import AddFoodTabNavigator from '../../src/navigation/AddFoodTabNavigator';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Components
import NextButton from '../components/food/NextButton';

const FoodStack = createStackNavigator(
  {
    Food: {
      screen: FoodScreen,
    },
    SaveFood: {
      screen: SaveFoodEntries,
    },
    SaveFoodNew: {
      screen: SaveFoodEntriesScreen,
    },
    NewFood2: {
      screen: NewFoodScreen,
    },
    AddFood: {
      screen: AddFoodTabNavigator,
      navigationOptions: {
        headerRight: () => {
          return <NextButton />;
        },
      },
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
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() =>
              navigation.navigate('Food', {
                reset: true,
              })
            }
          />
        );
      },
    }),
  }
);

const styles = StyleSheet.create({
  nextButton: {
    paddingRight: 20,
    fontSize: 20,
    color: PRIMARY_COLOR,
  },
});

export default FoodStack;
