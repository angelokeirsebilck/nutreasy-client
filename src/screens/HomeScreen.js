import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Button } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR } from '../config/theme';
import { logout } from '../actions/auth';

const HomeScreen = ({ logout, auth, navigation }) => {
  if (!auth.isAuthenticated) {
    navigation.navigate('Landing');
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title='Logout' onPress={logout}></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

HomeScreen.navigationOptions = () => {
  return {
    title: 'Nutreasy',
    headerLeft: () => null,
    headerTitleStyle: {
      color: PRIMARY_COLOR,
      fontFamily: 'Roboto_700Bold',
    },
  };
};
export default connect(mapStateToProps, { logout })(HomeScreen);
