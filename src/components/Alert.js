import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { RED } from '../config/theme';

const Alert = ({ alert }) => {
  const errors =
    alert.length > 0 ? (
      <View style={[styles.errorContainer, { height: alert.length * 50 }]}>
        {alert.map((e) => {
          return (
            <View key={e.id} style={styles.alertContainer}>
              <Text>{e.msg}</Text>
            </View>
          );
        })}
      </View>
    ) : null;
  return errors;
};

const styles = StyleSheet.create({
  errorContainer: {
    // position: 'absolute',
    // width: '90%',
    // top: 20,
    // start: 20,
    // right: 20,
    // zIndex: 10,
    marginTop: 10,
    width: '100%',
  },
  alertContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: RED,
    borderWidth: 2,
    zIndex: 20,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
