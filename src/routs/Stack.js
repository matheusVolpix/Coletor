import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/Login';

const Stack = createStackNavigator();

export default props => (

    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>

)