import styled from "styled-components/native";

export const Baixado = styled.Text`
    width: 100%;
    text-align: center;
    font-size: 25px;
    color: red;
`;

export const Cabecalho = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 4px;
    border-bottom-color: #000;
`;

export const Titulo = styled.Text`
    font-size: 18px;
    color: #000;
`;

export const BotaoBoleto = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border: 1px solid #000;
    justify-content: center;
    align-items: center;
`;

export const BotaoStatus = styled.TouchableOpacity`
    background-color: ${props => props.background};
    padding: 10px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`;

export const TextoBotaoStatus = styled.Text`
    color: ${props => props.background ? props.background : "#fff"};
`;