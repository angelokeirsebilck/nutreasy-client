import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Colors
import { PRIMARY_COLOR, GREY } from '../../config/theme';

// Icons
import { AntDesign } from '@expo/vector-icons';

const DatePicker = ({ date, setDate }) => {
  const dateNow = new Date(Date.now());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);

    if (event.type == 'set') {
    }
  };

  const setPrevDay = () => {
    var prevDay = new Date(date.getTime() - 86400000);
    setDate(prevDay);
  };
  const setNextDay = () => {
    var nextDay = new Date(date.getTime() + 86400000);
    setDate(nextDay);
  };

  const nextDay = new Date(date.getTime() + 86400000);
  if (nextDay > dateNow) {
    // console.log('disabled');
  }

  return (
    <View style={styles.datePickerContainer}>
      <TouchableOpacity onPress={() => setPrevDay()}>
        <AntDesign name='caretleft' style={styles.caret} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateContainer} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.date}>
          {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
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
          value={date}
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

export default DatePicker;
