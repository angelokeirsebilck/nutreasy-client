import React from 'react';
import { connect } from 'react-redux';

// Navigation
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

// Screens
import SearchFood from '../screens/SearchFoodScreen';
import FavoFood from '../screens/FavoFoodScreen';
import OwnFoodScreen from '../screens/OwnFoodScreen';

// Colors
import { BLUE_DARK, PRIMARY_COLOR } from '../config/theme';

// Icons

import { FontAwesome } from '@expo/vector-icons';

const AddFoodTabNavigator = createMaterialTopTabNavigator(
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
);

export default AddFoodTabNavigator;
