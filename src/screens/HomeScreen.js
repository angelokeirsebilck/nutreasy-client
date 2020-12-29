import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Button } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR } from '../config/theme';
import { logout } from '../actions/auth';

import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
      <Button title='Logout' onPress={() => logout()}></Button>
      <FontAwesome name='user' size={24} color='black' />
      <Entypo name='users' size={24} color='black' />
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
