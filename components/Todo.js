import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from './CheckBox';
import moment from 'moment/moment';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteTodoReducer } from '../context/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoEditReducer } from '../context/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { setTodosStorage } from '../services/Storage';

export default function Todo({
    id,
    text,
    status,
    isToday,
    hour,
    late
}){

    const navigation = useNavigation();
    const listTodo = useSelector(data => data.todos.todos)
    const disPatch = useDispatch();

    const onDelete = async ()=>{
        disPatch(deleteTodoReducer(id));
        try {
            await setTodosStorage("@Todos", JSON.stringify(
                listTodo.filter(item => item.id !== id)
            ));
        } catch (error) {
            console.error(error)
        }
    }

    const onTodo = ()=>{
        disPatch(setTodoEditReducer({
            id,
            text,
            status,
            isToday,
            hour
        }))

        navigation.navigate("Add");
    }

    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Checkbox
                    id={id}
                    text={text}
                    status={status}
                    isToday={isToday}
                    hour={hour}
                />
                <TouchableOpacity style={{width:'80%'}} onPress={onTodo}>
                    <Text style={status ? [styles.text, styles.statusTrue] : styles.text}>{text}</Text>
                    <Text 
                        style={{
                            ...(status ? [styles.hour, styles.statusTrue] : styles.hour),
                            ...((late && !status) && {color:'#F43F3F', textDecorationLine: 'line-through',} )
                        }}
                    >{late ? "Task not finished on time" : moment(new Date(hour)).format('LT')}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete-outline" size={28} color='#F43F3F'></MaterialIcons>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    text:{
        fontSize:18,
        fontWeight:'500',
        color:'#767676',
    },
    hour:{
        fontSize:13,
        fontWeight:'500',
        color:'#969696',
    },
    statusTrue:{
        textDecorationLine: 'line-through',
        color:'#70707070'
    }
})
