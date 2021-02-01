import React, { useEffect, useState } from 'react';
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
import { createFood, searchFoodById, addSearchFood, getFood } from '../../actions/food';

const FoodItemSearch = ({
    name,
    id,
    selectedFoodItemId,
    setSelectedFood,
    removeSelectedFood,
    searchFoodById,
    addSearchFood,
    getFood,
    toggle,
    foodEntry: { selectedFood },
}) => {
    const [selected, setSelected] = useState(false);
    const [fatItem, setFatItem] = useState('');
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        selectedFood.forEach((item) => {
            if (item.foodItem == selectedFoodItemId) {
                setSelected(true);
            }
        });

        // async function getSearchFood() {
        //     console.log('test');
        //     const fatItem = await searchFoodById(id);
        //     if (mounted) setFatItem(fatItem);
        // }

        // getSearchFood();
    }, []);

    // const toggle = async () => {
    //     if (selected) {
    //         if (selectedFoodItemId) {
    //             removeSelectedFood(selectedFoodItemId);
    //             return;
    //         }
    //         removeSelectedFood(selectedId);
    //     } else {
    //         const fatItem = await searchFoodById(id);
    //         const data = {
    //             name,
    //             measurement_description: fatItem.measurement_description,
    //             calories: fatItem.calories,
    //             number_of_units: fatItem.number_of_units,
    //             carbohydrate: fatItem.carbohydrate,
    //             protein: fatItem.protein,
    //             fat: fatItem.fat,
    //             searchId: id,
    //         };

    //         const searchFood = await addSearchFood(data);
    //         await getFood();
    //         setSelectedId(searchFood._id);

    //         setSelectedFood(
    //             searchFood._id,
    //             searchFood.name,
    //             searchFood.calories,
    //             searchFood.number_of_units,
    //             searchFood.measurement_description,
    //             searchFood.carbohydrate,
    //             searchFood.protein,
    //             searchFood.fat,
    //             1,
    //             searchFood.searchId
    //         );
    //     }

    //     setSelected(!selected);
    // };

    const toggleHandler = (selectedFoodItemId, id, selected, name) => {
        toggle(selectedFoodItemId, id, selected, name);
        setSelected(!selected);
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <TouchableOpacity
                    onPress={() =>
                        NavigationService.navigate('NewFood2', {
                            title: 'Info Food',
                            edit: false,
                            item: {
                                id,
                                name,
                            },
                            search: true,
                        })
                    }>
                    <Text style={styles.name}>{name}</Text>
                    {/* <View style={styles.infoText}>
            <Text style={styles.calories}>{calories} kcal</Text>
            <Text style={styles.calories}> {unit} </Text>
            <Text style={styles.calories}>{measurementDescription}</Text>
          </View> */}
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <AntDesign
                    name='checkcircle'
                    style={selected ? styles.iconStyleChecked : styles.iconStyle}
                    onPress={() => toggleHandler(selectedFoodItemId, id, selected, name)}
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
    calories: {
        color: PRIMARY_COLOR,
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

export default connect(mapStateToProps, {
    setSelectedFood,
    removeSelectedFood,
    createFood,
    searchFoodById,
    addSearchFood,
    getFood,
})(FoodItemSearch);
