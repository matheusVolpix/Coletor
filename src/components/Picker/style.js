import styled from "styled-components/native";

export const Background = styled.TouchableOpacity`
    z-index: 999;
    flex: 1;
    background-color: rgba(0,0,0,0.6);
    padding: 20px;
    justify-content: flex-end;
`;

export const BoxItens = styled.View`
    width: 100%;
    flex-shrink: 1; /* Faz com que o BoxItens se ajuste ao conteúdo da FlatList */
`;

export const Option = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #232323;
    height: 50px;
    border: 1px solid #333333;

`;

export const TextOption = styled.Text`
    color: #fff;
    font-size: 18px;
`;

export const ButtonCancel = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #232323;
    height: 50px;
    border: 1px solid #333333;
    margin-top: 20px;
    border-radius: 10px;
`;

export const TextButtonCancel = styled.Text`
    color: #fff;
    font-size: 18px;
`;

