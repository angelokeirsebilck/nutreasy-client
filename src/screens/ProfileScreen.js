import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR, RED } from '../config/theme';

// Actions
import { logout } from '../actions/auth';
import { createProfile } from '../actions/profile';

// Components
import SecondaryButton from '../components/SecondaryButton';
import UserData from '../components/profile/UserData';

const ProfileScreen = ({
  createProfile,
  logout,
  profile: { errors },
  initalValues,
  navigation,
}) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  const [gender, setGender] = useState('Male');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [weight, setWeight] = useState(initalValues.weight);
  const [age, setAge] = useState(initalValues.age);
  const [height, setHeight] = useState(initalValues.height);

  const saveProfile = () => {
    const data = {
      gender: gender,
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      activityLevel: parseFloat(1.4),
    };
    createProfile(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <UserData
        weight={weight}
        setWeight={setWeight}
        height={height}
        setHeight={setHeight}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        heightUnit={heightUnit}
        setHeightUnit={setHeightUnit}
        weightUnit={weightUnit}
        setWeightUnit={setWeightUnit}
      />
      <TouchableOpacity
        style={[styles.btnContainer, { marginBottom: 20 }]}
        disabled={errors.length > 0 ? true : false}
        onPress={() => saveProfile()}>
        <SecondaryButton text='Save' disabled={errors.length > 0 ? true : false} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          logout();
          navigation.navigate('Landing');
        }}>
        <SecondaryButton text='Log out' />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

ProfileScreen.defaultProps = {
  initalValues: {
    gender: 'male',
    height: 170,
    weight: 80,
    activityLevel: 1.4,
    age: 20,
  },
};

ProfileScreen.navigationOptions = () => {
  return {
    title: 'Profile',
    headerLeft: () => null,
    headerTitleStyle: {
      color: PRIMARY_COLOR,
      fontFamily: 'Roboto_700Bold',
    },
  };
};

export default connect(mapStateToProps, { logout, createProfile })(ProfileScreen);
