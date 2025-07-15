import React, { useContext, useState } from "react";
import {
    View, Text, TouchableOpacity, Alert,
    ScrollView,
    FlatList,
    Modal,
    ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { AuthContext } from "../../contextApi/auth";
import {
    TextInput, Container, BoxForm, TituloSection, LinhaTexto,
    Titulo, SubTitulo, Row, Coloum, BotaoPrimario, BotaoSecundario, TextoBotao,
    ListInventario,
    ItemInventario,
    BoxPesquisa,
    BotaoPicker,
    TextoBotaoPicker,
    BoxInventarios,
    Info
} from "./style";
import Picker from "../../components/Picker";
import Inventarios from "../../components/Inventario/Inventarios";

export default props => {

    const { user, stores, currentStore, currentStoreSelected, ip ,ipLink} = useContext(AuthContext);
    const [inputEan, setInputEan] = useState();
    const [inputDescricao, setInputDescricao] = useState();
    const [visiblePicker, setVisiblePicker] = useState(false);
    const [nomeLojaSelecionada, setNomeLojaSelecionada] = useState('');
    const [lojaSelecionada, setLojaSelecionada] = useState();
    const [load, setLoad] = useState(false);
    const [inventarios, setInventarios] = useState([]);

    async function pesquisarInventario() {
        
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/inventario/'+ currentStore.value, {
                method: 'GET',
                headers: {
                    'Accept' : "/",
                    'user': user.user,
                    'password': user.pass,
                    'ip': ip
                }
            }).then((response) => response.json())
            .then((json) => {
                console.log(json);

                if(json.inventarios != null){
                    
                    setInventarios(json.inventarios);
                }else{
                    Alert.alert("ops", "Nenhum inventario encontrado nessa loja");
                }

                setLoad(false);
            })
        }catch(error){
            console.log(error);
            setLoad(false);
        }
    }
    const dados = [
        { id: "1", nome: "Item 1", codigoEan: '07898947980768' },
        { id: "2", nome: "Item 2", codigoEan: '07622210575975' },
    ];

    function render()
    {
        if(inventarios.length > 0){
             return(<FlatList
                data={inventarios}
                keyExtractor={item => `${item.CODIGOINVENTARIO}`}
                renderItem={({item}) => <Inventarios itens={item}/>}
                /> )
        }
    }

    

    return (
        <>
            <Header title="Inventário" user={user.user} back={true}/>
            <Container>

                <Titulo>Inventário</Titulo>
                <BoxPesquisa>
                    <Titulo>Filtre pela filial</Titulo>

                    {currentStore ? 
                    
                    (<BotaoPicker onPress={() => setVisiblePicker(true)}>
                        <TextoBotaoPicker>{
                        nomeLojaSelecionada === '' ? 
                        currentStore.label : nomeLojaSelecionada
                        }</TextoBotaoPicker>
                    </BotaoPicker>) : null
                        
                }

                    <BotaoSecundario onPress={pesquisarInventario}>
                        {load ? (
                            <ActivityIndicator size={22} color="#fff"/>
                        ) : (<TextoBotao >Filtrar</TextoBotao>)}
                        
                    </BotaoSecundario>
                    

                    <Modal visible={visiblePicker} animationType="slide" transparent={true}>
                        <Picker isVisible={() => setVisiblePicker(false)}
                            list={stores}
                            itemSelected={item => [
                                currentStoreSelected(item.value),
                                setNomeLojaSelecionada(item.label)
                            ]}/>
                    </Modal>
                    
                </BoxPesquisa>

                {render()}

            </Container>
        </>
    )
}