import { createSlice } from "@reduxjs/toolkit";

/*
todoList: [] => Item<Array>
Item: {
    id
    title
    isCompleted
}
*/

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoList: [
            {
                id: "1",
                text: "Learn React Native",
                isCompleted: false,
            },
            {
                id: "2",
                text: "Learn Redux",
                isCompleted: false,
            },
            {
                id: "3",
                text: "Learn Redux Toolkit",
                isCompleted: false,
            },
            {
                id: "4",
                text: "Learn Redux Saga",
                isCompleted: false,
            },
            {
                id: "5",
                text: "Learn React Navigation",
                isCompleted: false,
            },
            {
                id: "6",
                text: "Learn React Native Paper",
                isCompleted: false,
            }
        ],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            state.todoList = state.todoList.map((todo) => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            });
        },
    },
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;