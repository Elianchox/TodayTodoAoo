
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTodo from "./containers/AddTodo";
import Home from "./containers/Home";
import { store } from './context/storage'
import { Porvider, Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown:false}}
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