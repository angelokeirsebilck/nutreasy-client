import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// Colors
import { PRIMARY_COLOR, SECONDARY_COLOR, RED } from '../config/theme';

// Actions
import {
    setAmount,
    setSelectedFoodList,
    setLoadingFalse,
    calcTotals,
} from '../actions/foodEntries';

// Components
import DoneButton from '../components/food/DoneButton';

// Utils
import { ucFirst } from '../utils/ucFirst';
import { ScrollView } from 'react-native-gesture-handler';

const SaveFoodEntriesScreenNew = ({
    navigation,
    foodEntry: {
        selectedFood,
        moment,
        totalsMoment,
        foodEntries: { food },
    },
    setAmount,
    setSelectedFoodList,
}) => {
    const plusClicked = (id) => {
        const item = selectedFood.filter((item) => item.foodItem == id);
        const newMultiplier = item[0].amount + 0.25;

        setAmount(id, newMultiplier);
        setSelectedFoodList(selectedFood);
    };

    const minusClicked = (id) => {
        const item = selectedFood.filter((item) => item.foodItem == id);
        const newMultiplier = item[0].amount - 0.25;

        if (newMultiplier <= 0) return;
        setAmount(id, newMultiplier);
        setSelectedFoodList(selectedFood);
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });
        setSelectedFoodList(selectedFood);

        return () => {
            backHandler.remove();
        };
    }, []);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.groupContainer}>
                <View style={styles.subTitleContainer}>
                    <FontAwesome name='cart-plus' style={styles.subTitleIcon} />
                    <Text style={styles.subTitle}>Total</Text>
                </View>
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Calories </Text>
                    <Text style={styles.groupFieldData}>
                        {totalsMoment.caloriesTotal.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Carbohydrates (g) </Text>
                    <Text style={styles.groupFieldData}>{totalsMoment.carbsTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Protein (g) </Text>
                    <Text style={styles.groupFieldData}>
                        {totalsMoment.proteinTotal.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Fat (g) </Text>
                    <Text style={styles.groupFieldData}>{totalsMoment.fatTotal.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.groupContainer}>
                <View style={styles.subTitleContainer}>
                    <Entypo name='list' style={styles.subTitleIcon} />
                    <Text style={styles.subTitle}>Selected Food</Text>
                </View>
                {selectedFood.map((item, index) => {
                    return (
                        <View key={index} style={styles.groupFields}>
                            <View style={styles.groupFieldNameContainer}>
                                <Text style={styles.foodItemName}>{item.name}</Text>
                                <Text style={styles.foodItemInfo}>
                                    {item.calories * item.amount} kcal {item.unit * item.amount}{' '}
                                    {item.measurementDescription}
                                </Text>
                            </View>
                            <View style={styles.plusMinContainer}>
                                <TouchableOpacity onPress={() => minusClicked(item.foodItem)}>
                                    <Entypo name='squared-minus' style={styles.plusIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => plusClicked(item.foodItem)}>
                                    <Entypo name='squared-plus' style={styles.plusIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </View>

            <TouchableOpacity
                style={styles.newFoodContainer}
                onPress={() =>
                    navigation.navigate('AddFood', {
                        title: ucFirst(moment),
                    })
                }>
                <Entypo name='squared-plus' style={styles.plusIcon} />
                <Text style={styles.newFood}>Add Food</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
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
        width: '65%',
        color: PRIMARY_COLOR,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
    },
    groupFieldNameContainer: {
        width: '65%',
        color: PRIMARY_COLOR,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        display: 'flex',
    },
    groupFieldData: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        color: PRIMARY_COLOR,
        paddingHorizontal: 10,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
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
    newFoodContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    foodItemName: {
        color: PRIMARY_COLOR,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
    },
    foodItemInfo: {
        color: PRIMARY_COLOR,
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
    },
    plusMinContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    nextButton: {
        paddingRight: 20,
        fontSize: 20,
        color: PRIMARY_COLOR,
    },
});

const mapStateToProps = (state) => ({
    foodEntry: state.foodEntry,
});

SaveFoodEntriesScreenNew.navigationOptions = ({ navigation }) => {
    return {
        headerLeft: () => {
            return <HeaderBackButton onPress={() => navigation.goBack()} />;
        },
        headerRight: () => {
            return <DoneButton />;
        },
    };
};

export default connect(mapStateToProps, {
    setAmount,
    setSelectedFoodList,
    setLoadingFalse,
    calcTotals,
})(SaveFoodEntriesScreenNew);
