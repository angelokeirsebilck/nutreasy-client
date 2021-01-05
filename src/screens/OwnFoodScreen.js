import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR, GREY } from '../config/theme';

// Icons
import { Entypo } from '@expo/vector-icons';

// Components
import FoodItem from '../components/food/FoodItem';

const OwnFoodScreen = ({ navigation, food }) => {
  let sortedFood = food.food.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.newFoodContainer}
          onPress={() =>
            navigation.navigate('NewFood2', {
              title: 'New Food',
              edit: false,
            })
          }>
          <Entypo name='squared-plus' style={styles.plusIcon} />
          <Text style={styles.newFood}>New Food</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.foodList}
          data={sortedFood}
          showsVerticalScrollIndicator={false}
          keyExtractor={(food) => food._id}
          renderItem={({ item }) => (
            <FoodItem
              id={item._id}
              name={item.name}
              calories={item.calories}
              carbs={item.carbohydrate}
              protein={item.protein}
              fat={item.fat}
              unit={item.number_of_units}
              measurementDescription={item.measurement_description}
              favorite={item.favorite}
            />
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 80,
  },
  newFoodContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    color: PRIMARY_COLOR,
    fontSize: 30,
  },
  newFood: {
    color: PRIMARY_COLOR,
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
  },
  foodList: {
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  food: state.food,
});

export default connect(mapStateToProps)(OwnFoodScreen);
