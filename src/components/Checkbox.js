import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sky, slate } from '../style/color';

const styles = StyleSheet.create({
    checkboxContainer: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: slate["400"],
        justifyContent: "center",
        alignItems: "center",
    },
    checkBoxTrue: {
        backgroundColor: sky["500"],
        borderColor: sky["500"],
    },
});

export default function Checkbox({ check, onChangeCheck }) {
    return (
        <TouchableOpacity onPress={onChangeCheck}>
            <View style={[styles.checkboxContainer, check && styles.checkBoxTrue]}>
                {check ? <Ionicons name="checkmark" size={16} color={"white"} /> : null}
            </View>
        </TouchableOpacity>
    )
}
    