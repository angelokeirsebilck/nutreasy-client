import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Icons
import { FontAwesome } from '@expo/vector-icons';
import Alert from '../components/Alert';

// Actions
import { searchFood, searchFoodById, addSearchFood, getFood } from '../actions/food';
import { loadFatToken } from '../actions/auth';
import { setSelectedFood, removeSelectedFood } from '../actions/foodEntries';

// Components
import FoodItemSearch from '../components/food/FoodItemSearch';
import { ScrollView } from 'react-native-gesture-handler';

const SearchFood = ({
    loadFatToken,
    searchFood,
    food: { searchedFood },
    foodEntry: { selectedFood },
    setSelectedFood,
    removeSelectedFood,
    searchFoodById,
    addSearchFood,
    getFood,
}) => {
    const [searchString, setSearchString] = useState('');
    const [searchedFoodFiltered, setSearchedFoodFiltered] = useState([]);
    let filteredSearchFood;
    useEffect(() => {}, []);

    let filteredSelectedFood = selectedFood.filter((food) => food.searchId != null);

    const filterFoodItems = () => {
        if (searchedFood != null) {
            const searchIdArray = filteredSelectedFood.map((item) => item.searchId);

            filteredSearchFood = searchedFood.filter((food) => {
                return !searchIdArray.includes(parseInt(food.food_id));
            });
        }
    };

    const startSearch = async () => {
        const fatSecretToken = await AsyncStorage.getItem('fatToken');
        if (fatSecretToken == null) {
            await loadFatToken();
        }
        if (searchString != '') searchFood(searchString);

        filterFoodItems();
    };

    filterFoodItems();

    const toggle = async (selectedFoodItemId, id, selected, name) => {
        if (selected) {
            if (selectedFoodItemId) {
                removeSelectedFood(selectedFoodItemId);
                return;
            }
            removeSelectedFood(selectedId);
        } else {
            const fatItem = await searchFoodById(id);
            const data = {
                name,
                measurement_description: fatItem.measurement_description,
                calories: fatItem.calories,
                number_of_units: fatItem.number_of_units,
                carbohydrate: fatItem.carbohydrate,
                protein: fatItem.protein,
                fat: fatItem.fat,
                searchId: id,
            };

            const searchFood = await addSearchFood(data);
            await getFood();
            // setSelectedId(searchFood._id);
            setSelectedFood(
                searchFood._id,
                searchFood.name,
                searchFood.calories,
                searchFood.number_of_units,
                searchFood.measurement_description,
                searchFood.carbohydrate,
                searchFood.protein,
                searchFood.fat,
                1,
                searchFood.searchId
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* <FlatList
                style={styles.foodListSelected}
                data={filteredSelectedFood}
                showsVerticalScrollIndicator={false}
                keyExtractor={(food) => food.searchId.toString()}
                renderItem={({ item }) => (
                    <FoodItemSearch
                        id={item.searchId}
                        selectedFoodItemId={item.foodItem}
                        name={item.name}
                        toggle={(selectedFoodItemId, id, selected, name) =>
                            toggle(selectedFoodItemId, id, selected, name)
                        }
                    />
                )}
            /> */}
            <View style={styles.foodListSelected}>
                {filteredSelectedFood.map((item) => {
                    return (
                        <FoodItemSearch
                            key={item.searchId}
                            id={item.searchId}
                            selectedFoodItemId={item.foodItem}
                            name={item.name}
                            toggle={(selectedFoodItemId, id, selected, name) =>
                                toggle(selectedFoodItemId, id, selected, name)
                            }
                        />
                    );
                })}
            </View>
            <View style={styles.searchSection}>
                {searchString.length > 0 ? null : (
                    <FontAwesome name='search' style={styles.searchIcon} />
                )}
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
            <Alert />
            <FlatList
                style={styles.foodList}
                data={filteredSearchFood}
                showsVerticalScrollIndicator={false}
                keyExtractor={(food) => food.food_id}
                renderItem={({ item }) => (
                    <FoodItemSearch
                        id={item.food_id}
                        name={item.food_name}
                        toggle={(selectedFoodItemId, id, selected, name) =>
                            toggle(selectedFoodItemId, id, selected, name)
                        }
                    />
                )}
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
        marginBottom: 40,
    },
    foodListSelected: {
        height: 'auto',
        width: '100%',
        marginBottom: 20,
    },
});

const mapStateToProps = (state) => ({
    food: state.food,
    foodEntry: state.foodEntry,
});

export default connect(mapStateToProps, {
    searchFood,
    loadFatToken,
    searchFoodById,
    addSearchFood,
    getFood,
    setSelectedFood,
    removeSelectedFood,
})(SearchFood);
