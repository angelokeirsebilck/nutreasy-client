import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View, BackHandler } from 'react-native';

import NavigationService from '../../NavigationService';

const FoodScreen = ({ navigation }) => {
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
    <View>
      <Text> Food Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default FoodScreen;
