import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    padding: 15px;
    flex: 1;
    margin-bottom: -30px;
`;

export const BoxPesquisa = styled.View`
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-top-width:2px;
    border-top-style: solid;
    border-top-color: #ed702f;
    margin-top: 10px;
`;

export const BotaoPicker = styled.TouchableOpacity`
    width: 100%;
    padding: 5px;
    margin: 20px 0;
    border: 1px solid #000;
    
`;

export const TextoBotaoPicker = styled.Text`
    font-size: 18px;
    color: #000;
`;

export const BoxForm = styled.View`
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 16px;
`;

export const Row = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin: 20px 0px;
    gap: 20px;
`

export const Coloum = styled.View`
    width: fit-content;
    height: fit-content;
    flex: 1;
`

export const TituloSection = styled.View`
    align-items: center;
    justify-content: center;
`
export const LinhaTexto = styled.View`
    width: 100%;
    padding-bottom: 10px;
    text-align: center;
    justify-content: center;
    flex-direction: row;
`;

export const Titulo = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color: black;
`;
export const SubTitulo = styled.Text`
    font-size: 18px;
    color: black;

`;

export const TextInput = styled.TextInput`
    border: 1px solid;
    padding: 5px 5px;
    width: 100%;
`

export const BotaoPrimario = styled.TouchableOpacity`
background-color: #20a8d8;
border-radius: 16px;
margin: 10px 20px;
text-align: center;
justify-items: center;
padding: 5px;

`
export const BotaoSecundario = styled.TouchableOpacity`
background-color: #ed702f;
justify-content: center;
padding: 5px;
`

export const TextoBotao = styled.Text`
    font-size: 18px;
    color: white; 
    text-align:center ;
`

export const ListInventario = styled.FlatList`
`

export const ItemInventario = styled.View`
    background-color: green;
    margin: 10px 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 16px;
    justify-content: center;


`