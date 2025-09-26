import React, {useContext, useEffect, useState} from "react";
import { ActivityIndicator, Alert, FlatList, Modal, View } from "react-native";
import Header from "../../components/Header";
import { 
    Titulo,
    BoxPesquisa,
    BotaoPicker,
    TextoBotaoPicker,
    BotaoSecundario,
    TextoBotao,
 } from "../Inventario/style";
 import { BotaoLeitor, Container, Flex, Filtro, BotaoCamera } from "./style";
import { AuthContext } from "../../contextApi/auth";
import Picker from "../../components/Picker";
import NotasNFE from "../../components/NotasNFE";
import Icon from "react-native-vector-icons/Feather";
import BarcodeNFE from "../../components/BarcodeNFE";
import ModalCamera from "../../components/modals/ModalCamera";
import Barcode from "../../components/Barcode";
import Loading from "../../components/Loading";
import { Coloum, Row } from "../Inventario/BuscarProduto/style";
import Footer from "../../components/Footer";
import { BoxButtons,
    BotaoFiltrar,
    TextoBotaoFiltrar
 } from "../Inventario/BuscarProduto/style";
import ModalNfe from "../../components/NotasNFE/ModalNfe";
import BarcodeBoleto from "../../components/BarcodeBoleto";
import ModalBoletos from "../../components/ModalBoletos";
import ModalPesquisarNota from "../../components/ModalPesquisarNota";

export default props => {

    const { user, stores, currentStore, currentStoreSelected, ip ,ipLink} = useContext(AuthContext);
    const [load, setLoad] = useState(false);
    const [visiblePicker, setVisiblePicker] = useState(false);
    const [nomeLojaSelecionada, setNomeLojaSelecionada] = useState('');
    const [lojaSelecionada, setLojaSelecionada] = useState();
    const [showCamera, setShowCamera] = useState(false);
    const [nfe, setNfe] = useState([]);
    const [status, setStatus] = useState('pendente');
    const [emAndamento, setEmAndamento] = useState();
    const [recebidas, setRecebidas] = useState();
    const [pendentes, setPendentes] = useState();
    const [modalNfe, setModalNfe] = useState(false);
    const [notaAtual, setNotaAtual] = useState();
    const [serie, setSerie] = useState();
    const [cameraBoleto, setCameraBoleto] = useState(false);
    const [modalBoletos, setModalBoletos] = useState(false);
    const [boletos, setBoletos] = useState([])
    const [chaveAtual, setChaveAtual] = useState();
    const [modalPesquisa, setModalPesquisa] = useState(false);


    useEffect(() => {

        pegarNFE(status);

    }, [currentStore]);

    async function pegarNFE(statusAtual)
    {
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/recebimento-nfe/'+ currentStore.value + '/'+statusAtual, {
                method: 'GET',
                headers: {
                    'Accept' : "/",
                    'user': user.user,
                    'password': user.pass,
                    'ip': ip
                }
            }).then((response) => response.json())
            .then((json) => {

                console.log("teste");

                setNfe(json.notas);
                setEmAndamento(json.emAndamento);
                setPendentes(json.pendentes);
                setRecebidas(json.recebidas);
                setStatus(statusAtual);

                setLoad(false);
            })

        }catch(error){
            console.log(error);

            setLoad(false);
        }

        setLoad(false);
    }

    function fatorToDate(fator) {
        if (!fator || fator === 0) return null;

        const novaBase = new Date(2025, 1, 22);  // 22/02/2025


        const diasDesdeNovaBase = fator - 1000;
        return new Date(novaBase.getTime() + diasDesdeNovaBase * 86400000);

    }

    valueBoleto = newValue => {
        let banco = newValue.slice(0, 3);
        let valorStr = newValue.slice(9, 19); // Posição 10 a 19
        let valor = parseFloat(valorStr) / 100;
        let fator = newValue.slice(5,9); // exemplo pós-22/02/2025
        let dataVencimento = fatorToDate(fator);
        
        const boleto = {
            codigo: newValue,
            banco,
            valor,
            vencimento: dataVencimento?.toISOString().split('T')[0] ?? null,
        };

        // Adiciona ao array de boletos
        setBoletos(prev => {
            const jaExiste = prev.some(item => item.codigo === boleto.codigo);
            if (!jaExiste) {
                return [...prev, boleto];
            }
            Alert.alert("ops", "esse boleto ja foi incluido");
            return prev; // Se já existir, mantém o array como está
        });
        
        setCameraBoleto(false);
        setModalBoletos(true);
    }

    value = newValue => {

        pegarNFEPelaChave(newValue);
        setShowCamera(false);
    }

    async function enviaReceber(chavenfe)
    {
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/recebimento-nfe/receber-nota', {
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

                if(json.erro){
                    Alert.alert("ops", json.erro);
                    return;
                }

                Alert.alert("sucesso", json.sucesso);
                setModalNfe(false);
                setStatus('recebida');
                pegarNFE('recebida');
                setLoad(false);

            })

        }catch(error){
            console.log(error);
            setLoad(false);


        }
       
       
       setLoad(false);
    }

    async function pegarNFEPelaChave(chavenfe)
    {
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/recebimento-nfe/pegar-nota/' +chavenfe+ '/'+ currentStore.value, {
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

                if(json.erro){
                    Alert.alert("ops", json.erro);
                    return;
                }
                

                setStatus(json.nota.status);
                setNotaAtual(json.nota);
                setModalNfe(true);
                setSerie(json.nota.serie);
                setLoad(false);
            })

        }catch(error){
            console.log("mensagem de erro "+ error);

            setLoad(false);
        }

        setLoad(false);
    }

    async function pesquisarNFEPelaChave(chavenfe)
    {
        setLoad(true);
        try{

            const response = await fetch(ipLink+'/recebimento-nfe/pesquisar/' +chavenfe+ '/'+ currentStore.value, {
                method: 'GET',
                headers: {
                    'Accept' : "/",
                    'user': user.user,
                    'password': user.pass,
                    'ip': ip
                }
            }).then((response) => response.json())
            .then((json) => {

                if(json.erro){
                    Alert.alert("ops", json.erro);
                    return;
                }
                
                setStatus(json.nota.status);
                setNotaAtual(json.nota);
                setModalNfe(true);
                setSerie(json.serie);
                setModalPesquisa(false);
                setLoad(false);
            })

        }catch(error){
            console.log(error);

            setLoad(false);
        }

        setLoad(false);
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
                    loja: currentStore.value
                }).toString(),
            }).then((response) => response.json())
            .then((json) => {

                if(json.erro){
                    Alert.alert("ops", json.erro);
                    return;
                }

                if(json.recebida){
                    Alert.alert("sucesso", json.sucesso);
                    setModalNfe(false);
                    setStatus('recebida');
                    pegarNFE('recebida');
                    return;
                }

                console.log(json);
                setStatus(json.nota.status)
                pegarNFE(json.nota.status);
                setNotaAtual(json.nota);
                setModalNfe(true);
                setSerie(json.serie);
                setLoad(false);

            })

        }catch(error){
            console.log(error);
            setLoad(false);


        }
       
       
       setLoad(false);
    }

    async function enviarComBoletos()
    { 

        setLoad(true);
        try{

            const params = new URLSearchParams({
            chavenfe: chaveAtual,
            loja: currentStore.value,
            boletos: JSON.stringify(boletos)
            });

            const response = await fetch(ipLink+'/recebimento-nfe/enviar-nfe', {
                method: 'POST',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    "Content-Type": "application/x-www-form-urlencoded",
                    'password': user.pass,
                    'ip': ip
                },
                body: params.toString(),
            }).then((response) => response.json())
            .then((json) => {

                if(json.erro){
                    Alert.alert("ops", json.erro);
                    return;
                }

                if(json.recebida){
                    Alert.alert("sucesso", json.sucesso);
                    setModalNfe(false);
                    setStatus('recebida');
                    pegarNFE('recebida');
                    return;
                }

                setStatus(json.nota.status)
                pegarNFE(json.nota.status);
                setNotaAtual(json.nota);
                setModalNfe(true);
                setSerie(json.serie);
                setBoletos([]);
                setModalBoletos(false);
                setLoad(false);

            })

        }catch(error){
            console.log(error);
            setLoad(false);


        }
       
       
       setLoad(false);
    }

    function pegaChaveAbreCamera(chave)
    {
        console.log(chave);
        setChaveAtual(chave);
        setCameraBoleto(true);
    }

    function render()
    {
        if(nfe && nfe.length > 0){
                return(<FlatList
                data={nfe}
                keyExtractor={item => `${item.id}`}
                renderItem={({item}) => <NotasNFE itens={item} remove={remove} enviar={enviar}
                abrirCamera={() => setShowCamera(true)}
                chaveAtual={pegaChaveAbreCamera}
                abrirCameraBoleto={() => setCameraBoleto(true)}/>}
                /> )
        }
    }

    function changeNF(value)
    {
        setStatus(value);
        pegarNFE(value);
    }

    function remove(chave, loja)
    {
        console.log(chave, loja);
        Alert.alert("Atenção", "Você tem certeza que deseja mudar essa nota para PENDENTE?",
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

                Alert.alert("sucesso", json.sucesso);

                
                pegarNFE(status);
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
                <Flex>
                    <Coloum>

                    <Titulo>Filtre pela filial</Titulo>

                    {currentStore ? 
                        
                        (<BotaoPicker onPress={() => setVisiblePicker(true)}>
                            <TextoBotaoPicker>{
                            nomeLojaSelecionada === '' ? 
                            currentStore.label : nomeLojaSelecionada
                            }</TextoBotaoPicker>
                        </BotaoPicker>) : null
                            
                    }

                    </Coloum>

                    {currentStore ? <BotaoCamera onPress={() => setModalPesquisa(true)}>
                        <Icon name="search" size={24} color="#000"/>
                    </BotaoCamera> : null}

                    {currentStore ? <BotaoCamera onPress={() => setShowCamera(true)}>
                        <Icon name="camera" size={24} color="#000"/>
                    </BotaoCamera> : null}

                </Flex>
                

                

                <BotaoSecundario onPress={() => pegarNFE('pendente')}>
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

            <BoxButtons style={{marginTop: '10px'}}>
                    
                <BotaoFiltrar background={(status == 'pendente' ? true : false)} onPress={() => changeNF("pendente")}>
                    <TextoBotaoFiltrar background={(status == 'pendente' ? true : false)}>Pendentes ({pendentes})</TextoBotaoFiltrar>
                </BotaoFiltrar>    

                <BotaoFiltrar background={(status == 'em-andamento' ? true : false)} onPress={() => changeNF("em-andamento")}>
                    <TextoBotaoFiltrar background={(status == 'em-andamento' ? true : false)}>Em Andamento ({emAndamento})</TextoBotaoFiltrar>
                </BotaoFiltrar>

                

                <BotaoFiltrar background={(status == 'recebida' ? true : false)} onPress={() => changeNF("recebida")}>
                    <TextoBotaoFiltrar background={(status == 'recebida' ? true : false)}>Recebidas ({recebidas})</TextoBotaoFiltrar>
                </BotaoFiltrar>
            </BoxButtons>

            {render()}

            <Modal visible={showCamera} animationType="fade" transparent={true}>
                <BarcodeNFE value={value} fecharCamera={() => setShowCamera(false)}/>
            </Modal>

            <Modal visible={cameraBoleto} animationType="fade" transparent={true}>
                <BarcodeBoleto value={valueBoleto} fecharCamera={() => setCameraBoleto(false)} />
            </Modal>

            <Modal visible={modalNfe} animationType="fade" transparent={true}>
                <ModalNfe fecharModal={() => setModalNfe(false)} itens={notaAtual} serie={serie} enviar={enviar} chaveAtual={pegaChaveAbreCamera}/>
            </Modal>

            <Modal visible={modalBoletos} animationType="fade" transparent={true}>
                <ModalBoletos boletos={boletos} camera={() => setCameraBoleto(true)} fecharModal={() => setModalBoletos(false)} enviar={enviarComBoletos}/>
            </Modal>

            <Modal visible={modalPesquisa} animationType="fade" transparent={true}> 
                <ModalPesquisarNota fecharModal={() => setModalPesquisa(false)} pesquisa={pesquisarNFEPelaChave}/>
            </Modal>

        </Container>
        <Footer />
    </>
    )
}