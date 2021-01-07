import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// Colors
import { PRIMARY_COLOR, RED, SECONDARY_COLOR } from '../../config/theme';

// Actions
import { searchFoodById } from '../../actions/food';

// Icons
import { FontAwesome } from '@expo/vector-icons';

const FoodDataSearch = ({ item, searchFoodById }) => {
  const [fatItem, setFatItem] = useState('');

  useEffect(() => {
    async function getSearchFood() {
      const fatItem = await searchFoodById(item.id);
      setFatItem(fatItem);
    }

    getSearchFood();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <View style={styles.subTitleContainer}>
          <FontAwesome name='list-alt' style={styles.subTitleIcon} />
          <Text style={styles.subTitle}>Food Data</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Name </Text>
          <Text style={styles.groupFieldData}>{item.name}</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Measurement Description </Text>
          <Text style={styles.groupFieldData}>{fatItem.measurement_description}</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Number of Units </Text>
          <Text style={styles.groupFieldData}>{fatItem.number_of_units}</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Calories </Text>
          <Text style={styles.groupFieldData}>{fatItem.calories}</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Carbohydrates (g) </Text>
          <Text style={styles.groupFieldData}>{fatItem.carbohydrate}</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Protein (g) </Text>
          <Text style={styles.groupFieldData}>{fatItem.protein}</Text>
        </View>
        <View style={styles.groupFields}>
          <Text style={styles.groupFieldName}>Fat (g) </Text>
          <Text style={styles.groupFieldData}>{fatItem.fat}</Text>
        </View>
      </View>
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
});

export default connect(null, {
  searchFoodById,
})(FoodDataSearch);
