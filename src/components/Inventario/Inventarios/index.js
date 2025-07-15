import React, { useState } from "react";
import { BoxInventarios, Info } from "./style";
import { useNavigation } from "@react-navigation/native";

export default ({itens}) => {

    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    return(
        <>
            <BoxInventarios onPress={() => navigation.navigate('Buscar Produtos', {
                codigo: itens.CODIGOINVENTARIO,
                nome: itens.NOMEINVENTARIO})}>
                <Info>Inventário: {itens.NOMEINVENTARIO}</Info>
                <Info>Código: {itens.CODIGOINVENTARIO}</Info>
                <Info>Data de criação: {itens.DATAINVENTARIO}</Info>
                <Info>Loja: {itens.CODIGOFILIAL}</Info>
            </BoxInventarios>
        </>
    )
}