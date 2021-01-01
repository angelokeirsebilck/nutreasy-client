import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Expo
import { Pedometer } from 'expo-sensors';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

// Colors
import { PRIMARY_COLOR } from '../../config/theme';

const Steps = () => {
  const [isPedoMeterAvail, setIsPedoMeterAvail] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  let subscription = useRef(null).current;
  const subscribe = () => {
    subscription = Pedometer.watchStepCount(
      (result) => setPedometer(result.steps),
      (error) => console.log(error)
    );
    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedoMeterAvail(String(result));
      },
      (error) => {
        setIsPedoMeterAvail(error);
      }
    );
  };
  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    subscription = null;
  };
  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.groupContainer}>
      <View style={styles.subTitleContainer}>
        <FontAwesome5 name='walking' style={styles.subTitleIcon} />
        <Text style={styles.subTitle}>Steps</Text>
      </View>
      <View style={styles.groupFields}>
        <Text style={styles.groupFieldName}>steps</Text>
        <Text>Pedometer.isAvailableAsync(): {isPedoMeterAvail}</Text>
        <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
        <Text>Walk! And watch this go up: {currentStepCount}</Text>
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
  groupFieldName: {
    width: '40%',
    color: PRIMARY_COLOR,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
});
export default Steps;
