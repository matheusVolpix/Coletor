import React from "react";
import { View, TouchableWithoutFeedback, Alert } from "react-native";
import { BoxModal,
    Background,
    TopModal,
    Title,
    BotaoFechar,
    BotaoSecundario,
    TextoBotao
 } from "./style";
import Icon from "react-native-vector-icons/Feather";
import { FlatList } from "react-native-gesture-handler";
import Lista from "./Lista";

export default ({boletos, camera, fecharModal, enviar, chave}) => {

    function finalizar()
    {
        Alert.alert("Atenção", "Você tem certeza que deseja finalizar?",
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel', // estilo iOS para botão de cancelar
                },
                {
                    text: 'OK',
                    onPress: () => enviar(),
                },
            ],
        );
    }

    return(
        <Background>
            <TouchableWithoutFeedback onPress={fecharModal}>
                <View style={{flex: 1}} />

            </TouchableWithoutFeedback>

            <BoxModal>

                <TopModal>
                    <Title> Escanear boletos</Title>
                    <BotaoFechar onPress={fecharModal}>
                        <Icon name="x" size={25} color="#000"/>
                    </BotaoFechar>
                </TopModal>

                <FlatList 
                style={{flex: 1}}
                    data={boletos}
                    keyExtractor={boletos.codigo}
                    renderItem={({item}) => <Lista boleto={item}/>}
                />

                <BotaoSecundario background="#ed702f" onPress={camera}>
                    <TextoBotao>Adicionar</TextoBotao>
                </BotaoSecundario>

                <BotaoSecundario background="green" onPress={finalizar}>
                    <TextoBotao>Finalizar </TextoBotao>
                </BotaoSecundario>
                

            </BoxModal>

            <TouchableWithoutFeedback onPress={fecharModal}>
                <View style={{flex: 1}}/>

            </TouchableWithoutFeedback>
        </Background>
    )
}