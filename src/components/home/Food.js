import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

// Colors
import { PRIMARY_COLOR } from '../../config/theme';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Food = ({ calories }) => {
  return (
    <View style={styles.groupContainer}>
      <View style={styles.subTitleContainer}>
        <MaterialCommunityIcons style={styles.subTitleIcon} name='silverware-fork-knife' />
        <Text style={styles.subTitle}>Food</Text>
      </View>
      <View style={styles.groupFields}>
        <Text style={styles.groupFieldName}>0 / {calories} kcal</Text>
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
    width: '40%',
    color: PRIMARY_COLOR,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(Food);
