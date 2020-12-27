import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR } from '../config/theme';

import Logo from '../../assets/logo_full.svg';
import PrimaryButton from '../components/PrimaryButton';

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.btnContainer}>
          <PrimaryButton text='Register' />
          <PrimaryButton text='Sign in' />
        </View>
      </View>
    </View>
  );
};

LandingScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineContainer: {
    position: 'relative',
    flex: 1,
    width: '100%',
  },
  controlsContainer: {
    marginTop: -2,
    flex: 4,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    height: 130,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default connect(null, {})(LandingScreen);
