import React from "react";
import { View, Text } from "react-native";

export default ({data}) => {
    return(
        <View style={{flex: 1, width: "100%", marginVertical: 10, borderWidth: 1, borderColor: "#000"
        }}>
            <Text style={{color: "#000", marginVertical: 4,
                borderBottomWidth: 1,
                borderColor: "#000",
                paddingLeft: 8}}>{data.filial}</Text>
            <Text style={{color: "#000", marginVertical: 4, paddingLeft: 8}}>Loja: {data.lojaMatriz}</Text>
            <Text style={{color: "#000", marginVertical: 4, paddingLeft: 8}}>
                Faturamento: {parseFloat(data.faturamento).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                <Text style={{color: "#000", marginVertical: 4, paddingLeft: 8}}>
                Lucro: {parseFloat(data.lucro).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                <Text style={{color: "#000", marginVertical: 4, paddingLeft: 8}}>
                Despesas: {parseFloat(data.despesas).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                <Text style={{color: "#000", marginVertical: 4, paddingLeft: 8}}>
                Rentabilidade: {data.rentabilidade}%</Text>
                <Text style={{color: "#000", marginVertical: 4, paddingLeft: 8}}>
                Resultado: {parseFloat(data.resultado).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
        </View>
    )
}