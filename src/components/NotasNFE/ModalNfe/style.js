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
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #000;
    width: 100%;
`;

export const BotaoFechar = styled.TouchableOpacity``;

export const Title = styled.Text`
    font-size: 20px;
    color: #000;
`;