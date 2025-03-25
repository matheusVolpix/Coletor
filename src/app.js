import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./contextApi/auth";
import Routs from "./routs";
import { SafeAreaView , Text} from 'react-native';
export default props => {
    return(
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
                <AuthProvider>
                    <Routs />
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaView>
    )
}