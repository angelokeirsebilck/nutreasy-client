import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// Colors
import { PRIMARY_COLOR } from '../config/theme';

// Icons
import { FontAwesome } from '@expo/vector-icons';

const SearchFood = () => {
  const [searchString, setSearchString] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        {searchString.length > 0 ? null : <FontAwesome name='search' style={styles.searchIcon} />}
        <TextInput
          style={styles.input}
          value={searchString}
          placeholder='Search food'
          onChangeText={(val) => setSearchString(val)}
          underlineColorAndroid='transparent'
          placeholderTextColor={PRIMARY_COLOR}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  searchSection: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 10,
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
});

export default SearchFood;
