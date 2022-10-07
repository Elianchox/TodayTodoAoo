import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import TodoList from '../components/TodoList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTodosReducer, hideComplitedReducer} from '../context/todosSlice';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTodosStorage } from '../services/Storage';


export default function Home() {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const todos = useSelector(state => state.todos.todos);

  const [todoHidden, setTodoHidden] = React.useState(false);

  const disPatch = useDispatch();

  React.useEffect(()=>{
    const getTodos = async ()=>{
      try {
        let listTodos = await getTodosStorage("@Todos");
        if (listTodos !== null) {
          listTodos = listTodos.sort((a, b)=>{return a.hour > b.hour})
          disPatch(setTodosReducer(listTodos));
        }
      } catch (error) {
        await AsyncStorage.clear();
        console.error(error)
      }
    }

    getTodos();
    setInterval(() => {
      getTodos();
    }, 10000);
  }, [])

  const onHideBtn = async ()=>{
    if (todoHidden) {
      disPatch(hideComplitedReducer());
      let todos = await getTodosStorage("@Todos");

      if (todos) {
        todos = todos.sort((a, b)=>{return a.hour > b.hour});
        disPatch(setTodosReducer(todos));
      }
    }else{
      disPatch(hideComplitedReducer());
    }
    setTodoHidden(prevState=>!prevState);
  }

  const onInput = async (text)=>{
    let listTodos = await getTodosStorage("@Todos");
    const searchTodos = listTodos.filter(data=>{
      const dataText = data.text.toLowerCase();
      return dataText.includes(text.toLowerCase())
    })
    disPatch(setTodosReducer(searchTodos));
  }

  return (
    <View style={{...styles.container, paddingTop:insets.top, paddingBottom:insets.bottom}}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.tittleHeader}>TodayTask</Text>
          <FontAwesome5 name="pencil-alt" size={32} color="black" />
        </View>
        <View>
          <View style={{justifyContent:'center', alignItems:'center', paddingTop:30, paddingBottom:20, justifyContent:'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="Search Todo"
              placeholderTextColor={"#00000030"}
              onChangeText={(text)=>onInput(text)}
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
        </View>
        
        <TouchableOpacity style={styles.btnAdd} onPress={()=>navigation.navigate("Add")}>
          <Text style={styles.btnAdd_icon}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAddCats} onPress={()=>navigation.navigate("Cat")}>
            <FontAwesome5 style={styles.btnAddCatsIcon} name="cat" color="white" />
        </TouchableOpacity>
    </View>
  );
}
// https://catfact.ninja/facts?limit=
const styles = StyleSheet.create({
  tittleHeader:{
    fontWeight:'600',
    marginTop:16,
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
    bottom:40,
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
    paddingBottom:2,
    paddingLeft:10,
    borderBottomColor:'#00000030',
    borderBottomWidth:2,
    width:'80%',
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  btnAddCats:{
    width:56,
    height:56,
    position:'absolute',
    bottom:40,
    right:90,
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
  btnAddCatsIcon:{
    color:'#fff',
    position: 'absolute',
    fontSize:24,
    top:13,
    left:16
  }
});
