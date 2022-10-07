import * as React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, BackHandler, TextInput} from 'react-native';
import TodoList from '../components/TodoList';
import { todoData } from '../data/todos';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTodosReducer, hideComplitedReducer} from '../context/todosSlice';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Home() {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const todos = useSelector(state => state.todos.todos)
  
  const [todoHidden, setTodoHidden] = React.useState(false);

  const disPatch = useDispatch()
  React.useEffect(()=>{
    const getTodos = async ()=>{
      try {
        let todos = JSON.parse(await AsyncStorage.getItem("@Todos"));
        if (todos !== null) {
          todos = todos.sort((a, b)=>{return a.hour > b.hour})
          disPatch(setTodosReducer(todos));
        }
      } catch (error) {
        console.error(error)
      }
    }

    getTodos(getTodos);
  }, [])

  const onHideBtn = async ()=>{
    if (todoHidden) {
      disPatch(hideComplitedReducer());
      let todos = JSON.parse(await AsyncStorage.getItem("@Todos"));

      if (todos) {
        todos = todos.sort((a, b)=>{return a.hour > b.hour});
        disPatch(setTodosReducer(todos));
      }
    }else{
      disPatch(hideComplitedReducer());
    }
    setTodoHidden(prevState=>!prevState);
  }

  return (
    <View style={{...styles.container, paddingTop:insets.top, paddingBottom:insets.bottom}}>
        {/* <Image
            source={{uri: 'https://i.pinimg.com/736x/57/90/a3/5790a3d9421b128613dc2f053ee657e3.jpg'}}
            style={styles.picture}
        /> */}
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.tittleHeader}>TodayTask</Text>
          <FontAwesome5 name="pencil-alt" size={32} color="black" />
        </View>
        <View style={{justifyContent:'center', alignItems:'center', paddingTop:30, paddingBottom:20}}>
          <TextInput
            style={styles.inputText}
            placeholder="Search Todo"
            placeholderTextColor={"#00000030"}
          />
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={styles.tittle}>Today</Text>
            <TouchableOpacity onPress={onHideBtn}>
                <Text style={styles.hideCompletedBtn}>{todoHidden ? "Show Completed" : "Hide Completed"}</Text>
            </TouchableOpacity>
        </View>
        <TodoList todoData={todos.filter(item=>item.isToday)}/>
        <Text style={styles.tittle}>Tomorrow</Text>
        <TodoList todoData={todos.filter(item=>!item.isToday)}/>

        <TouchableOpacity style={styles.btnAdd} onPress={()=>navigation.navigate("Add")}>
            <Text style={styles.btnAdd_icon}>+</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tittleHeader:{
    fontWeight:'600',
    marginTop:10,
    marginBottom:10,
    fontSize:48
  },
  container: {
    flex: 1,
    paddingHorizontal:15,

  },
  picture:{
    width:40,
    height:40,
    borderRadius:30,
    alignSelf:'flex-end'
  },
  tittle:{
    fontSize:34,
    fontWeight:'bold',
    marginTop:10,
    marginBottom:10,
    color:'#404040'
  },
  hideCompletedBtn:{
    color:'#3478f6'
  },
  btnAdd:{
    width:56,
    height:56,
    position:'absolute',
    bottom:50,
    right:20,
    backgroundColor:'#000',
    borderRadius:28,
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2
    },
    shadowOpacity:.5,
    shadowRadius:5,
    elevation:5,
  },
  btnAdd_icon:{
    fontSize:40,
    color:'#fff',
    position: 'absolute',
    top:2,
    left:16
  },
  inputText:{
    borderBottomColor:'#00000030',
    borderBottomWidth:2,
    width:'80%',
    fontSize:20,
    textAlign:'center',
    paddingBottom:4
  },
});
