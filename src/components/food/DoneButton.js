import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR } from '../../config/theme';

// Actions
import { saveFoodEntries } from '../../actions/foodEntries';

// Navigation
import NavigationService from '../../../NavigationService';

const DoneButton = ({
  saveFoodEntries,
  foodEntry: { selectedFood, moment, foodEntries, date },
}) => {
  let skipDefault = {
    skipBreakfast: false,
    skipLunch: false,
    skipDinner: false,
    skipSnack1: false,
    skipSnack2: false,
    skipSnack3: false,
  };

  const saveFood = () => {
    let food = [];
    if (foodEntries.skip) {
      if (foodEntries.skip.skipBreakfast)
        skipDefault.skipBreakfast = foodEntries.skip.skipBreakfast;
      if (foodEntries.skip.skipLunch) skipDefault.skipLunch = foodEntries.skip.skipLunch;
      if (foodEntries.skip.skipDinner) skipDefault.skipDinner = foodEntries.skip.skipDinner;
      if (foodEntries.skip.skipSnack1) skipDefault.skipSnack1 = foodEntries.skip.skipSnack1;
      if (foodEntries.skip.skipSnack2) skipDefault.skipSnack2 = foodEntries.skip.skipSnack2;
      if (foodEntries.skip.skipSnack3) skipDefault.skipSnack3 = foodEntries.skip.skipSnack3;
    }

    selectedFood.forEach((item) => {
      food.push({
        foodItem: item.foodItem,
        amount: item.amount,
      });
    });

    let prevFood = foodEntries;

    if (prevFood == '') {
      prevFood = {};
    } else {
      prevFood = foodEntries.food;
    }

    switch (moment) {
      case 'breakfast':
        prevFood.breakfast = food;
        break;
      case 'lunch':
        prevFood.lunch = food;
        break;
      case 'dinner':
        prevFood.dinner = food;
        break;
      case 'snack1':
        prevFood.snack1 = food;
        break;
      case 'snack2':
        prevFood.snack2 = food;
        break;
      case 'snack3':
        prevFood.snack3 = food;
        break;
    }

    saveFoodEntries(
      `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      prevFood,
      skipDefault
    );
  };

  useEffect(() => {}, []);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          saveFood();
        }}>
        <Text style={styles.doneButton}>Done </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  doneButton: {
    paddingRight: 20,
    fontSize: 20,
    color: PRIMARY_COLOR,
  },
});

const mapStateToProps = (state) => ({
  foodEntry: state.foodEntry,
});
export default connect(mapStateToProps, { saveFoodEntries })(DoneButton);
