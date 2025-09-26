import styled from "styled-components/native";

export const BoxInventarios = styled.TouchableOpacity`
    width: 100%;
    margin: 20px 0;
    padding: 10px;
    background-color:  ${props => props.background == true ? '#2a2c36' : '#ed702f'};
`;

export const Info = styled.Text`
    color: #fff;
    margin: 5px 0;
`;