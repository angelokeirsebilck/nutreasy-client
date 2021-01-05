import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Icons
import { FontAwesome } from '@expo/vector-icons';
import FoodItem from '../components/food/FoodItem';

// Actions
import { searchFood } from '../actions/food';

// Components
import FoodItemSearch from '../components/food/FoodItemSearch';

const SearchFood = ({ searchFood, food: { searchedFood } }) => {
  const [searchString, setSearchString] = useState('');

  useEffect(() => {}, []);

  const startSearch = () => {
    if (searchString != '') {
      searchFood(searchString);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        {searchString.length > 0 ? null : <FontAwesome name='search' style={styles.searchIcon} />}
        <TextInput
          style={styles.input}
          value={searchString}
          placeholder='Search food'
          onChangeText={(val) => setSearchString(val)}
          underlineColorAndroid='transparent'
          placeholderTextColor={PRIMARY_COLOR}
          onEndEditing={() => {
            startSearch();
          }}
        />
      </View>
      <FlatList
        style={styles.foodList}
        data={searchedFood}
        showsVerticalScrollIndicator={false}
        keyExtractor={(food) => food.food_id}
        renderItem={({ item }) => <FoodItemSearch id={item.food_id} name={item.food_name} />}
      />
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
  searchSection: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 10,
    maxWidth: 240,
    marginBottom: 20,
  },
  searchIcon: {
    paddingLeft: 10,
    fontSize: 24,
    color: PRIMARY_COLOR,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: PRIMARY_COLOR,
  },
  foodList: {
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  food: state.food,
});

export default connect(mapStateToProps, { searchFood })(SearchFood);
