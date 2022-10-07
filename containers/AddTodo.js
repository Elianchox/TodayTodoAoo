import * as React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Switch} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../context/todosSlice';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function AddTodo({
    idTodo,
    nameTodo,
    dateTodo,
    isTodayTodo
}){
    const [name, setName] = React.useState(nameTodo ? nameTodo : "");
    const [date, setDate] = React.useState(dateTodo ? dateTodo : new Date());
    const [isToday, setIsToday] = React.useState(isTodayTodo ? isTodayTodo : false);
    const navigation = useNavigation();

    const listTodo = useSelector(data => data.todos.todos)
    const disPatch = useDispatch();

    const addTodo = async () =>{
        const newTodo = {
            id:idTodo ? idTodo : uuid.v4(),
            text:name,
            status:false,
            hour:date.toString(),
            isToday:isToday,
        }

        try {
            const newListTodo = [...listTodo, newTodo];
            await AsyncStorage.setItem("@Todos", JSON.stringify(newListTodo));
            disPatch(addTodoReducer(newTodo));
            navigation.goBack();
        } catch (error) {
            console.error(error)
        }
    }

    return(
        
        <KeyboardAwareScrollView style={styles.container}>

            <Text style={styles.tittle}>Add Todo</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder="Name Task"
                    placeholderTextColor={"#00000030"}
                    onChangeText={(text)=>{setName(text)}}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Hour</Text>
                <DateTimePicker
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    onChange={(event, selectedDate)=>setDate(selectedDate)}
                    style={{width:'80%'}}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value)=>{ setIsToday(value)}}
                />
            </View>

            <TouchableOpacity style={styles.btn} onPress={addTodo}>
                <Text style={{color:'white'}} >Done</Text>
            </TouchableOpacity>
            <Text style={{color:'#00000070', textAlign:'center'}} >If you disable Today, the task will be considered as tomorrow</Text>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F7F8FA',
        paddingHorizontal:30,
    },
    tittle:{
        marginTop:10,
        marginBottom:35,
        fontSize:34,
        fontWeight:'bold',
    },
    inputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:35
    },
    inputLabel:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:24
    },
    inputText:{
        borderBottomColor:'#00000030',
        borderBottomWidth:1,
        width:'80%'
    },
    btn:{
        marginTop:'100%',
        marginBottom:15,
        alignItems:'center',
        backgroundColor: '#000000',
        height:46,
        borderRadius:11,
        justifyContent:'center',
        alignItems:'center'
    }
})