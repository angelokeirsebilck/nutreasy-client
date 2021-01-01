import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Colors
import { PRIMARY_COLOR, RED } from '../../config/theme';

// Actions
import { addError, removeError } from '../../actions/profile';

let carbsError;
let proteinError;
let fatError;
let sumError;

const CustomMacroNutrients = ({
  addError,
  removeError,
  carbs,
  setCarbs,
  protein,
  setProtein,
  fat,
  setFat,
  setMacroNutrientsValues,
}) => {
  useEffect(() => {}, []);

  const validateCarbs = (val) => {
    if (val.length <= 0) {
      addError('carbs', 'Carbs is required and must be greater then 0.');
      carbsError = (
        <Text style={styles.errorStyle}>Carbs is required and must be greater then 0.</Text>
      );
    } else {
      removeError('carbs');
      validateSum();
      carbsError = null;
      setMacroNutrientsValues();
    }
  };
  const validateProtein = (val) => {
    if (val.length <= 0) {
      addError('protein', 'Protein is required and must be greater then 0.');
      proteinError = (
        <Text style={styles.errorStyle}>Protein is required and must be greater then 0.</Text>
      );
    } else {
      removeError('protein');
      validateSum();
      proteinError = null;
      setMacroNutrientsValues();
    }
  };
  const validateFat = (val) => {
    if (val.length <= 0) {
      addError('fat', 'Fat is required and must be greater then 0.');
      fatError = (
        <Text style={styles.errorStyle}>Carbs is required and must be greater then 0.</Text>
      );
    } else {
      validateSum();
      removeError('fat');
      fatError = null;
      setMacroNutrientsValues();
    }
  };

  const validateSum = () => {
    const sum = parseInt(parseInt(carbs) + parseInt(fat) + parseInt(protein));
    if (sum !== 100) {
      addError('sum', 'Sum of carbohydrates, protein and fat must be 100.');
      sumError = (
        <Text style={styles.errorStyle}>Sum of carbohydrates, protein and fat must be 100.</Text>
      );
    } else {
      removeError('sum');
      sumError = null;
    }
  };
  return (
    <View>
      <View style={styles.groupFields}>
        <Text style={styles.groupFieldName}>Carbs (%) </Text>
        <TextInput
          keyboardType='numeric'
          style={styles.groupFieldData}
          value={carbs.toString()}
          onChangeText={(val) => {
            setCarbs(val);
            validateCarbs(val);
            validateSum();
          }}
          onEndEditing={(e) => validateCarbs(e.nativeEvent.text)}
        />
      </View>
      {carbsError}
      <View style={styles.groupFields}>
        <Text style={styles.groupFieldName}>Protein (%) </Text>
        <TextInput
          keyboardType='numeric'
          style={styles.groupFieldData}
          value={protein.toString()}
          onChangeText={(val) => {
            setProtein(val);
            validateProtein(val);
            validateSum();
          }}
          onEndEditing={(e) => validateProtein(e.nativeEvent.text)}
        />
      </View>
      {proteinError}
      <View style={styles.groupFields}>
        <Text style={styles.groupFieldName}>Fat (%) </Text>
        <TextInput
          keyboardType='numeric'
          style={styles.groupFieldData}
          value={fat.toString()}
          onChangeText={(val) => {
            setFat(val);
            validateFat(val);
            validateSum();
          }}
          onEndEditing={(e) => validateFat(e.nativeEvent.text)}
        />
      </View>
      {fatError}
      {sumError}
    </View>
  );
};
const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    fontFamily: 'Roboto_400Regular',
  },
  errorStyle: {
    color: RED,
    fontSize: 12,
    marginBottom: 4,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addError, removeError })(CustomMacroNutrients);
