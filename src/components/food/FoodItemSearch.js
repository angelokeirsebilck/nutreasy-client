import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Icons
import { AntDesign } from '@expo/vector-icons';

// Colors
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../config/theme';

// Actions
import { searchFoodById } from '../../actions/food';

// Navigation
import NavigationService from '../../../NavigationService';

const FoodItemSearch = ({ name, id }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('NewFood2', {
              title: 'Info Food',
              edit: false,
              item: {
                id,
                name,
              },
              search: true,
            })
          }>
          <Text style={styles.name}>{name}</Text>
          {/* <View style={styles.infoText}>
            <Text style={styles.calories}>{calories} kcal</Text>
            <Text style={styles.calories}> {unit} </Text>
            <Text style={styles.calories}>{measurementDescription}</Text>
          </View> */}
        </TouchableOpacity>
      </View>

      <AntDesign name='checkcircle' style={styles.iconStyle} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  info: {
    height: '100%',
    display: 'flex',
    flex: 1,
  },
  name: {
    color: PRIMARY_COLOR,
  },
  calories: {
    color: PRIMARY_COLOR,
    fontSize: 10,
  },
  iconStyle: {
    fontSize: 24,
    color: PRIMARY_COLOR,
  },
  iconStyleChecked: {
    fontSize: 24,
    color: SECONDARY_COLOR,
  },

  infoText: {
    display: 'flex',
    flexDirection: 'row',
  },
});
export default connect(null, {})(FoodItemSearch);
