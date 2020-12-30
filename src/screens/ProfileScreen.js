import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity } from 'react-native';
import { Picker } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR, RED } from '../config/theme';
import { logout } from '../actions/auth';
import SecondaryButton from '../components/SecondaryButton';

import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

let weightError = null;
let ageError = null;

const ProfileScreen = ({ logout, profile, initalValues, navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  const [gender, setGender] = useState('Male');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [weight, setWeight] = useState(initalValues.weight);
  const [age, setAge] = useState(initalValues.age);
  const [errors, setErrors] = useState([]);

  const validateWeight = (val) => {
    if (val.length <= 0) {
      const newArray = errors;
      const errorExist = newArray.find((e) => e.field == 'weight');
      weightError = (
        <Text style={styles.errorStyle}>Weight is required and must be greater then 0.</Text>
      );
      if (errorExist) return;
      newArray.push({
        field: 'weight',
        msg: 'Weight is required and must be greater then 0.',
      });

      setErrors(newArray);
    } else {
      const newArray = errors.filter((e) => e.field !== 'weight');
      setErrors(newArray);
      weightError = null;
    }
  };

  const validateAge = (val) => {
    if (val.length <= 0) {
      const newArray = errors;
      const errorExist = newArray.find((e) => e.field == 'age');
      ageError = <Text style={styles.errorStyle}>Age is required and must be greater then 0.</Text>;
      if (errorExist) return;
      newArray.push({
        field: 'age',
        msg: 'Age is required and must be greater then 0.',
      });

      setErrors(newArray);
    } else {
      const newArray = errors.filter((e) => e.field !== 'age');
      setErrors(newArray);
      ageError = null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.groupContainer}>
        <View style={styles.subTitleContainer}>
          <Ionicons style={styles.subTitleIcon} name='settings' />
          <Text style={styles.subTitle}>User Data</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Gender </Text>
          <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 4 }]}>
            <Picker
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'Roboto_400Regular',
                color: PRIMARY_COLOR,
              }}
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
              <Picker.Item label='Male' value='male' />
              <Picker.Item label='Female' value='female' />
            </Picker>
          </View>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Age </Text>
          <TextInput
            keyboardType='numeric'
            style={styles.groupFieldData}
            value={age.toString()}
            onChangeText={(val) => {
              setAge(val);
              validateAge(val);
            }}
            onEndEditing={(e) => validateAge(e.nativeEvent.text)}
            style={[styles.groupFieldData]}
          />
        </View>
        {ageError}
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Height </Text>
          <TextInput
            keyboardType='numeric'
            style={[
              styles.groupFieldData,
              { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 },
            ]}
          />
          <View
            style={[
              styles.groupFieldData,
              {
                paddingHorizontal: 0,
                paddingLeft: 4,
                flex: 2,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 0,
              },
            ]}>
            <Picker
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'Roboto_400Regular',
                color: PRIMARY_COLOR,
              }}
              selectedValue={heightUnit}
              onValueChange={(itemValue, itemIndex) => setHeightUnit(itemValue)}>
              <Picker.Item label='Cm' value='cm' />
              <Picker.Item label='Ft' value='feet' />
            </Picker>
          </View>
        </View>
        <View style={[styles.groupFields, { marginBottom: 0 }]}>
          <Text style={styles.groupFieldName}>Weight </Text>
          <TextInput
            keyboardType='numeric'
            value={weight.toString()}
            onChangeText={(val) => {
              setWeight(val);
              validateWeight(val);
            }}
            onEndEditing={(e) => validateWeight(e.nativeEvent.text)}
            style={[
              styles.groupFieldData,
              {
                flex: 1,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRightWidth: 0,
              },
            ]}
          />
          <View
            style={[
              styles.groupFieldData,
              {
                paddingHorizontal: 0,
                paddingLeft: 4,
                flex: 2,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 0,
              },
            ]}>
            <Picker
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'Roboto_400Regular',
                color: PRIMARY_COLOR,
              }}
              selectedValue={weightUnit}
              onValueChange={(itemValue, itemIndex) => setWeightUnit(itemValue)}>
              <Picker.Item label='Kg' value='kg' />
              <Picker.Item label='Lb' value='lb' />
            </Picker>
          </View>
        </View>
        {weightError}
      </View>

      <TouchableOpacity
        style={styles.logoutContainer}
        disabled={errors.length > 0 ? true : false}
        onPress={() => console.log(errors.length)}>
        <SecondaryButton text='Save' disabled={errors.length > 0 ? true : false} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutContainer}
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
  logoutContainer: {
    display: 'flex',
    alignItems: 'center',
  },
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
  groupFields: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupFieldName: {
    width: '40%',
    color: PRIMARY_COLOR,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  groupFieldData: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    backgroundColor: 'white',
    color: PRIMARY_COLOR,
    paddingHorizontal: 16,
    fontFamily: 'Roboto_400Regular',
  },
  errorStyle: {
    color: RED,
    fontSize: 12,
    marginBottom: 4,
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

export default connect(mapStateToProps, { logout })(ProfileScreen);
