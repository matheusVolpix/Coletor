import React, { useState } from "react";
import { Item,
    NomeItem,
    Ean,
    Quantidade,
    BotaoSecundario,
    TextoBotao
 } from "./style";
import { TouchableWithoutFeedback, View } from "react-native";

export default ({itens, openModal}) => {

    function send()
    {
        openModal(itens);
    }

    return(
        <Item>
            <NomeItem>{itens.descricao}</NomeItem>
            <Ean>EAN: {itens.CODIGOEAN}</Ean>
            <Quantidade>Quantidade inventariado: {itens.QUANTIDADE}</Quantidade>
            <BotaoSecundario onPress={send}>
                <TextoBotao>Ver produto</TextoBotao>
            </BotaoSecundario>
        </Item>
    )
}