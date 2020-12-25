import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

const ReduxTest = ({ test }) => {
  return (
    <View>
      <Text>Redux Test Comp</Text>
      <Text>{test.test}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  test: state.test,
});

const styles = StyleSheet.create({});
export default connect(mapStateToProps)(ReduxTest);
