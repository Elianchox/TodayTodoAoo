import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name:"todos",
    initialState:initialState,
    reducers:{
        setTodosReducer:(state, action)=>{
            state.todos = action.payload;
        },
        addTodoReducer:(state, action)=>{
            state.todos.push(action.payload);
        },
        updateTodoStatusReducer:(state, action)=>{
            state.todos = state.todos.map(item=>{
                if (item.id === action.payload.id) {
                    item.status = !item.status;
                }
                return item;
            });
        },
        deleteTodoReducer:(state, action)=>{
            const id = action.payload;
            state.todos = state.todos.filter(item => item.id !== id);
        },
        hideComplitedReducer:(state)=>{
            state.todos = state.todos.filter(item => !item.status)
        }
    },
});

export const {
    setTodosReducer,
    addTodoReducer,
    updateTodoStatusReducer,
    deleteTodoReducer,
    hideComplitedReducer
} = todoSlice.actions

export default todoSlice.reducer;