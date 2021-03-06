import React, { useEffect, useState } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

// Colors
import { PRIMARY_COLOR, RED } from '../../config/theme';

//Icons
import { Ionicons } from '@expo/vector-icons';

// Actions
import { addError, removeError } from '../../actions/profile';

let weightError = null;
let ageError = null;
let heightError = null;

const UserData = ({
    addError,
    removeError,
    profile: { profile },
    setWeight,
    weight,
    height,
    setHeight,
    age,
    setAge,
    gender,
    setGender,
    heightUnit,
    setHeightUnit,
    weightUnit,
    setWeightUnit,
    activityLevel,
    setActivityLevel,
}) => {
    useEffect(() => {
        if (profile != null) {
            setAge(profile.age);
            setWeight(profile.weight);
            setHeight(profile.height);
            setGender(profile.gender);
            setActivityLevel(profile.activityLevel);
        }
    }, []);

    const validateWeight = (val) => {
        // if (val.length <= 0) {
        //   const newArray = errors;
        //   const errorExist = newArray.find((e) => e.field == 'weight');
        //   weightError = (
        //     <Text style={styles.errorStyle}>Weight is required and must be greater then 0.</Text>
        //   );
        //   if (errorExist) return;
        //   newArray.push({
        //     field: 'weight',
        //     msg: 'Weight is required and must be greater then 0.',
        //   });

        //   setErrors(newArray);
        // } else {
        //   const newArray = errors.filter((e) => e.field !== 'weight');
        //   setErrors(newArray);
        //   weightError = null;
        // }

        if (val.length <= 0) {
            addError('weight', 'Weight is required and must be greater then 0.');
            weightError = (
                <Text style={styles.errorStyle}>
                    Weight is required and must be greater then 0.
                </Text>
            );
        } else {
            removeError('weight');
            weightError = null;
        }
    };

    const validateAge = (val) => {
        if (val.length <= 0) {
            addError('age', 'Age is required and must be greater then 0.');
            ageError = (
                <Text style={styles.errorStyle}>Age is required and must be greater then 0.</Text>
            );
        } else {
            removeError('age');
            ageError = null;
        }
    };

    const validateHeight = (val) => {
        if (val.length <= 0) {
            addError('height', 'Height is required and must be greater then 0.');
            heightError = (
                <Text style={styles.errorStyle}>
                    Height is required and must be greater then 0.
                </Text>
            );
        } else {
            removeError('height');
            heightError = null;
        }
    };
    const initialGender = gender == 'male' ? 'Male' : 'Female';
    const genderData = [
        {
            key: 1,
            label: 'Male',
            value: 'male',
        },
        {
            key: 2,
            label: 'Female',
            value: 'female',
        },
    ];

    const initialHeightUnit = heightUnit == 'feet' ? 'Ft' : 'Cm';
    const heightData = [
        {
            key: 1,
            label: 'Ft',
            value: 'feet',
        },
        {
            key: 2,
            label: 'Cm',
            value: 'cm',
        },
    ];

    const initialWeightUnit = weightUnit == 'kg' ? 'Kg' : 'Lb';
    const weightUnitData = [
        {
            key: 1,
            label: 'Kg',
            value: 'kg',
        },
        {
            key: 2,
            label: 'Lb',
            value: 'lb',
        },
    ];

    let inittialActivityLevel;
    switch (activityLevel) {
        case 1.2:
            inittialActivityLevel = 'Little or no exercise';
            break;
        case 1.4:
            inittialActivityLevel = '1-2 days/week';
            break;
        case 1.6:
            inittialActivityLevel = '2-3 days/week';
            break;
        case 1.75:
            inittialActivityLevel = '4-5 days/week';
            break;
        case 2:
            inittialActivityLevel = '6-7 days/week';
            break;
        case 2.3:
            inittialActivityLevel = 'Professional athlete';
            break;
    }
    const activityLevelData = [
        {
            key: 1,
            label: 'Little or no exercise',
            value: 1.2,
        },
        {
            key: 2,
            label: '1-2 days/week',
            value: 1.4,
        },
        {
            key: 3,
            label: '2-3 days/week',
            value: 1.6,
        },
        {
            key: 4,
            label: '4-5 days/week',
            value: 1.75,
        },
        {
            key: 5,
            label: '6-7 days/week',
            value: 2,
        },
        {
            key: 6,
            label: 'Professional athlete',
            value: 2.3,
        },
    ];

    return (
        <View style={styles.groupContainer}>
            <View style={styles.subTitleContainer}>
                <Ionicons style={styles.subTitleIcon} name='settings' />
                <Text style={styles.subTitle}>User Data</Text>
            </View>
            {/* <View style={styles.groupFieldsNew}>
                <Text style={styles.groupFieldName}>Gender </Text>
                <Picker
                    style={{
                        fontFamily: 'Roboto_400Regular',
                        color: PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                        borderWidth: 2,
                        borderRadius: 10,
                    }}
                    itemStyle={{
                        fontFamily: 'Roboto_400Regular',
                        color: PRIMARY_COLOR,
                        // borderColor: PRIMARY_COLOR,
                        // borderWidth: 2,
                        // borderRadius: 10,
                    }}
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                    <Picker.Item label='Male' value='male' />
                    <Picker.Item label='Female' value='female' />
                </Picker>
            </View> */}
            {Platform.OS == 'ios' ? (
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Gender </Text>
                    <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 0 }]}>
                        <ModalSelector
                            data={genderData}
                            initValue={initialGender}
                            style={{
                                // borderRadius: 10,
                                // borderColor: PRIMARY_COLOR,
                                // borderWidth: 2,
                                width: '100%',
                            }}
                            initValueTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectStyle={{
                                borderWidth: 0,
                                width: '100%',
                            }}
                            touchableStyle={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                            }}
                            onChange={(option) => {
                                setGender(option.value);
                            }}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Gender </Text>
                    <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 0 }]}>
                        <Picker
                            style={{
                                width: '100%',
                                height: '100%',
                                fontFamily: 'Roboto_400Regular',
                                color: PRIMARY_COLOR,
                            }}
                            itemStyle={{
                                height: 40,
                                fontFamily: 'Roboto_400Regular',
                                color: PRIMARY_COLOR,
                                marginHorizontal: 8,
                                textAlign: 'left',
                            }}
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                            <Picker.Item label='Male' value='male' />
                            <Picker.Item label='Female' value='female' />
                        </Picker>
                    </View>
                </View>
            )}

            {/* <View style={styles.groupFields}>
                <Text style={styles.groupFieldName}>Gender </Text>
                <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 0 }]}>
                    <Picker
                        style={{
                            width: '100%',
                            height: '100%',
                            fontFamily: 'Roboto_400Regular',
                            color: PRIMARY_COLOR,
                        }}
                        itemStyle={{
                            height: 40,
                            fontFamily: 'Roboto_400Regular',
                            color: PRIMARY_COLOR,
                            marginHorizontal: 8,
                            textAlign: 'left',
                        }}
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                        <Picker.Item label='Male' value='male' />
                        <Picker.Item label='Female' value='female' />
                    </Picker>
                </View>
            </View> */}

            <View style={styles.groupFields}>
                <Text style={styles.groupFieldName}>Age </Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.groupFieldData}
                    value={age.toString()}
                    onChangeText={(val) => {
                        setAge(val);
                        validateAge(val);
                    }}
                    onEndEditing={(e) => validateAge(e.nativeEvent.text)}
                    style={[styles.groupFieldData]}
                />
            </View>
            {ageError}
            {Platform.OS == 'ios' ? (
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Height </Text>
                    <TextInput
                        value={height.toString()}
                        keyboardType='numeric'
                        onChangeText={(val) => {
                            setHeight(val);
                            validateHeight(val);
                        }}
                        onEndEditing={(e) => validateHeight(e.nativeEvent.text)}
                        style={[
                            styles.txtValueStyle,
                            {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRightWidth: 0,
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.selectStyle,
                            {
                                paddingHorizontal: 0,
                                paddingLeft: 4,

                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderLeftWidth: 0,
                            },
                        ]}>
                        <ModalSelector
                            data={heightData}
                            initValue={initialHeightUnit}
                            style={{
                                // borderRadius: 10,
                                // borderColor: PRIMARY_COLOR,
                                // borderWidth: 2,
                                width: '100%',
                            }}
                            initValueTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectStyle={{
                                borderWidth: 0,
                                width: '100%',
                            }}
                            touchableStyle={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                            }}
                            onChange={(option) => {
                                setHeightUnit(option.value);
                            }}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Height </Text>
                    <TextInput
                        value={height.toString()}
                        keyboardType='numeric'
                        onChangeText={(val) => {
                            setHeight(val);
                            validateHeight(val);
                        }}
                        onEndEditing={(e) => validateHeight(e.nativeEvent.text)}
                        style={[
                            styles.txtValueStyle,
                            {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRightWidth: 0,
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.selectStyle,
                            {
                                paddingHorizontal: 0,
                                paddingLeft: 4,

                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderLeftWidth: 0,
                            },
                        ]}>
                        <Picker
                            style={{
                                width: '100%',
                                height: '100%',
                                fontFamily: 'Roboto_400Regular',
                                color: PRIMARY_COLOR,
                            }}
                            selectedValue={heightUnit}
                            onValueChange={(itemValue, itemIndex) => setHeightUnit(itemValue)}>
                            <Picker.Item label='Cm' value='cm' />
                            <Picker.Item label='Ft' value='feet' />
                        </Picker>
                    </View>
                </View>
            )}

            {heightError}
            {Platform.OS == 'ios' ? (
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Weight </Text>
                    <TextInput
                        keyboardType='numeric'
                        value={weight.toString()}
                        onChangeText={(val) => {
                            setWeight(val);
                            validateWeight(val);
                        }}
                        onEndEditing={(e) => validateWeight(e.nativeEvent.text)}
                        style={[
                            styles.txtValueStyle,
                            {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRightWidth: 0,
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.selectStyle,
                            {
                                paddingHorizontal: 0,
                                paddingLeft: 4,

                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderLeftWidth: 0,
                            },
                        ]}>
                        <ModalSelector
                            data={weightUnitData}
                            initValue={initialWeightUnit}
                            style={{
                                // borderRadius: 10,
                                // borderColor: PRIMARY_COLOR,
                                // borderWidth: 2,
                                width: '100%',
                            }}
                            initValueTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectStyle={{
                                borderWidth: 0,
                                width: '100%',
                            }}
                            touchableStyle={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                            }}
                            onChange={(option) => {
                                setHeightUnit(option.value);
                            }}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.groupFields}>
                    <Text style={styles.groupFieldName}>Weight </Text>
                    <TextInput
                        keyboardType='numeric'
                        value={weight.toString()}
                        onChangeText={(val) => {
                            setWeight(val);
                            validateWeight(val);
                        }}
                        onEndEditing={(e) => validateWeight(e.nativeEvent.text)}
                        style={[
                            styles.txtValueStyle,
                            {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRightWidth: 0,
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.selectStyle,
                            {
                                paddingHorizontal: 0,
                                paddingLeft: 4,

                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderLeftWidth: 0,
                            },
                        ]}>
                        <Picker
                            style={{
                                width: '100%',
                                height: '100%',
                                fontFamily: 'Roboto_400Regular',
                                color: PRIMARY_COLOR,
                            }}
                            selectedValue={weightUnit}
                            onValueChange={(itemValue, itemIndex) => setWeightUnit(itemValue)}>
                            <Picker.Item label='Kg' value='kg' />
                            <Picker.Item label='Lb' value='lb' />
                        </Picker>
                    </View>
                </View>
            )}

            {weightError}
            {Platform.OS == 'ios' ? (
                <View style={[styles.groupFields, { marginBottom: 0 }]}>
                    <Text style={styles.groupFieldName}>Activity Level </Text>
                    <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 0 }]}>
                        <ModalSelector
                            data={activityLevelData}
                            initValue={inittialActivityLevel}
                            style={{
                                // borderRadius: 10,
                                // borderColor: PRIMARY_COLOR,
                                // borderWidth: 2,
                                width: '100%',
                            }}
                            initValueTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectTextStyle={{
                                color: PRIMARY_COLOR,
                            }}
                            selectStyle={{
                                borderWidth: 0,
                                width: '100%',
                            }}
                            touchableStyle={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                            }}
                            onChange={(option) => {
                                setActivityLevel(option.value);
                            }}
                        />
                    </View>
                </View>
            ) : (
                <View style={[styles.groupFields, { marginBottom: 0 }]}>
                    <Text style={styles.groupFieldName}>Activity Level </Text>
                    <View style={[styles.groupFieldData, { paddingHorizontal: 0, paddingLeft: 0 }]}>
                        <Picker
                            style={{
                                width: '100%',
                                height: '100%',
                                fontFamily: 'Roboto_400Regular',
                                color: PRIMARY_COLOR,
                            }}
                            selectedValue={activityLevel.toString()}
                            onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}>
                            <Picker.Item label='Little or no exercise' value='1.2' />
                            <Picker.Item label='1-2 days/week' value='1.4' />
                            <Picker.Item label='2-3 days/week' value='1.6' />
                            <Picker.Item label='4-5 days/week' value='1.75' />
                            <Picker.Item label='6-7 days/week' value='2' />
                            <Picker.Item label='Professional athlete' value='2.3' />
                        </Picker>
                    </View>
                </View>
            )}
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
    txtValueStyle: {
        flex: 2,
        height: 40,
        borderRadius: 10,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        backgroundColor: 'white',
        color: PRIMARY_COLOR,
        paddingHorizontal: 10,
    },
    selectStyle: {
        flex: 9,
        height: 40,
        borderRadius: 10,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        backgroundColor: 'white',
        textAlign: 'right',
    },
    groupFieldData: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        backgroundColor: 'white',
        color: PRIMARY_COLOR,
        paddingHorizontal: 10,
        fontFamily: 'Roboto_400Regular',
    },
    errorStyle: {
        color: RED,
        fontSize: 12,
        marginBottom: 4,
    },
    groupFieldsNew: {},
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { addError, removeError })(UserData);
