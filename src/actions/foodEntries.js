import {
  GET_FOOD_ENTRIES,
  SET_FOOD_ENTRIES,
  SET_DATE,
  SET_MOMENT,
  SET_SELECTED_FOOD,
  REMOVE_SELECTED_FOOD,
  CLEAR_SELECTED_FOOD,
  SET_AMOUNT,
  SET_SELECTED_FOOD_LIST,
  SET_LOADING_FALSE,
  CALC_TOTALS_DONE,
  SET_HOME_TOTALS,
} from './types';

import axios from 'axios';
import { API_URL } from '../config/settings';
import { AsyncStorage } from 'react-native';
// Navigation
import NavigationService from '../../NavigationService';

var dateOnLoad = new Date(Date.now());

export const getFoodEntries = (
  date = `${dateOnLoad.getDate()}-${dateOnLoad.getMonth() + 1}-${dateOnLoad.getFullYear()}`
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const token = await AsyncStorage.getItem('token');

    const data = {
      date,
    };
    const res = await axios.post(`${API_URL}/api/foodEntry/day`, data, config);
    dispatch({
      type: GET_FOOD_ENTRIES,
      payload: res.data,
    });
    dispatch(calcHomeTotals(res.data));
  } catch (error) {
    console.log(error);
  }
};

const calcHomeTotals = (foodEntries) => (dispatch) => {
  let carbsTotal = 0;
  let proteinTotal = 0;
  let caloriesTotal = 0;
  let fatTotal = 0;

  if (foodEntries.food) {
    foodEntries.food.breakfast.forEach((item) => {
      carbsTotal = carbsTotal + item.amount * item.foodItem.carbohydrate;
      caloriesTotal = caloriesTotal + item.amount * item.foodItem.calories;
      proteinTotal = proteinTotal + item.amount * item.foodItem.protein;
      fatTotal = fatTotal + item.amount * item.foodItem.fat;
    });

    foodEntries.food.lunch.forEach((item) => {
      carbsTotal = carbsTotal + item.amount * item.foodItem.carbohydrate;
      caloriesTotal = caloriesTotal + item.amount * item.foodItem.calories;
      proteinTotal = proteinTotal + item.amount * item.foodItem.protein;
      fatTotal = fatTotal + item.amount * item.foodItem.fat;
    });

    foodEntries.food.dinner.forEach((item) => {
      carbsTotal = carbsTotal + item.amount * item.foodItem.carbohydrate;
      caloriesTotal = caloriesTotal + item.amount * item.foodItem.calories;
      proteinTotal = proteinTotal + item.amount * item.foodItem.protein;
      fatTotal = fatTotal + item.amount * item.foodItem.fat;
    });

    foodEntries.food.snack1.forEach((item) => {
      carbsTotal = carbsTotal + item.amount * item.foodItem.carbohydrate;
      caloriesTotal = caloriesTotal + item.amount * item.foodItem.calories;
      proteinTotal = proteinTotal + item.amount * item.foodItem.protein;
      fatTotal = fatTotal + item.amount * item.foodItem.fat;
    });

    foodEntries.food.snack2.forEach((item) => {
      carbsTotal = carbsTotal + item.amount * item.foodItem.carbohydrate;
      caloriesTotal = caloriesTotal + item.amount * item.foodItem.calories;
      proteinTotal = proteinTotal + item.amount * item.foodItem.protein;
      fatTotal = fatTotal + item.amount * item.foodItem.fat;
    });

    foodEntries.food.snack3.forEach((item) => {
      carbsTotal = carbsTotal + item.amount * item.foodItem.carbohydrate;
      caloriesTotal = caloriesTotal + item.amount * item.foodItem.calories;
      proteinTotal = proteinTotal + item.amount * item.foodItem.protein;
      fatTotal = fatTotal + item.amount * item.foodItem.fat;
    });
  }

  const payload = {
    carbsTotal,
    proteinTotal,
    caloriesTotal,
    fatTotal,
  };

  dispatch({
    type: SET_HOME_TOTALS,
    payload,
  });
};

export const saveFoodEntries = (date, food, skip) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      date,
      food,
      skip,
    };

    const res = await axios.post(`${API_URL}/api/foodEntry`, data, config);

    dispatch({
      type: GET_FOOD_ENTRIES,
      payload: res.data,
    });
    NavigationService.navigate('Food');
  } catch (error) {
    console.log(error);
  }
};

export const setDate = (date) => (dispatch) => {
  dispatch({
    type: SET_DATE,
    payload: date,
  });
};

export const setMoment = (moment) => (dispatch) => {
  dispatch({
    type: SET_MOMENT,
    payload: moment,
  });
};

export const setSelectedFoodList = (selectedFood) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_FOOD_LIST,
    payload: selectedFood,
  });

  dispatch(calcTotals(selectedFood));
};

export const calcTotals = (selectedFood) => (dispatch) => {
  let carbsTotal = 0;
  let proteinTotal = 0;
  let caloriesTotal = 0;
  let fatTotal = 0;

  selectedFood.forEach((item) => {
    carbsTotal = carbsTotal + item.carbs * item.amount;
    proteinTotal = proteinTotal + item.protein * item.amount;
    caloriesTotal = caloriesTotal + item.calories * item.amount;
    fatTotal = fatTotal + item.fat * item.amount;
  });

  const payload = {
    carbsTotal,
    proteinTotal,
    caloriesTotal,
    fatTotal,
  };

  dispatch({
    type: CALC_TOTALS_DONE,
    payload,
  });
};

export const setSelectedFood = (
  foodItemId,
  name,
  calories,
  unit,
  measurementDescription,
  carbs,
  protein,
  fat,
  amount
) => (dispatch) => {
  const payload = {
    foodItem: foodItemId,
    name,
    calories,
    unit,
    measurementDescription,
    carbs,
    protein,
    fat,
    amount,
  };

  dispatch({
    type: SET_SELECTED_FOOD,
    payload,
  });
};

export const setLoadingFalse = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING_FALSE,
    payload,
  });
};

export const removeSelectedFood = (foodItemId) => (dispatch) => {
  dispatch({
    type: REMOVE_SELECTED_FOOD,
    payload: foodItemId,
  });
};

export const clearSelectedFood = () => (dispatch) => {
  dispatch({
    type: CLEAR_SELECTED_FOOD,
  });
};

export const setAmount = (id, amount) => (dispatch) => {
  dispatch({
    type: SET_AMOUNT,
    payload: {
      id,
      amount,
    },
  });
};
