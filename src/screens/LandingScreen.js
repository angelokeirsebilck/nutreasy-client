import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { connect } from 'react-redux';
import { addTest, removeTest } from '../actions/test';
import ReduxTest from '../components/ReduxTest';

const LandingScreen = ({ addTest, removeTest }) => {
  return (
    <View>
      <Button title='Redux remove test' onPress={() => removeTest()} />
      <Button title='Redux add test' onPress={() => addTest()} />

      <ReduxTest />
    </View>
  );
};
const styles = StyleSheet.create({});
export default connect(null, { addTest, removeTest })(LandingScreen);
