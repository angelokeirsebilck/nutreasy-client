import React, { useEffect, useState } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Colors
import { PRIMARY_COLOR, RED } from '../../config/theme';

//Icons
import { FontAwesome } from '@expo/vector-icons';

const Goals = ({ profile: { profile }, weightGoal, setWeightGoal }) => {
  useEffect(() => {
    if (profile != null) {
      if (profile.weight != null) setWeightGoal(profile.goals.weight);
    }
  }, []);

  return (
    <View style={styles.groupContainer}>
      <View style={styles.subTitleContainer}>
        <FontAwesome name='check-square' style={styles.subTitleIcon} />
        <Text style={styles.subTitle}>Goals</Text>
      </View>
      <View style={styles.groupFields}>
        <Text style={styles.groupFieldName}>Weight </Text>
        <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 0 }]}>
          <Picker
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'Roboto_400Regular',
              color: PRIMARY_COLOR,
            }}
            selectedValue={weightGoal}
            onValueChange={(itemValue, itemIndex) => setWeightGoal(itemValue)}>
            <Picker.Item label='Maintain' value='maintain' />
            <Picker.Item label='Loss' value='loss' />
            <Picker.Item label='Gain' value='gain' />
          </Picker>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  groupContainer: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  subTitleIcon: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    marginRight: 4,
  },
  subTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
    color: PRIMARY_COLOR,
  },
  groupFields: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupFieldName: {
    width: '40%',
    color: PRIMARY_COLOR,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  groupFieldData: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    backgroundColor: 'white',
    color: PRIMARY_COLOR,
    paddingHorizontal: 10,
    fontFamily: 'Roboto_400Regular',
  },
  errorStyle: {
    color: RED,
    fontSize: 12,
    marginBottom: 4,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {})(Goals);
