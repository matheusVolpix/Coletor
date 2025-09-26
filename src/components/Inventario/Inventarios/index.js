import React, { useState } from "react";
import { BoxInventarios, Info } from "./style";
import { useNavigation } from "@react-navigation/native";

export default ({itens}) => {

    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    function showStatus()
    {
        if(itens.STATUS == 'C'){
            return 'Congelado';
        }
        if(itens.STATUS == 'P'){
            return 'Processado';
        }
        if(itens.STATUS == 'E'){
            return 'Excluido';
        }
    }

    return(
        <>
            <BoxInventarios onPress={() => navigation.navigate('Buscar Produtos', {
                codigo: itens.CODIGOINVENTARIO,
                nome: itens.NOMEINVENTARIO,
                status: itens.STATUS})}
                background={itens.STATUS == 'C' ? true : false}>
                <Info>Inventário: {itens.NOMEINVENTARIO}</Info>
                <Info>Código: {itens.CODIGOINVENTARIO}</Info>
                <Info>Data de criação: {itens.DATAINVENTARIO}</Info>
                <Info>Loja: {itens.CODIGOFILIAL}</Info>
                <Info>Faltam: {itens.diferenca} dias</Info>
                <Info>Status: 
                    {showStatus()}</Info>
            </BoxInventarios>
        </>
    )
}