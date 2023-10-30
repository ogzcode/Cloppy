import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Picker } from 'react-native';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { spacing } from '../../style/spacing';
import { slate } from '../../style/color';
import { fontSize } from '../../style/fontSize';
import { fontWeight } from '../../style/fontWeight';

export default function TodoList() {
    const { todoList } = useSelector(state => state.todo);

    return (
        <View style={styles.todoListContainer}>
            <View style={styles.listHeader}>
                <Text style={styles.header}>Todo List</Text>
            </View>
            <FlatList
                data={todoList}
                renderItem={({ item }) => <TodoItem item={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    todoListContainer: {
        marginTop: spacing[8],
        flex: 1,
        borderRadius: 4,
    },
    listHeader: {
        paddingVertical: spacing[2],
        borderBottomWidth: 1,
        borderBottomColor: slate["300"],
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing[4],
    },
    header: {
        fontSize: fontSize["lg"],
        fontWeight: fontWeight["medium"],
        color: slate["700"],
    }
})