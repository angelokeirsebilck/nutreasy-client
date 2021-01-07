import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR, GREY } from '../../config/theme';

// Icons
import { AntDesign } from '@expo/vector-icons';

// Actions
import { setDate, getFoodEntries } from '../../actions/foodEntries';

const DatePicker = ({ setDate, getFoodEntries }) => {
  const dateNow = new Date(Date.now());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePicker, setDatePicker] = useState(dateNow);

  const onChange = async (event, selectedDate) => {
    setShowDatePicker(false);

    const currentDate = selectedDate || datePicker;
    setDatePicker(currentDate);

    setDate(currentDate);
    getFoodEntries(
      `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
    );
  };

  const setPrevDay = async () => {
    var prevDay = new Date(datePicker.getTime() - 86400000);
    setDatePicker(prevDay);
    setDate(prevDay);
    getFoodEntries(`${prevDay.getDate()}-${prevDay.getMonth() + 1}-${prevDay.getFullYear()}`);
  };

  const setNextDay = () => {
    var nextDay = new Date(datePicker.getTime() + 86400000);
    setDatePicker(nextDay);
    setDate(nextDay);
    getFoodEntries(`${nextDay.getDate()}-${nextDay.getMonth() + 1}-${nextDay.getFullYear()}`);
  };

  let nextDay = new Date(Date.now() + 86400000);
  if (datePicker != null) {
    nextDay = new Date(datePicker.getTime() + 86400000);
  }

  return (
    <View style={styles.datePickerContainer}>
      <TouchableOpacity onPress={() => setPrevDay()}>
        <AntDesign name='caretleft' style={styles.caret} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateContainer} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.date}>
          {`${datePicker.getDate()}-${datePicker.getMonth() + 1}-${datePicker.getFullYear()}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={nextDay > dateNow ? true : false} onPress={() => setNextDay()}>
        <AntDesign
          name='caretright'
          style={nextDay > dateNow ? styles.caretDisabled : styles.caret}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID='dateTimePicker'
          value={datePicker}
          mode={'date'}
          is24Hour={true}
          display='default'
          onChange={onChange}
          maximumDate={dateNow}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  date: {
    fontSize: 26,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
    color: PRIMARY_COLOR,
  },
  caret: {
    fontSize: 24,
    color: PRIMARY_COLOR,
  },
  caretDisabled: {
    fontSize: 24,
    color: GREY,
  },
});

const mapStateToProps = (state) => ({
  foodEntry: state.foodEntry,
});

export default connect(mapStateToProps, { setDate, getFoodEntries })(DatePicker);
