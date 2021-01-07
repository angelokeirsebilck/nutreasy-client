import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, BackHandler } from 'react-native';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Navigatinnpm
import NavigationService from '../../NavigationService';
import DatePicker from '../components/food/DatePicker';
import FoodButtons from '../components/food/FoodButtons';

const FoodScreen = ({ navigation }) => {
  // const [date, setDate] = useState(new Date(Date.now()));

  const backAction = () => {
    NavigationService.navigate('Home');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      backAction();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <DatePicker />
      <FoodButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    color: PRIMARY_COLOR,
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
});

FoodScreen.navigationOptions = () => {
  return {
    title: 'Food',
    headerTitleStyle: {
      color: PRIMARY_COLOR,
      fontFamily: 'Roboto_700Bold',
      fontSize: 30,
      paddingLeft: 5,
    },
  };
};
export default FoodScreen;
