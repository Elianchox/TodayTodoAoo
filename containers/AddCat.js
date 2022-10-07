import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ApiCat } from '../services/Cat';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setTodosReducer } from '../context/todosSlice';
import { useNavigation } from '@react-navigation/native';
import { setTodosStorage } from '../services/Storage';

export default function CatModal() {

    const [inputNum, setInputNum] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [isToday, setIsToday] = React.useState(false);
    const listTodo = useSelector(data => data.todos.todos)
    const disPatch = useDispatch();
    const navigation = useNavigation();

    const onInput = (text)=>{
        setInputNum(text.replace(/[a-z]/gi, ""))
    }

    const onDone = async ()=>{
        try {
            const facts = await ApiCat.getCats(inputNum);
            let hour = date;
            if (!isToday) {
                hour.setDate(hour.getDate()+1)
            }
            const newTodos = facts.map(data=>{
                return {
                    id:uuid.v4(),
                    text:data.fact,
                    status:false,
                    isToday:isToday,
                    hour:hour.toString(),
                    late:false
                }
            })

            console.log(newTodos)
            const newListTodo = [...listTodo, ...newTodos];
            await setTodosStorage("@Todos", JSON.stringify(newListTodo));
            disPatch(setTodosReducer(newListTodo));
            navigation.navigate("Home")
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <KeyboardAwareScrollView style={styles.container}>
            <View>
                <Text style={styles.tittle}>Add Facts Cat</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount Facts</Text>
                <TextInput
                    keyboardType='numeric'
                    maxLength={3}
                    value={inputNum}
                    style={styles.inputText}
                    placeholder="Num Facts"
                    placeholderTextColor={"#00000030"}
                    onChangeText={(text)=>onInput(text)}
                ></TextInput>
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
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={120}>
                <TouchableOpacity style={styles.btn} onPress={onDone}>
                    <Text style={{color:'white'}} >Done</Text>
                </TouchableOpacity>
                <Text style={{color:'#00000070', textAlign:'center'}} >If you disable Today, the task will be considered as tomorrow</Text>
            </KeyboardAvoidingView>
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
        paddingBottom:35,
        justifyContent:'space-between'
    },
    inputLabel:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:24,
        paddingRight:20
    },
    inputText:{
        borderBottomColor:'#00000030',
        borderBottomWidth:1,
        width:'30%',
        paddingLeft:4,
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
});
