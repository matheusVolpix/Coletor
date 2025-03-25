import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.6);
    padding: 20px;
`;

export const Box = styled.View`
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
`;

export const NomeItem = styled.Text`
    font-size: 18px;
    color: #000;
    border-bottom-width: 2px;
    border-bottom-color: #000;
`;

export const Ean = styled.Text`
    margin-top: 15px;
    color: #000;
`;

export const NomeInventario = styled.Text`
    margin-top: 15px;
    color: #000;
`;

export const BoxInput = styled.View`
    width: 100%;
`;

export const Label = styled.Text`
    margin-top: 15px;
    color: #000;
`;

export const Quantidade = styled.TextInput`
    width: 48%;
    height: 40px;
    border: 1px;
    border-radius: 10px;
    color: #000;
`;

export const Zerar = styled.TouchableOpacity`
    width: 48%;
    height: 40px;
    background-color: #20a8d8;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const TextoZerar = styled.Text`
    font-size: 18px;
    color: #fff;
`;

export const Enviar = styled.TouchableOpacity`
    width: 100%;
    margin-top: 20px;
    height: 40px;
    background-color: #ed702f;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const TextoEnviar = styled.Text`
    color: #fff;
    font-size: 18px;
`;

export const Texto = styled.Text`
    color: #000;
`;

export const Total = styled.Text`
    width: 90%;
    text-align: center;
    color: #000;
`;
