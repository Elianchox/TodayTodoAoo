
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTodo from "./containers/AddTodo";
import Home from "./containers/Home";
import Splash from './containers/Splash'
import { store } from './context/storage'
import { Provider } from 'react-redux';
import { BackHandler } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown:false}}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown:false, gestureEnabled:false}}
          />

          <Stack.Screen
            name="Add"
            component={AddTodo}
            options={{presentation:"modal"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}
