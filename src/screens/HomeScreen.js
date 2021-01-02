import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Actions
import { logout } from '../actions/auth';
import { setBmr, loadProfile } from '../actions/profile';

// Components
import Food from '../components/home/Food';

// Navigation
import { withNavigation } from 'react-navigation';

const HomeScreen = ({ auth, navigation, calories, loadProfile }) => {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigation.navigate('Landing');
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    // Load profile when homescreen is focus on init.
    const isFocused = navigation.isFocused();
    if (isFocused) {
      loadProfile();
    }

    // Load profile when homescreen is focused when switching screens.
    const navFocusListener = navigation.addListener('didFocus', () => {
      loadProfile();
    });

    return () => {
      navFocusListener.remove();
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutreasy</Text>
      {calories !== null ? <Food calories={calories} /> : null}
      {/* 
      Disabled until pedometer gets fixed in Expo
      <Steps /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  calories: state.profile.calories,
});

export default withNavigation(
  connect(mapStateToProps, { logout, setBmr, loadProfile })(HomeScreen)
);
