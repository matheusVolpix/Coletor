import React, { useContext } from "react";
import { View } from "react-native";
import Header from "../../components/Header";
import { AuthContext } from "../../contextApi/auth";
import { Background, 
    ButtonOption,
    TextButtonOption
 } from "./style";
import { useNavigation } from "@react-navigation/native";

export default props => {

    const {user} = useContext(AuthContext);
    const navigation = useNavigation();

    return(
        <>
            <Header title="Inicio" user={user.user} />
            <Background>

                <ButtonOption onPress={() => navigation.navigate('Inventário')}>
                    <TextButtonOption>Inventario</TextButtonOption>
                </ButtonOption>

                <ButtonOption onPress={() => navigation.navigate('Recebimento')}>
                    <TextButtonOption>Recebimento</TextButtonOption>
                </ButtonOption>

            </Background>
        </>
    )
}