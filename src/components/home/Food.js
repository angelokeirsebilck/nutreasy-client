import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../config/theme';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// Navigation
import NavigationService from '../../../NavigationService';

const Food = ({
    calories,
    profile: {
        profile: { macroNutrients },
    },
    foodEntry: { totals },
}) => {
    const carbsAmount = parseFloat((((calories / 100) * macroNutrients.carbs) / 4).toFixed(0));
    const proteinAmount = parseFloat((((calories / 100) * macroNutrients.protein) / 4).toFixed(0));
    const fatAmount = parseFloat((((calories / 100) * macroNutrients.fat) / 9).toFixed(0));

    return (
        <View style={styles.groupContainer}>
            <TouchableOpacity
                style={styles.iconPlusContainer}
                onPress={() => NavigationService.navigate('Food')}>
                <Entypo name='squared-plus' style={styles.plusIcon} />
            </TouchableOpacity>
            <View style={styles.subTitleContainer}>
                <MaterialCommunityIcons style={styles.subTitleIcon} name='silverware-fork-knife' />
                <Text style={styles.subTitle}>Food</Text>
            </View>
            <View style={styles.groupFields}>
                <Text style={styles.groupFieldName}>
                    {totals.caloriesTotal.toFixed(2)} / {calories} Kcal
                </Text>
            </View>
            <View style={styles.groupFields}>
                <Text style={styles.groupFieldName}>
                    {totals.carbsTotal.toFixed(2)} / {carbsAmount} Carbohydrates (gr)
                </Text>
            </View>
            <View style={styles.groupFields}>
                <Text style={styles.groupFieldName}>
                    {totals.proteinTotal.toFixed(2)} / {proteinAmount} Protein (gr)
                </Text>
            </View>
            <View style={[styles.groupFields, { marginBottom: 0 }]}>
                <Text style={styles.groupFieldName}>
                    {totals.fatTotal.toFixed(2)} / {fatAmount} Fat (gr)
                </Text>
            </View>
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
    groupFieldName: {
        width: '85%',
        color: PRIMARY_COLOR,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
    },
    plusIcon: {
        color: SECONDARY_COLOR,
        fontSize: 30,
    },
    iconPlusContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
});

const mapStateToProps = (state) => ({
    profile: state.profile,
    foodEntry: state.foodEntry,
});
export default connect(mapStateToProps)(Food);
