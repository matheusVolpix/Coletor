import React, { useState } from "react";
import { Item,
    NomeItem,
    Ean,
    ContainerQuantidade,
    Quantidade,
    BotaoSecundario,
    TextoBotao
 } from "./style";
import { TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default ({itens, openModal}) => {

    function send()
    {
        openModal(itens);
    }

    return(
        <Item onPress={send}>
            <NomeItem>
                {itens.descricao}
                </NomeItem>
            <Ean>EAN: {itens.CODIGOEAN}</Ean>
            <ContainerQuantidade>
                <Quantidade>Quantidade inventariado: {itens.QUANTIDADE}</Quantidade>
                {itens.QUANTIDADE > 0 ? 
                (<Icon name="check" color="#08de04" size={25}/>) : 
                null}
                
            </ContainerQuantidade>
        </Item>
    )
}