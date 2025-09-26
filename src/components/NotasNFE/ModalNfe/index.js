import React from "react";
import { Background, BoxModal, TopModal, BotaoFechar, Title } from "./style";
import { Alert, TouchableWithoutFeedback, View } from "react-native";
import { Ean, NomeItem } from "../../Inventario/ListaInventario/style";
import { BotaoBoleto, BotaoStatus, TextoBotaoStatus } from "../style";
import Icon from "react-native-vector-icons/Feather";

export default ({fecharModal, itens, serie, enviar, chaveAtual}) => {

    function formatarBRL()
    {
        if(itens.valor){
            return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        }).format(itens.valor);
        }
        
        return;
    }

    function buttonStats()
    {
        if(itens.status == 'pendente'){
            return(
                <BotaoStatus background="red" onPress={mudarNota}>
                    <TextoBotaoStatus>Iniciar Conferência</TextoBotaoStatus>
                </BotaoStatus>
            )
        }

        if(itens.status == 'em-andamento'){
            return(
                <BotaoStatus background="#f5f116" onPress={mudarNota}>
                    <TextoBotaoStatus background="#000">Finalizar Conferência</TextoBotaoStatus>
                </BotaoStatus>
            )
        }

        if(itens.status == 'recebida' || itens.status == 'finalizada'){
            return(
                <BotaoStatus background="green" onPress={mudarNota}>
                    <TextoBotaoStatus>{itens.status.toUpperCase()}</TextoBotaoStatus>
                </BotaoStatus>
            )
        }
    }

    function mudarNota()
    {
        if(itens.status == 'pendente'){
            Alert.alert("Atenção", "Essa nota esta como PENDENTE, você tem certeza que desja alterar o status dela para EM ANDAMENTO?",
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancelado'),
                        style: 'cancel', // estilo iOS para botão de cancelar
                    },
                    {
                        text: 'OK',
                        onPress: () => enviar(itens.chave),
                    },
                ],
            );
        }

        if(itens.status == 'em-andamento'){
            Alert.alert("Atenção", "Essa nota esta como EM ANDAMENTO, você tem certeza que desja alterar o status dela para RECEBIDA?",
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancelado'),
                        style: 'cancel', // estilo iOS para botão de cancelar
                    },
                    {
                        text: 'OK',
                        onPress: () => enviar(itens.chave),
                    },
                ],
            );
        }

        if(itens.status == 'recebida'){
            Alert.alert("erro", "NF ja recebida");
            return;
        }

        if(itens.status == 'finalizada'){
            Alert.alert("erro", "NF ja finalizada");
            return;
        }
    }

    function botaoBoleto()
    {
        if(itens.status == "em-andamento"){
            return(
                <BotaoBoleto onPress={() => chaveAtual(itens.chave)}>
                    <Icon name="file-text" color="#000" size={20} />
                </BotaoBoleto>
            )
        }
    }


    return(
        <Background>
            <TouchableWithoutFeedback onPress={fecharModal}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

            <BoxModal>
                <TopModal>
                    <Title> NNF: {serie}</Title>

                    {botaoBoleto()}

                    <BotaoFechar onPress={fecharModal}>
                        <Icon name="x" size={25} color="#000"/>
                    </BotaoFechar>
                </TopModal>
                
                <Ean>{itens.fornecedor}</Ean>
                <Ean>cnpj: {itens.cnpj}</Ean>
                <Ean>emissao: {itens.emissao}</Ean>
                <Ean>Total: {formatarBRL()}</Ean>
                <Ean>(Loja: {itens.loja} - {itens.nomeusuario} - {itens.datainclusao})</Ean>
                {buttonStats()}
            </BoxModal>

            {console.log(itens)}

            <TouchableWithoutFeedback onPress={fecharModal}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

        </Background>
    )
}