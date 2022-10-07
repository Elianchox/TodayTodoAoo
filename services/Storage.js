
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTodosStorage = async (Storage)=>{
    let listTodos = JSON.parse(await AsyncStorage.getItem(Storage));
    if (listTodos) {
        listTodos = listTodos.map(todo=>{
            const dateTodo = new Date(todo.hour);
            console.log(dateTodo)
            console.log(new Date())
            if (dateTodo<new Date()) {
                todo.late = true
            }
            return todo;
        });
    }
    return listTodos;
}

const prueba = (data)=>{
    try {
        data.map(todo=>{
            const dateTodo = new Date(todo.hour);
            if (dateTodo<new Date()) {
                todo.late = true
            }
            return todo;
        })
    } catch (error) {
        
    }
}

const setTodosStorage = async (Storage, item)=>{
    await AsyncStorage.setItem(Storage, item)
}

export {getTodosStorage, setTodosStorage};
