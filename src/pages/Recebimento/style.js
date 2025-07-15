import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    padding: 15px;
    flex: 1;
    padding-bottom: 100px;
`;

export const BotaoLeitor = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    width: 70px;
    height: 70px;
    left: 50%;
    transform: translateX(-35px);
    background-color: red;
    border-radius: 35px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-width: 1px;
    border-style: solid;
    border-color: #ed702f;
`;