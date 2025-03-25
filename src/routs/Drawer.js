import React, {useContext} from "react";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import Collector from "../screens/collector/Collector";
import Solicitations from "../screens/collector/Solicitations";
import Tags from "../screens/collector/Tags";
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
import { AuthContext } from "../contextApi/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stylesDefault from "../pages/stylesDefault";
import Bottom from "./Bottom";



const Drawer = createDrawerNavigator();


export default props => {

  const {logoff} = useContext(AuthContext);

    logout = () => {
      AsyncStorage.removeItem("filial");
        logoff();
    }
    
    function CustomDrawerContent(props) {
        return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Sair" labelStyle={{color: "#fff"}} onPress={() => logout()} />
              </DrawerContentScrollView>
            );
        }

    return (
    <Drawer.Navigator screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: stylesDefault.colors.backgroundColorBlack,
        
      },
      headerTintColor: "#fff",
      drawerStyle: {
        backgroundColor: stylesDefault.colors.backgroundColorBlack
    },
      drawerActiveBackgroundColor: stylesDefault.colors.colorPrimary,
      drawerActiveTintColor: "#fff",
      drawerInactiveBackgroundColor: stylesDefault.colors.backgroundColorBlack,
      drawerInactiveTintColor: "#fff"
    }} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Resumo Geral" component={Bottom} />
      {/*<Drawer.Screen name="Coletor" component={Collector} />*/}
      {/*<Drawer.Screen name="Solicitação" component={Solicitations} />*/}
      {/*<Drawer.Screen name="Etiquetas" component={Tags} />*/}
      
      
      
        
    </Drawer.Navigator>

    )
    
}