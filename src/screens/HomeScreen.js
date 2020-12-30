import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Button } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR } from '../config/theme';
import { logout } from '../actions/auth';

const HomeScreen = ({ auth, navigation }) => {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigation.navigate('Landing');
    }
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutreasy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
