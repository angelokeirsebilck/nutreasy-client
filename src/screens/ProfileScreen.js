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
import Goals from '../components/profile/Goals';
import { ScrollView } from 'react-native-gesture-handler';
import MacroNutrients from '../components/profile/MacroNutrients';

const ProfileScreen = ({
  createProfile,
  logout,
  profile: { errors },
  initalValues,
  navigation,
}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    return () => {
      backHandler.remove();
    };
  }, []);

  // UserData fields
  const [gender, setGender] = useState(initalValues.gender);
  const [heightUnit, setHeightUnit] = useState(initalValues.heightUnit);
  const [weightUnit, setWeightUnit] = useState(initalValues.weightUnit);
  const [weight, setWeight] = useState(initalValues.weight);
  const [age, setAge] = useState(initalValues.age);
  const [height, setHeight] = useState(initalValues.height);
  const [activityLevel, setActivityLevel] = useState(initalValues.activityLevel);

  // Goals fields
  const [weightGoal, setWeightGoal] = useState(initalValues.weightGoal);

  // MacroNutrient fields
  const [dietPlan, setDietPlan] = useState(initalValues.dietplan);
  const [macroNutrients, setMacroNutriens] = useState(initalValues.macroNutrients);

  const saveProfile = () => {
    const data = {
      gender,
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      activityLevel: parseFloat(activityLevel),
      heightUnit,
      weightUnit,
      weightGoal,
      dietPlan,
      macroNutrients,
    };

    // Create or Update Profile
    createProfile(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
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
          activityLevel={activityLevel}
          setActivityLevel={setActivityLevel}
        />
        <Goals weightGoal={weightGoal} setWeightGoal={setWeightGoal} />
        <MacroNutrients
          dietPlan={dietPlan}
          setDietPlan={setDietPlan}
          macroNutrients={macroNutrients}
          setMacroNutriens={setMacroNutriens}
        />
        <TouchableOpacity
          style={[styles.btnContainer, { marginBottom: 20 }]}
          disabled={errors.length > 0 ? true : false}
          onPress={() => saveProfile()}>
          <SecondaryButton text='Save' disabled={errors.length > 0 ? true : false} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnContainer, { marginBottom: 20 }]}
          onPress={() => {
            logout();
            navigation.navigate('Landing');
          }}>
          <SecondaryButton text='Log out' />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  contentContainer: {
    marginBottom: 70,
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
    activityLevel: 1.2,
    age: 20,
    heightUnit: 'cm',
    weightUnit: 'kg',
    weightGoal: 'maintain',
    dietplan: 'standard',
    macroNutrients: {
      carbs: 50,
      protein: 25,
      fat: 25,
    },
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
