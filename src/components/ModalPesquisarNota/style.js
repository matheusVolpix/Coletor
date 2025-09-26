import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    padding: 20px;
    background-color: rgba(0,0,0,0.5);
`;

export const BoxModal = styled.View`
    width: 100%;
    background-color: #fff;
    padding: 10px;
`;

export const TopModal = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const BotaoFechar = styled.TouchableOpacity``;

export const Title = styled.Text`
    font-size: 20px;
    color: #000;
`;

export const Input = styled.TextInput`
    width: 100%;
    border: 1px solid #000;
    margin-top: 40px;
    height: 40px;
    color: #000;
`;

export const BotaoPesquisar = styled.TouchableOpacity`
    width: 100%;
    margin-top: 20px;
    height: 40px;
    background-color: #ed702f;
    align-items: center;
    justify-content: center;
`;

export const TextoBotaoPesquisar = styled.Text`
    color: #fff;
    font-size: 18px;
`;