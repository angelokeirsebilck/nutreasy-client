import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

// Colors
import { PRIMARY_COLOR, RED, SECONDARY_COLOR } from '../../config/theme';

// Actions
import { addError, removeError, createFood, editFood, searchFoodById } from '../../actions/food';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Components
import SecondaryButton from '../../components/SecondaryButton';

const FoodDataNew = ({ createFood, editFood, item, edit, search, searchFoodById }) => {
  const { control, handleSubmit, errors, setValue } = useForm();
  const [fatItem, setFatItem] = useState();

  const [isFavorite, setIsFavorite] = useState();

  const onSubmit = (d) => {
    let data = {
      name: d.name,
      measurement_description: d.measurementDescription,
      number_of_units: d.unit,
      carbohydrate: d.carbs,
      protein: d.protein,
      fat: d.fat,
      calories: d.calories,
    };
    if (edit) {
      let data = {
        name: d.name,
        measurement_description: d.measurementDescription,
        number_of_units: d.unit,
        carbohydrate: d.carbs,
        protein: d.protein,
        fat: d.fat,
        calories: d.calories,
        favorite: isFavorite,
      };

      editFood(data, item.id);
      return;
    }
    createFood(data);
  };

  useEffect(() => {
    if (edit) {
      setValue('name', item.name);
      setValue('measurementDescription', item.measurementDescription);
      setValue('carbs', item.carbs.toString());
      setValue('calories', item.calories.toString());
      setValue('protein', item.protein.toString());
      setValue('fat', item.fat.toString());
      setValue('unit', item.unit.toString());

      setIsFavorite(item.favorite);
      return;
    }

    async function getSearchFood() {
      const fatItem = await searchFoodById(item.id);
      setFatItem(fatItem);
      setValue('name', item.name);
      setValue('measurementDescription', fatItem.measurement_description);
      setValue('carbs', fatItem.carbohydrate.toString());
      setValue('calories', fatItem.calories.toString());
      setValue('protein', fatItem.protein.toString());
      setValue('fat', fatItem.fat.toString());
      setValue('unit', fatItem.number_of_units.toString());
    }

    if (search) {
      getSearchFood();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        {edit ? (
          <View style={styles.favIconContainer}>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <FontAwesome name='star' style={isFavorite ? styles.favIconTrue : styles.favIcon} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.subTitleContainer}>
          <FontAwesome name='list-alt' style={styles.subTitleIcon} />
          <Text style={styles.subTitle}>Food Data</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Name </Text>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            rules={{
              required: 'Name Description is required.',
            }}
            render={(props) => (
              <TextInput
                {...props}
                onChangeText={(val) => {
                  props.onChange(val);
                }}
                style={styles.groupFieldData}
              />
            )}
          />
        </View>
        {errors.name && <Text style={styles.errorStyle}>{errors.name.message}</Text>}

        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Measurement Description </Text>

          <Controller
            name='measurementDescription'
            control={control}
            rules={{
              required: 'Measurement Description is required.',
            }}
            defaultValue=''
            render={(props) => (
              <TextInput
                {...props}
                style={styles.groupFieldData}
                onChangeText={(val) => {
                  props.onChange(val);
                }}
              />
            )}
          />
        </View>
        {errors.measurementDescription && (
          <Text style={styles.errorStyle}>{errors.measurementDescription.message}</Text>
        )}
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Number of Units </Text>
          <Controller
            name='unit'
            control={control}
            rules={{
              required: true,
              validate: { positiveNumber: (value) => parseFloat(value) > 0 },
            }}
            defaultValue=''
            render={(props) => (
              <TextInput
                {...props}
                style={styles.groupFieldData}
                keyboardType='numeric'
                onChangeText={(val) => {
                  props.onChange(val);
                }}
              />
            )}
          />
        </View>
        {errors.unit && errors.unit.type === 'positiveNumber' && (
          <Text style={styles.errorStyle}>Unit should be greater then 0.</Text>
        )}
        {errors.unit && errors.unit.type === 'required' && (
          <Text style={styles.errorStyle}>Unit is required.</Text>
        )}

        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Calories </Text>
          <Controller
            name='calories'
            control={control}
            rules={{
              required: true,
              validate: { positiveNumber: (value) => parseFloat(value) > 0 },
            }}
            defaultValue=''
            render={(props) => (
              <TextInput
                {...props}
                style={styles.groupFieldData}
                keyboardType='numeric'
                onChangeText={(val) => {
                  props.onChange(val);
                }}
              />
            )}
          />
        </View>
        {errors.calories && errors.calories.type === 'positiveNumber' && (
          <Text style={styles.errorStyle}>Calories should be greater then 0.</Text>
        )}
        {errors.calories && errors.calories.type === 'required' && (
          <Text style={styles.errorStyle}>Calories is required.</Text>
        )}

        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Carbohydrates (g)</Text>
          <Controller
            name='carbs'
            control={control}
            rules={{
              required: true,
              validate: { positiveNumber: (value) => parseFloat(value) > 0 },
            }}
            defaultValue=''
            render={(props) => (
              <TextInput
                {...props}
                style={styles.groupFieldData}
                keyboardType='numeric'
                onChangeText={(val) => {
                  props.onChange(val);
                }}
              />
            )}
          />
        </View>
        {errors.carbs && errors.carbs.type === 'positiveNumber' && (
          <Text style={styles.errorStyle}>Carbohydrates should be greater then 0.</Text>
        )}
        {errors.carbs && errors.carbs.type === 'required' && (
          <Text style={styles.errorStyle}>Carbohydrates is required.</Text>
        )}

        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Protein (g)</Text>
          <Controller
            name='protein'
            control={control}
            rules={{
              required: true,
              validate: { positiveNumber: (value) => parseFloat(value) > 0 },
            }}
            defaultValue=''
            render={(props) => (
              <TextInput
                {...props}
                style={styles.groupFieldData}
                keyboardType='numeric'
                onChangeText={(val) => {
                  props.onChange(val);
                }}
              />
            )}
          />
        </View>
        {errors.protein && errors.protein.type === 'positiveNumber' && (
          <Text style={styles.errorStyle}>Protein should be greater then 0.</Text>
        )}
        {errors.protein && errors.protein.type === 'required' && (
          <Text style={styles.errorStyle}>Protein is required.</Text>
        )}

        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Fat (g) </Text>
          <Controller
            name='fat'
            control={control}
            rules={{
              required: true,
              validate: { positiveNumber: (value) => parseFloat(value) > 0 },
            }}
            defaultValue=''
            render={(props) => (
              <TextInput
                {...props}
                style={styles.groupFieldData}
                keyboardType='numeric'
                onChangeText={(val) => {
                  props.onChange(val);
                }}
              />
            )}
          />
        </View>
        {errors.fat && errors.fat.type === 'positiveNumber' && (
          <Text style={styles.errorStyle}>Fat should be greater then 0.</Text>
        )}
        {errors.fat && errors.fat.type === 'required' && (
          <Text style={styles.errorStyle}>Fat is required.</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.btnContainer, { marginBottom: 20 }]}
        onPress={handleSubmit(onSubmit)}>
        <SecondaryButton text='Save' />
      </TouchableOpacity>
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
  favIcon: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    marginRight: 4,
  },
  favIconTrue: {
    fontSize: 24,
    color: SECONDARY_COLOR,
    marginRight: 4,
  },
  favIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
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
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  food: state.food,
});

export default connect(mapStateToProps, {
  addError,
  removeError,
  createFood,
  editFood,
  searchFoodById,
})(FoodDataNew);
