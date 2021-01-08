import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Icons
import { AntDesign } from '@expo/vector-icons';

// Colors
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../config/theme';

// Navigation
import NavigationService from '../../../NavigationService';

// Actions
import { setSelectedFood, removeSelectedFood } from '../../actions/foodEntries';

const FoodItem = ({
  id,
  name,
  calories,
  unit,
  measurementDescription,
  carbs,
  protein,
  fat,
  favorite,
  setSelectedFood,
  removeSelectedFood,
  foodEntry: { selectedFood },
}) => {
  const [selected, setSelected] = useState(false);

  const toggle = () => {
    if (selected) {
      removeSelectedFood(id);
    } else {
      setSelectedFood(id, name, calories, unit, measurementDescription, carbs, protein, fat, 1);
    }

    setSelected(!selected);
  };

  useEffect(() => {
    selectedFood.forEach((item) => {
      if (item.foodItem == id) {
        setSelected(true);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('NewFood2', {
              title: 'Edit Food',
              edit: true,
              item: {
                id,
                name,
                calories,
                measurementDescription,
                carbs,
                protein,
                fat,
                favorite,
                unit,
              },
            })
          }>
          <Text style={selected ? styles.nameSelected : styles.name}>{name}</Text>
          <View style={styles.infoText}>
            <Text style={selected ? styles.caloriesSelected : styles.calories}>
              {calories} kcal
            </Text>
            <Text style={selected ? styles.caloriesSelected : styles.calories}> {unit} </Text>
            <Text style={selected ? styles.caloriesSelected : styles.calories}>
              {measurementDescription}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <AntDesign
          name='checkcircle'
          style={selected ? styles.iconStyleChecked : styles.iconStyle}
          onPress={() => toggle()}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  info: {
    height: '100%',
    display: 'flex',
    flex: 1,
  },
  name: {
    color: PRIMARY_COLOR,
  },
  nameSelected: {
    color: SECONDARY_COLOR,
  },
  calories: {
    color: PRIMARY_COLOR,
    fontSize: 10,
  },
  caloriesSelected: {
    color: SECONDARY_COLOR,
    fontSize: 10,
  },
  iconStyle: {
    fontSize: 24,
    color: PRIMARY_COLOR,
  },
  iconStyleChecked: {
    fontSize: 24,
    color: SECONDARY_COLOR,
  },

  infoText: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => ({
  foodEntry: state.foodEntry,
});

export default connect(mapStateToProps, { setSelectedFood, removeSelectedFood })(FoodItem);
