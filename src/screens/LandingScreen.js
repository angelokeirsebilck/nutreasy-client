import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { connect } from 'react-redux';
import { addTest, removeTest } from '../actions/test';
import Logo from '../../assets/logo_full.svg';

const LandingScreen = ({ addTest, removeTest }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
        <Image style={styles.logo} source={require('../../assets/logo_full.svg')} />
      </View>
      <View style={styles.lineContainer}>
        <Image style={styles.rect} source={require('../../assets/rect.svg')} />
      </View>
      <View style={styles.controlsContainer}>
        <Text>controls</Text>
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
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logoContainer: {
    flexBasis: '30%',
  },
  lineContainer: {
    flexBasis: '20%',
  },
  controlsContainer: {
    flexBasis: '50%',
  },
  logo: {
    width: 146,
    height: 121,
  },
  rect: {
    width: '100%',
    height: 115,
  },
});

export default connect(null, { addTest, removeTest })(LandingScreen);
