import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { SECONDARY_COLOR } from '../config/theme';

const PrimaryButton = ({ text }) => {
    return (
        <View style={styles.btnContainer}>
            <Text style={styles.textStyle}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 240,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingVertical: 9,
    },
    textStyle: {
        fontSize: 24,
        color: SECONDARY_COLOR,
        fontFamily: 'Roboto_700Bold',
    },
});

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired,
};

export default PrimaryButton;
