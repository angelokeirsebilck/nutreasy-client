import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR } from '../../config/theme';

// Actions
import { saveFoodEntries } from '../../actions/foodEntries';

// Navigation
import NavigationService from '../../../NavigationService';

const NextButton = ({
  saveFoodEntries,
  foodEntry: {
    selectedFood,
    date,
    moment,
    foodEntries: { skip },
  },
}) => {
  let skipDefault = {
    skipBreakfast: false,
    skipLunch: false,
    skipDinner: false,
    skipSnack1: false,
    skipSnack2: false,
    skipSnack3: false,
  };

  useEffect(() => {
    if (skip) {
      if (skip.skipBreakfast) skipDefault.skipBreakfast = skip.skipBreakfast;
      if (skip.skipLunch) skipDefault.skipLunch = skip.skipLunch;
      if (skip.skipDinner) skipDefault.skipDinner = skip.skipDinner;
      if (skip.skipSnack1) skipDefault.skipSnack1 = skip.skipSnack1;
      if (skip.skipSnack2) skipDefault.skipSnack2 = skip.skipSnack2;
      if (skip.skipSnack3) skipDefault.skipSnack3 = skip.skipSnack3;
    }
  }, []);

  switch (moment) {
    case 'breakfast':
      skipDefault.skipBreakfast = true;
      break;
    case 'lunch':
      skipDefault.skipLunch = true;
      break;
    case 'dinner':
      skipDefault.skipDinner = true;
      break;
    case 'snack1':
      skipDefault.skipSnack1 = true;
      break;
    case 'snack2':
      skipDefault.skipSnack2 = true;
      break;
    case 'snack3':
      skipDefault.skipSnack3 = true;
      break;
  }

  return (
    <View>
      {selectedFood.length > 0 ? (
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('SaveFood', {
              title: 'Save Food',
            })
          }>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            saveFoodEntries(
              `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
              '',
              skipDefault
            );
          }}>
          <Text style={styles.nextButton}>Skip </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  nextButton: {
    paddingRight: 20,
    fontSize: 20,
    color: PRIMARY_COLOR,
  },
});

const mapStateToProps = (state) => ({
  foodEntry: state.foodEntry,
});
export default connect(mapStateToProps, { saveFoodEntries })(NextButton);
