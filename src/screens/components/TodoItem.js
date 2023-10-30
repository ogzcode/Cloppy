import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { toggleComplete, removeTodo } from '../../store/slice/todoSlice';

import Checkbox from '../../components/Checkbox';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../style/spacing';
import { slate, red, green } from '../../style/color';
import { fontWeight } from '../../style/fontWeight';

export default function TodoItem({ item }) {
    const dispatch = useDispatch();

    const handleToggleComplete = () => {
        dispatch(toggleComplete(item.id));
    }

    const handleRemoveTodo = () => {
        dispatch(removeTodo(item.id));
    }

    return (
        <View style={[styles.itemContainer, item.completed && styles.itemCompleted]}>
            <Text style={styles.itemText}>{item.text}</Text>
            <View style={styles.itemAction}>
                <Checkbox check={item.completed} onChangeCheck={handleToggleComplete} />
                <Pressable style={styles.trashIconBox} onPress={() => handleRemoveTodo()}>
                    <Ionicons name="trash-outline" size={16} color={red[600]} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: spacing[2],
        paddingHorizontal: spacing[4],
        marginTop: spacing[4],
        borderColor: slate["400"],
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemCompleted: {
        borderColor: green["600"],
        backgroundColor: green["50"],
    },
    itemAction: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemText: {
        color: slate["700"],
        fontWeight: fontWeight["medium"],
    },
    trashIconBox: {
        backgroundColor: red[100],
        padding: spacing[1],
        width: 32,
        height: 32,
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: spacing[4],
    }
})