import React from "react";
import { View } from "react-native";
import { Item,
    NomeItem,
    Ean,
    ContainerQuantidade,
    Quantidade
 } from "../Inventario/ListaInventario/style";
 import { Baixado } from "./style";

export default ({itens, remove}) => {
    return(
        <Item onLongPress={() => remove(itens.chavenfe, itens.filial)}>
            <NomeItem>
                {itens.chavenfe}
            </NomeItem>
            <Ean>Loja: {itens.filial}</Ean>
            <Ean>usuario: {itens.nomeusuario}</Ean>
            <Ean>data: {itens.datahora}</Ean>
            <Ean>status: {itens.status}</Ean>
            {itens.baixado == 'S' ? 
            <Baixado>Processada</Baixado> : null}
        </Item>
    )
}