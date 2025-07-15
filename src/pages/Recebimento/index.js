import React, {useContext, useEffect, useState} from "react";
import { ActivityIndicator, Alert, FlatList, Modal, View } from "react-native";
import Header from "../../components/Header";
import { 
    Titulo,
    BoxPesquisa,
    BotaoPicker,
    TextoBotaoPicker,
    BotaoSecundario,
    TextoBotao
 } from "../Inventario/style";
 import { BotaoLeitor, Container } from "./style";
import { AuthContext } from "../../contextApi/auth";
import Picker from "../../components/Picker";
import NotasNFE from "../../components/NotasNFE";
import Icon from "react-native-vector-icons/Feather";
import BarcodeNFE from "../../components/BarcodeNFE";
import ModalCamera from "../../components/modals/ModalCamera";
import Barcode from "../../components/Barcode";
import Loading from "../../components/Loading";

export default props => {

    const { user, stores, currentStore, currentStoreSelected, ip ,ipLink} = useContext(AuthContext);
    const [load, setLoad] = useState(false);
    const [visiblePicker, setVisiblePicker] = useState(false);
    const [nomeLojaSelecionada, setNomeLojaSelecionada] = useState('');
    const [lojaSelecionada, setLojaSelecionada] = useState();
    const [showCamera, setShowCamera] = useState(false);
    const [nfe, setNfe] = useState([]);


    useEffect(() => {

        console.log(currentStore); 

        pegarNFE();

    }, [currentStore]);

    async function pegarNFE()
    {
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/recebimento-nfe/'+ currentStore.value, {
                method: 'GET',
                headers: {
                    'Accept' : "/",
                    'user': user.user,
                    'password': user.pass,
                    'ip': ip
                }
            }).then((response) => response.json())
            .then((json) => {

                setNfe(json.notas);

                setLoad(false);
            })

        }catch(error){
            console.log(error);

            setLoad(false);
        }

        setLoad(false);
    }

    value = newValue => {


        // setNFE(newValue);
        enviar(newValue);
        setShowCamera(false);
    }

    async function enviar(chavenfe)
    {
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/recebimento-nfe/enviar-nfe', {
                method: 'POST',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    "Content-Type": "application/x-www-form-urlencoded",
                    'password': user.pass,
                    'ip': ip
                },
                body: new URLSearchParams({
                    chavenfe: chavenfe,
                    loja: currentStore.value,
                }).toString(),
            }).then((response) => response.json())
            .then((json) => {

                console.log(json);
                if(json.erro){
                    Alert.alert("ops", json.erro);
                    return;
                }

                
                pegarNFE();
                setLoad(false);

            })

        }catch(error){
            console.log(error);
            setLoad(false);


        }
        setLoad(false);
    }

    function render()
    {
        if(nfe && nfe.length > 0){
                return(<FlatList
                data={nfe}
                keyExtractor={item => `${item.chavenfe}`}
                renderItem={({item}) => <NotasNFE itens={item} remove={remove}/>}
                /> )
        }
    }

    function remove(chave, loja)
    {
        Alert.alert("Atenção", "Você tem certeza que desjea deletar essa nota?",
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel', // estilo iOS para botão de cancelar
                },
                {
                    text: 'OK',
                    onPress: () => removePost(chave, loja),
                },
            ],
        );
    }

    async function removePost(chave, loja)
    {
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/recebimento-nfe/deletar', {
                method: 'POST',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    "Content-Type": "application/x-www-form-urlencoded",
                    'password': user.pass,
                    'ip': ip
                },
                body: new URLSearchParams({
                    chavenfe: chave,
                    loja: loja,
                }).toString(),
            }).then((response) => response.json())
            .then((json) => {

                console.log(json);
                if(json.erro){
                    Alert.alert("ops", json.erro);
                    return;
                }

                
                pegarNFE();
                setLoad(false);

            })

        }catch(error){
            console.log(error);
            setLoad(false);


        }
        setLoad(false);
    }

    return (
    <> 
        <Header title="Recebimento" user={user.user} back={true}/>
        <Container>

            <Titulo>Recebimento de notas</Titulo>
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

                <BotaoSecundario onPress={pegarNFE}>
                    <TextoBotao >Filtrar</TextoBotao>
                    
                </BotaoSecundario>
                

                <Modal visible={visiblePicker} animationType="slide" transparent={true}>
                    <Picker isVisible={() => setVisiblePicker(false)}
                        list={stores}
                        itemSelected={item => [
                            currentStoreSelected(item.value),
                            setNomeLojaSelecionada(item.label)
                        ]}/>
                </Modal>

                <Modal visible={load} animationType="fade" transparent={true}>
                        <Loading />
                </Modal>
                
            </BoxPesquisa>

            {render()}

            <Modal visible={showCamera} animationType="fade" transparent={true}>
                <BarcodeNFE value={value} fecharCamera={() => setShowCamera(false)}/>
            </Modal>

            {currentStore ? <BotaoLeitor onPress={() => setShowCamera(true)}>
                <Icon name="plus" size={35} color="#ed702f"/>
            </BotaoLeitor> : null}

            

        </Container>
    </>
    )
}