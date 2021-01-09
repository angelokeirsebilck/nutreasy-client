import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as AppAuth from 'expo-app-auth';
import { AsyncStorage } from 'react-native';

// Colors
import { PRIMARY_COLOR, GREY } from '../config/theme';

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
  profile,
}) => {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigation.navigate('Landing');
    }

    var dateOnLoad = new Date(Date.now());

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    getFoodEntries(
      `${dateOnLoad.getDate()}-${dateOnLoad.getMonth() + 1}-${dateOnLoad.getFullYear()}`
    );
    loadFatToken();
    // Load profile when homescreen is focus on init.
    const isFocused = navigation.isFocused();
    if (isFocused) {
      loadProfile();
      getFoodEntries(
        `${dateOnLoad.getDate()}-${dateOnLoad.getMonth() + 1}-${dateOnLoad.getFullYear()}`
      );
    }

    // Load profile when homescreen is focused when switching screens.
    const navFocusListener = navigation.addListener('didFocus', () => {
      loadProfile();
      getFoodEntries(
        `${dateOnLoad.getDate()}-${dateOnLoad.getMonth() + 1}-${dateOnLoad.getFullYear()}`
      );
    });

    return () => {
      navFocusListener.remove();
      backHandler.remove();
    };
  }, []);

  const loader = <ActivityIndicator size='large' color={PRIMARY_COLOR} />;
  const noProfileFoundContent = (
    <Text style={styles.noProfileStyle}>
      No profile found. Please fill in and save profile first.
    </Text>
  );

  let content = loader;
  let foodContent = calories !== null ? <Food calories={calories} /> : null;

  if (!profile.loading) {
    content = foodContent;
    if (profile.profile == null) content = noProfileFoundContent;
  }

  return <View style={styles.container}>{content}</View>;
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
  noProfileStyle: {
    color: PRIMARY_COLOR,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
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
