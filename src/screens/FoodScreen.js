import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, BackHandler } from 'react-native';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Navigatinnpm
import NavigationService from '../../NavigationService';
import DatePicker from '../components/food/DatePicker';

const FoodScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date(Date.now()));

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
      <Text style={styles.title}>Food</Text>
      <DatePicker date={date} setDate={setDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
});

FoodScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default FoodScreen;
