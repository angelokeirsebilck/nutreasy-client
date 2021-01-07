import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, Button } from 'react-native';
import { connect } from 'react-redux';
import * as AppAuth from 'expo-app-auth';
import { AsyncStorage } from 'react-native';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Actions
import { logout, loadFatToken } from '../actions/auth';
import { setBmr, loadProfile } from '../actions/profile';
import { getFoodEntries } from '../actions/foodEntries';

// Components
import Food from '../components/home/Food';

// Navigation
import { withNavigation } from 'react-navigation';

const HomeScreen = ({
  auth,
  navigation,
  calories,
  loadProfile,
  loadFatToken,
  getFoodEntries,
  foodEntry: { date },
}) => {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigation.navigate('Landing');
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    getFoodEntries(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
    loadFatToken();
    // Load profile when homescreen is focus on init.
    const isFocused = navigation.isFocused();
    if (isFocused) {
      loadProfile();
      getFoodEntries(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
    }

    // Load profile when homescreen is focused when switching screens.
    const navFocusListener = navigation.addListener('didFocus', () => {
      loadProfile();
      getFoodEntries(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
    });

    return () => {
      navFocusListener.remove();
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Nutreasy</Text> */}
      {calories !== null ? <Food calories={calories} /> : null}
      {/* 
      Disabled until pedometer gets fixed in Expo
      <Steps /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  calories: state.profile.calories,
  foodEntry: state.foodEntry,
});

HomeScreen.navigationOptions = () => {
  return {
    title: 'Nutreasy',
    headerTitleStyle: {
      color: PRIMARY_COLOR,
      fontFamily: 'Roboto_700Bold',
      fontSize: 30,
      paddingLeft: 5,
    },
  };
};

export default withNavigation(
  connect(mapStateToProps, { logout, setBmr, loadProfile, loadFatToken, getFoodEntries })(
    HomeScreen
  )
);
