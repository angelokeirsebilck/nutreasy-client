import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addTest, removeTest } from '../actions/test';

import { PRIMARY_COLOR } from '../config/theme';

import Logo from '../../assets/logo_full.svg';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const LandingScreen = ({ addTest, removeTest }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.controlsContainer}>
        <PrimaryButton text='Register' />
        <SecondaryButton text='Sign in' />
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
  },
});

export default connect(null, { addTest, removeTest })(LandingScreen);
