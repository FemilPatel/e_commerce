import React, {Component} from 'react';
// //import { StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import display from './components/Display';
import Login from './components/Login';
import Home from './components/Home';

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="display">
        <Stack.Screen name="display" component={display} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
