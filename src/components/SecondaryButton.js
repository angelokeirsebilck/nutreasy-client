import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { PRIMARY_COLOR, GREY } from '../config/theme';

const SecondaryButton = ({ text, disabled }) => {
  return (
    <View style={disabled ? styles.btnContainerDisabled : styles.btnContainer}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainerDisabled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: GREY,
    paddingVertical: 14,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
  },
  textStyle: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Roboto_700Bold',
  },
});

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SecondaryButton;
