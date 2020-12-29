import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR } from '../config/theme';
import Logo from '../../assets/logo_full.svg';
import PrimaryButton from '../components/PrimaryButton';
import { loadUser } from '../actions/auth';

const LandingScreen = ({ navigation, auth, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (auth.isAuthenticated) {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login', {
                login: false,
              })
            }>
            <PrimaryButton text='Register' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login', {
                login: true,
              })
            }>
            <PrimaryButton text='Sign in' />
          </TouchableOpacity>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(LandingScreen);
