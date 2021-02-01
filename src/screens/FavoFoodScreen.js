import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR, GREY } from '../config/theme';

// Components
import FoodItem from '../components/food/FoodItem';

const FavoFood = ({ navigation, food }) => {
    let filteredFood = food.food.filter((food) => food.favorite == true && food.searchId == null);
    let sortedFood = filteredFood.sort((a, b) => (a.name > b.name ? 1 : -1));

    const noFavoFoodFound = <Text style={styles.noFavoStyle}>No favorite food found.</Text>;
    return (
        <View>
            <View style={styles.container}>
                {sortedFood.length == 0 ? (
                    noFavoFoodFound
                ) : (
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
                )}
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
    noFavoStyle: {
        color: PRIMARY_COLOR,
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

export default connect(mapStateToProps)(FavoFood);
