import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { nanoid } from 'nanoid';
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from 'react-redux';
import { addTodo } from "../../store/slice/todoSlice"
import { spacing } from '../../style/spacing';
import { fontSize } from '../../style/fontSize';
import { red, sky, slate } from '../../style/color';
import { fontWeight } from '../../style/fontWeight';

export default function TodoForm() {
    const [text, setText] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);

    const dispatch = useDispatch();

    const handleChangeText = (newtext) => {
        if (isEmpty) setIsEmpty(false);

        setText(newtext);
    }

    const handlePress = () => {
        if (text.length === 0) {
            setIsEmpty(true);
            return
        }
        let item = {
            id: nanoid(),
            text: text,
            isCompleted: false,
        }
        dispatch(addTodo(item))
        
        setIsEmpty(false);
        setText("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>New Todo</Text>
                <TextInput
                    value={text}
                    onChangeText={newtext => handleChangeText(newtext)}
                    style={styles.input}
                    placeholder="Add a todo"
                    placeholderTextColor={"#757575"}
                />
                {
                    isEmpty && <Text style={styles.errorText}>Please enter a todo</Text>
                }
            </View>
            <TouchableOpacity style={styles.button} onPress={handlePress} >
                <AntDesign name="plus" size={16} color="#fff" />
                <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    formGroup: {
        marginBottom: spacing[8],
        position: "relative",
    },
    label: {
        fontSize: fontSize["xs"],
        color: slate["500"],
        marginBottom: spacing[1],
    },
    input: {
        padding: spacing[2],
        borderWidth: 1,
        borderColor: slate["300"],
        borderRadius: 4,
        outlineWidth: 0,
        color: slate["700"]
    },
    errorText: {
        fontSize: fontSize["xs"],
        color: red["500"],
        marginTop: spacing[1],
        position: "absolute",
        top: "100%",
        left: 0,
    },
    button: {
        backgroundColor: sky["500"],
        padding: spacing[2],
        borderRadius: 4,
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: spacing[2],
    },
    buttonText: {
        color: "#fff",
        fontWeight: fontWeight["medium"],
        textAlign: "center",
    }
})
