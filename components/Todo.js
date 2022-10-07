import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from './CheckBox';
import moment from 'moment/moment';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteTodoReducer } from '../context/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../context/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Todo({
    id,
    text,
    status,
    isToday,
    hour
}){

    const [hourLocal, setLocalHour] = React.useState(new Date(hour));
    const listTodo = useSelector(data => data.todos.todos)
    const disPatch = useDispatch();

    const onDelete = async ()=>{
        disPatch(deleteTodoReducer(id));
        try {
            await AsyncStorage.setItem("@Todos", JSON.stringify(
                listTodo.filter(item => item.id !== id)
            ));
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Checkbox
                    id={id}
                    text={text}
                    status={status}
                    isToday={isToday}
                    hour={hour}
                />
                <View>
                    <Text style={status ? [styles.text, styles.statusTrue] : styles.text}>{text}</Text>
                    <Text style={status ? [styles.hour, styles.statusTrue] : styles.hour}>{moment(hourLocal).format('LT')}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete-outline" size={24} color='#73737380' style={{}}></MaterialIcons>
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
        fontSize:15,
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
