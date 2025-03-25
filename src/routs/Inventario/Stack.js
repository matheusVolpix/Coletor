import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inventario from "../../pages/Inventario";
import BuscarProduto from "../../pages/Inventario/BuscarProduto";

const Stack = createStackNavigator();


export default props => {
    return(
        <Stack.Navigator initialRouteName="Inventario" 
        screenOptions={{headerShown: false}}>
            <Stack.Screen name="Inventario" component={Inventario}/>
            <Stack.Screen name="Buscar Produtos" component={BuscarProduto}/>
        </Stack.Navigator>
    )
}