import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR, SECONDARY_COLOR, GREY } from '../../config/theme';

// Icons
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// Navigation
import NavigationService from '../../../NavigationService';

const FoodButtons = ({ foodEntry: { foodEntries } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('AddFood', {
              title: 'Breakfast',
            })
          }>
          <View style={styles.columnContainer}>
            <Text style={styles.title}>Breakfast</Text>
            <View style={styles.iconCircle}>
              {foodEntries == '' ? (
                <MaterialIcons name='free-breakfast' style={styles.icon} />
              ) : (
                <MaterialIcons
                  name='free-breakfast'
                  style={foodEntries.food.breakfast.length > 0 ? styles.iconFilled : styles.icon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('AddFood', {
              title: 'Lunch',
            })
          }>
          <View style={styles.columnContainer}>
            <Text style={styles.title}>Lucnh</Text>
            <View style={styles.iconCircle}>
              {foodEntries == '' ? (
                <MaterialCommunityIcons name='bread-slice' style={styles.icon} />
              ) : (
                <MaterialCommunityIcons
                  name='bread-slice'
                  style={foodEntries.food.lunch.length > 0 ? styles.iconFilled : styles.icon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('AddFood', {
              title: 'Dinner',
            })
          }>
          <View style={styles.columnContainer}>
            <Text style={styles.title}>Dinner</Text>
            <View style={styles.iconCircle}>
              {foodEntries == '' ? (
                <MaterialIcons name='dinner-dining' style={styles.icon} />
              ) : (
                <MaterialIcons
                  name='dinner-dining'
                  style={foodEntries.food.dinner.length > 0 ? styles.iconFilled : styles.icon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.rowContainer, { marginTop: 30 }]}>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('AddFood', {
              title: 'Snack',
            })
          }>
          <View style={styles.columnContainer}>
            <Text style={styles.title}>Snack</Text>
            <View style={styles.iconCircle}>
              {foodEntries == '' ? (
                <FontAwesome5 name='cookie-bite' style={styles.icon} />
              ) : (
                <FontAwesome5
                  name='cookie-bite'
                  style={foodEntries.food.snack1.length > 0 ? styles.iconFilled : styles.icon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('AddFood', {
              title: 'Snack',
            })
          }>
          <View style={styles.columnContainer}>
            <Text style={styles.title}>Snack</Text>
            <View style={styles.iconCircle}>
              {foodEntries == '' ? (
                <FontAwesome5 name='cookie-bite' style={styles.icon} />
              ) : (
                <FontAwesome5
                  name='cookie-bite'
                  style={foodEntries.food.snack2.length > 0 ? styles.iconFilled : styles.icon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('AddFood', {
              title: 'Snack',
            })
          }>
          <View style={styles.columnContainer}>
            <Text style={styles.title}>Snack</Text>
            <View style={styles.iconCircle}>
              {foodEntries == '' ? (
                <FontAwesome5 name='cookie-bite' style={styles.icon} />
              ) : (
                <FontAwesome5
                  name='cookie-bite'
                  style={foodEntries.food.snack3.length > 0 ? styles.iconFilled : styles.icon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '10%',
    marginTop: 50,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
  },
  iconCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: SECONDARY_COLOR,
  },
  columnContainer: {
    display: 'flex',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    color: PRIMARY_COLOR,
  },
  icon: {
    color: PRIMARY_COLOR,
    fontSize: 40,
  },
  iconFilled: {
    color: SECONDARY_COLOR,
    fontSize: 40,
  },
});

const mapStateToProps = (state) => ({
  foodEntry: state.foodEntry,
});

export default connect(mapStateToProps, {})(FoodButtons);
