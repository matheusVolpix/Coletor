import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    padding: 15px;
    flex: 1;
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

export const Flex = styled.View`
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`;

export const BotaoCamera = styled.TouchableOpacity`
    padding: 5px;
    border: 1px solid;
    border-color: #000;
    margin-bottom: 20px;
    margin-left: 20px;
`;