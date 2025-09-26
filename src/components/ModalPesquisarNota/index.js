import React, { useState } from "react";
import { Background, BotaoFechar, BotaoPesquisar, BoxModal, Input, TextoBotaoPesquisar, Title, TopModal } from "./style";
import { TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default ({fecharModal, pesquisa}) => {

    const [texto, setTexto] = useState();

    function pesquisar()
    {
        pesquisa(texto);
    }

    return(
        <Background>
            <TouchableWithoutFeedback onPress={fecharModal}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

            <BoxModal>
                <TopModal>
                    <Title>Pesquisar Notas</Title>
                    <BotaoFechar onPress={fecharModal}>
                        <Icon name="x" size={25} color="#000"/>
                    </BotaoFechar>
                </TopModal>

                <Input 
                value={texto}
                onChangeText={text => setTexto(text)}
                placeholder="Digite aqui o N° da nota"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                />

                <BotaoPesquisar onPress={pesquisar}>
                    <TextoBotaoPesquisar>Pesquisar</TextoBotaoPesquisar>
                </BotaoPesquisar>

            </BoxModal>


            <TouchableWithoutFeedback onPress={fecharModal}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

        </Background>
    )
}