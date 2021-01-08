import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert as AlertRN,
  ScrollView,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';

// Colors
import { PRIMARY_COLOR, RED } from '../config/theme';

// Components
import Alert from '../components/Alert';
import FoodDataSearch from '../components/food/FoodDataSearch';

// Actions
import { createFood, clearAllErrors } from '../actions/food';
import FoodDataNew from '../components/food/FoodDataNew';

const NewFoodScreen = ({ navigation }) => {
  // Navigation param
  const edit = navigation.getParam('edit');
  const item = navigation.getParam('item');
  const search = navigation.getParam('search');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Alert />
      {search ? (
        <FoodDataSearch edit={edit} item={item} search={search} />
      ) : (
        <FoodDataNew edit={edit} item={item} search={search} />
      )}
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
    headerLeft: () => {
      return (
        <HeaderBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      );
    },
  };
};

const mapStateToProps = (state) => ({
  food: state.food,
});
export default connect(mapStateToProps, { createFood, clearAllErrors })(NewFoodScreen);
