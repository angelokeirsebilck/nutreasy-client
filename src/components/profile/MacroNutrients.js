import React, { useEffect, useState } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Colors
import { PRIMARY_COLOR, RED } from '../../config/theme';

//Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomMacroNutrients from './CustomMacroNutrients';

const MacroNutrients = ({
  profile: { profile },
  macroNutrients,
  setMacroNutriens,
  dietPlan,
  setDietPlan,
}) => {
  const [showCustom, setShowCustom] = useState(false);

  // Custom MacroNutrient fields
  const [carbs, setCarbs] = useState(macroNutrients.carbs);
  const [protein, setProtein] = useState(macroNutrients.protein);
  const [fat, setFat] = useState(macroNutrients.fat);

  useEffect(() => {
    if (profile != null) {
      if (profile.macroNutrients != null) setMacroNutriens(profile.macroNutrients);
      if (profile.dietPlan != null) setDietPlan(profile.dietPlan);
    }
    if (profile.dietPlan == 'custom') {
      setShowCustom(true);
    }
  }, []);

  let customMacroNutriens = {
    carbs,
    protein,
    fat,
  };

  const setMacroNutrientsValues = (val) => {
    let macroNutrientsValues;
    switch (val) {
      case 'standard':
        setShowCustom(false);
        macroNutrientsValues = {
          carbs: 50,
          protein: 25,
          fat: 25,
        };
        break;
      case 'muscleGain':
        setShowCustom(false);
        macroNutrientsValues = {
          carbs: 50,
          protein: 25,
          fat: 25,
        };
        break;
      case 'weightLoss':
        setShowCustom(false);
        macroNutrientsValues = {
          carbs: 40,
          protein: 35,
          fat: 25,
        };
        break;
      case 'keto':
        setShowCustom(false);
        macroNutrientsValues = {
          carbs: 10,
          protein: 30,
          fat: 60,
        };

        break;
      case 'custom':
        setShowCustom(true);
        macroNutrientsValues = customMacroNutriens;

        break;
      default:
        setShowCustom(false);
        macroNutrientsValues = {
          carbs: 50,
          protein: 25,
          fat: 25,
        };
        break;
    }
    setMacroNutriens(macroNutrientsValues);
  };

  return (
    <View style={styles.groupContainer}>
      <View style={styles.subTitleContainer}>
        <MaterialCommunityIcons style={styles.subTitleIcon} name='silverware-fork-knife' />
        <Text style={styles.subTitle}>Macro Nutrients</Text>
      </View>
      <View style={styles.groupFields}>
        <Text style={styles.groupFieldName}>Diet Plan </Text>
        <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 0 }]}>
          <Picker
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'Roboto_400Regular',
              color: PRIMARY_COLOR,
            }}
            selectedValue={dietPlan}
            onValueChange={(itemValue, itemIndex) => {
              setDietPlan(itemValue);
              setMacroNutrientsValues(itemValue);
            }}>
            <Picker.Item label='Standard' value='standard' />
            <Picker.Item label='Muscle Gain' value='muscleGain' />
            <Picker.Item label='Weight Loss' value='weightLoss' />
            <Picker.Item label='Keto' value='keto' />
            <Picker.Item label='Custom' value='custom' />
          </Picker>
        </View>
      </View>
      {showCustom ? (
        <CustomMacroNutrients
          carbs={carbs}
          setCarbs={setCarbs}
          protein={protein}
          setProtein={setProtein}
          fat={fat}
          setFat={setFat}
          setMacroNutrientsValues={() => setMacroNutrientsValues('custom')}
        />
      ) : null}
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

export default connect(mapStateToProps, {})(MacroNutrients);
