import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Navigation
import NavigationService from '../../NavigationService';

// Components
import DatePicker from '../components/food/DatePicker';
import FoodButtons from '../components/food/FoodButtons';

// Actions

import { clearSelectedFood } from '../actions/foodEntries';

const FoodScreen = ({ navigation, clearSelectedFood }) => {
  const backAction = ({}) => {
    NavigationService.navigate.goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationService.navigate('Home');
      return true;
    });

    const isFocused = navigation.isFocused();
    if (isFocused) {
      clearSelectedFood();
    }
    // Load profile when homescreen is focused when switching screens.
    const navFocusListener = navigation.addListener('didFocus', () => {
      clearSelectedFood();
    });

    return () => {
      backHandler.remove();
      navFocusListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <DatePicker />
      <FoodButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    color: PRIMARY_COLOR,
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
});

FoodScreen.navigationOptions = () => {
  return {
    title: 'Food',
    headerTitleStyle: {
      color: PRIMARY_COLOR,
      fontFamily: 'Roboto_700Bold',
      fontSize: 30,
      paddingLeft: 5,
    },
    headerLeft: () => {
      return <HeaderBackButton onPress={() => NavigationService.navigate('Home')} />;
    },
  };
};
export default connect(null, { clearSelectedFood })(FoodScreen);
