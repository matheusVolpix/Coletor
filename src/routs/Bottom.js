import React, {useContext} from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Collector from "../screens/collector/Collector";
import Solicitations from "../screens/collector/Solicitations";
import Tags from "../screens/collector/Tags";
import Icon from "react-native-vector-icons/Feather";
import { AuthContext } from "../contextApi/auth";
import Inventario from "./Inventario/Stack";
import Recebimento from "../pages/Recebimento";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../pages/Inicio";



const Stack = createStackNavigator();


export default props => {

    const {resumoGeral, produtos, etiqueta, solicitacao} = useContext(AuthContext);

    // function ResumoGeral(){
    //     if(resumoGeral == "S"){
    //         return <Tab.Screen name="Resumo Geral bottom" component={Home} 
    //         options={{
    //             title: "Resumo Geral",
    //             tabBarIcon: ({color, size}) =>
    //                 <Icon name="home" size={size} color={color} />
    //         }}/>
    //     }
    // }

    // function Produtos(){
    //     if(produtos == "S"){
    //         return(<Tab.Screen name="Coletor bottom" component={Collector} 
    //         options={{
    //             title: "Coletor",
    //             tabBarIcon: ({color, size}) =>
    //                 <Icon name="camera" size={size} color={color} />
    //         }}/>)
    //     }
    // }

    // function Etiqueta(){
    //     if(etiqueta == "S"){
    //         return (<Tab.Screen name="Etoquetas bottom" component={Tags} 
    //         options={{
    //             title: "Etiquetas",
    //             tabBarIcon: ({color, size}) => 
    //                 <Icon name="tag" size={size} color={color} />
    //         }}/>)
    //     }
    // }

    // function Solicitacoes(){
    //     if(solicitacao == "S"){
    //         return <Tab.Screen name="Solicitações bototom" component={Solicitations} 
    //         options={{
    //             title: "Solicitações",
    //             tabBarIcon: ({color, size}) => 
    //                 <Icon name="inbox" size={size} color={color} />
    //         }}/>
    //     }
    // }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Inventário" component={Inventario} />
            <Stack.Screen name="Recebimento" component={Recebimento} />
            
            
        </Stack.Navigator>

    )
    
}