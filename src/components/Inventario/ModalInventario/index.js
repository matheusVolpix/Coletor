import React, { useState } from "react";
import { Background, 
    Box,
    NomeItem,
    Ean,
    NomeInventario,
    BoxInput,
    Label,
    Quantidade,
    Zerar,
    TextoZerar,
    Enviar,
    TextoEnviar 
} from "./style";
import { ActivityIndicator, Alert, TouchableWithoutFeedback, View } from "react-native";

export default ({isVisible, item, sendAmount, load, sendClean}) => {

    const [amount, setAmount] = useState();

    function send()
    {
        if(!amount){
            Alert.alert('erro', 'Por favor insira a quantidade');
            return;
        }
        sendAmount(amount, item);
    }

    function clean()
    {
        sendClean(item);
    }

    return(
        <Background>

            <TouchableWithoutFeedback onPress={isVisible}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

            <Box>
                <NomeItem>{item.descricao}</NomeItem>
                <Ean>EAN: {item.CODIGOEAN}</Ean>
                <NomeInventario>Total: {item.QUANTIDADE}</NomeInventario>
                <BoxInput>
                    <Label>Quantidade</Label>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Quantidade value={amount}
                        placeholder="Quantidade"
                        placeholderTextColor="#000" 
                        keyboardType="numeric"
                        onChangeText={amount => setAmount(amount)}
                        
                        />
                        <Zerar onPress={clean}>
                            <TextoZerar>Zerar Total</TextoZerar>
                        </Zerar> 
                    </View>
                    
                </BoxInput>

                <Enviar onPress={send}>
                    {load ? (<ActivityIndicator size={22} color="#fff"/>)
                    : (<TextoEnviar>Enviar</TextoEnviar>)}
                    
                </Enviar>
            </Box>

            <TouchableWithoutFeedback onPress={isVisible}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

        </Background>
    )
}