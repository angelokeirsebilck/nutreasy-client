import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR } from '../config/theme';
import { logout } from '../actions/auth';
import SecondaryButton from '../components/SecondaryButton';

const ProfileScreen = ({ logout }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={() => logout()}>
        <SecondaryButton text='Log out' />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

ProfileScreen.navigationOptions = () => {
  return {
    title: 'Profile',
    headerLeft: () => null,
    headerTitleStyle: {
      color: PRIMARY_COLOR,
      fontFamily: 'Roboto_700Bold',
    },
  };
};

export default connect(mapStateToProps, { logout })(ProfileScreen);
