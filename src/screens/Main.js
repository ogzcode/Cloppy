import { Text, View, StyleSheet } from "react-native"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList";

import { fontSize } from "../style/fontSize";
import { spacing } from "../style/spacing";
import { fontWeight } from "../style/fontWeight";
import { slate } from "../style/color";

export default function Main() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo App</Text>
            <TodoForm />
            <TodoList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: spacing[4],
    },
    header: {
        fontSize: fontSize["4xl"],
        fontWeight: fontWeight["bold"],
        textAlign: "center",
        color: slate["700"],
        borderBottomWidth: 1,
        borderBottomColor: slate["300"],
        paddingBottom: spacing[2],
        marginBottom: spacing[6],
    }
})
