import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

import { PRIMARY_COLOR } from '../config/theme';
import Logo from '../../assets/logo_full.svg';
import PrimaryButton from '../components/PrimaryButton';
import Alert from './../components/Alert';
import { loginUser, register } from '../actions/auth';

const LoginScreen = ({ navigation, loginUser, register, auth, alert }) => {
  if (auth.isAuthenticated) {
    navigation.navigate('Home');
  }

  const login = navigation.getParam('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const button = login ? (
    <TouchableOpacity onPress={() => loginUser(email, password)}>
      <PrimaryButton text='Sign in' />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => register(email, password)}>
      <PrimaryButton text='Register' />
    </TouchableOpacity>
  );
  const bottomLink = login ? (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Login', {
          login: false,
        })
      }>
      <Text style={styles.bottomTextStyle}> Didn’t register yet? Register. </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Login', {
          login: true,
        })
      }>
      <Text style={styles.bottomTextStyle}>Already registered? Sign in.</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Alert />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.btnContainer}>
          <TextInput
            value={email}
            style={email.length > 0 ? styles.inputStyle : styles.placeholderStyle}
            placeholderTextColor={PRIMARY_COLOR}
            placeholder='email'
            onChangeText={(email) => setEmail(email)}
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
          />
          <TextInput
            value={password}
            style={password.length > 0 ? styles.inputStyle : styles.placeholderStyle}
            placeholder='password'
            placeholderTextColor={PRIMARY_COLOR}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
          />
          {button}
          {bottomLink}
        </View>
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    position: 'relative',
  },
  logoContainer: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    marginTop: -2,
    flex: 4,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    height: 236,
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    color: PRIMARY_COLOR,
    paddingHorizontal: 16,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 30,
  },
  placeholderStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    fontStyle: 'italic',
    paddingHorizontal: 16,
    fontFamily: 'Roboto_300Light_Italic',
    marginBottom: 30,
  },
  bottomTextStyle: {
    fontFamily: 'Roboto_400Regular',
    color: 'white',
    marginTop: 8,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(mapStateToProps, { loginUser, register })(LoginScreen);
