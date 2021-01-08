import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert as AlertRN,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';

// Colors
import { PRIMARY_COLOR, RED } from '../config/theme';

// Components
import FoodData from '../components/food/FoodData';
import SecondaryButton from '../components/SecondaryButton';
import Alert from '../components/Alert';

// Actions
import { createFood, clearAllErrors } from '../actions/food';
import FoodDataNew from '../components/food/FoodDataNew';

const NewFoodScreen = ({ navigation }) => {
  // Navigation param
  const edit = navigation.getParam('edit');
  const item = navigation.getParam('item');

  useEffect(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <Alert />
      <FoodDataNew edit={edit} item={item} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  contentContainer: {
    marginBottom: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

NewFoodScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title'),
  };
};

const mapStateToProps = (state) => ({
  food: state.food,
});
export default connect(mapStateToProps, { createFood, clearAllErrors })(NewFoodScreen);
