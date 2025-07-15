import React, { useContext, useEffect, useState } from "react";
import { BoxForm,
    Titulo,
    LinhaTexto,
    TituloSection,
    SubTitulo,
    Row,
    Coloum,
    TextInput,
    BotaoPrimario,
    BotaoSecundario,
    TextoBotao,
    Item,
    NomeItem,
    Ean,
    Quantidade,
    Botao,
    BoxButtons,
    BotaoFiltrar,
    TextoBotaoFiltrar,
 } from "./style";

import { BotaoLeitor } from "../../Recebimento/style";
import { AuthContext } from "../../../contextApi/auth";
import Header from "../../../components/Header";
import { Container } from "../style";
import { ActivityIndicator, Alert, FlatList, Modal, ScrollView } from "react-native";
import ListaInventario from "../../../components/Inventario/ListaInventario";
import ModalInventario from "../../../components/Inventario/ModalInventario";
import ModalCamera from "../../../components/modals/ModalCamera";
import Barcode from "../../../components/Barcode";
import Icon from "react-native-vector-icons/Feather";


export default ({route}) => {

    const {codigo, nome} = route.params;
    
    // const codigo = '0125040001';
    // const nome = "Inventario Rotativo";

    const {user, ip, ipLink} = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [ean, setEan] = useState('');
    const [loadItens, setLoadItens] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const [loadAmount, setLoadAmount] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [filterItens, setFilterItens] = useState("todos");

    useEffect(() => {

        

        buscarTudo();

        

    }, []);

    async function getProducts(){

        setLoadItens(true);
        try{

            const response = await fetch(ipLink+'/inventario/meus-itens/'+ codigo, {
                method: 'GET',
                headers: {
                    'Accept' : "/",
                    'user': user.user,
                    'password': user.pass,
                    'ip': ip
                }
            }).then((response) => response.json())
            .then((json) => {
                
                setItems(json.inventarios);

                setLoadItens(false);
            })

        }catch(error){
            console.log(error);

            setLoadItens(false);
        }

        setLoadItens(false);

        
    }

    async function buscarItensNaoContados(){

        setLoadItens(true);
        try{

            const response = await fetch(ipLink+'/inventario/meus-itens-nao-contados/'+ codigo, {
                method: 'GET',
                headers: {
                    'Accept' : "/",
                    'user': user.user,
                    'password': user.pass,
                    'ip': ip
                }
            }).then((response) => response.json())
            .then((json) => {
                
                setItems(json.inventarios);

                setLoadItens(false);
            })

        }catch(error){
            console.log(error);

            setLoadItens(false);
        }

        setLoadItens(false);

        
    }

    async function buscar(codigoEan)
    {

        setLoadItens(true);
        try{

            const response = await fetch(ipLink+'/inventario/buscar-item', {
                method: 'POST',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    "Content-Type": "application/x-www-form-urlencoded",
                    'password': user.pass,
                    'ip': ip
                },
                body: new URLSearchParams({
                    ean: codigoEan,
                    codigo: codigo
                }).toString(),
            }).then((response) => response.json())
            .then((json) => {


                if(json.inventarios != null){
                    setItems(json.inventarios);
                }else{
                    if(json.ean != null){
                        let iten = {
                            descricao: "Produto não encontrado no inventario",
                            CODIGOEAN: codigoEan,
                            QUANTIDADE: 0
                        }
                        openModal(iten);
                    }
                    
                }
                
                
                setLoadItens(false);
            })

        }catch(error){
            console.log(error);

            setLoadItens(false);
        }

        setLoadItens(false);
    }

    async function buscarTudo()
    {

        setLoadItens(true);
        try{

            const response = await fetch(ipLink+'/inventario/todos-itens/'+codigo, {
                method: 'GET',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    'password': user.pass,
                    'ip': ip
                },
            }).then((response) => response.json())
            .then((json) => {

                setItems(json.inventarios);
                
                setLoadItens(false);
            })

        }catch(error){
            console.log(error);

            setLoadItens(false);
        }

        setLoadItens(false);
    }

    function openModal(itens)
    {
        setItemSelected(itens);
        setModal(true)
    }

    function renderItens()
    {
        if(!loadItens){
            return(
                <FlatList 
                    scrollEnabled={false}
                    data={items}
                    keyExtractor={item => `${item.CODIGOEAN}`}
                    renderItem={({item}) => <ListaInventario itens={item} openModal={openModal}/>}
                />
            )
        }else{
            return (<ActivityIndicator size={20} color="#000"/>);
        }
    }

    async function sendAmount(amount, item)
    {
        setLoadAmount(true);
        try{

            const response = await fetch(ipLink+'/inventario/quantidade', {
                method: 'POST',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    "Content-Type": "application/x-www-form-urlencoded",
                    'password': user.pass,
                    'ip': ip
                },
                body: new URLSearchParams({
                    ean: item.CODIGOEAN,
                    descricao: descricao,
                    codigo: codigo,
                    quantidade: amount,
                    eanSearch: ean
                }).toString(),
            }).then((response) => response.json())
            .then((json) => {
                
                if(filterItens == 'todos'){
                    buscarTudo();
           
                }

                if(filterItens == 'contados'){
                    getProducts();
                    
                }

                if(filterItens == 'nao contados'){
                    buscarItensNaoContados();
                    
                }
                setModal(false);
                setLoadAmount(false);

            })

        }catch(error){
            console.log(error);
            setLoadAmount(false);


        }
        setLoadAmount(false);
    }

    async function sendClean(item)
    {
        setLoadAmount(true);

        try{

            const response = await fetch('http://volpix.com.br/api/inventario/zerar', {
                method: 'POST',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    "Content-Type": "application/x-www-form-urlencoded",
                    'password': user.pass,
                    'ip': ip
                },
                body: new URLSearchParams({
                    ean: itemSelected.CODIGOEAN,
                    descricao: descricao,
                    codigo: codigo,
                    eanSearch: ean
                }).toString(),
            }).then((response) => response.json())
            .then((json) => {
                
                setItems(json.inventarios);
                setModal(false);
                setLoadAmount(false);

            })

        }catch(error){
            console.log(error);
            setLoadAmount(false);


        }
        setLoadAmount(false);
    }

    async function changeItens(change)
    {
        setFilterItens(change);

        if(change == 'todos'){
            buscarTudo();
            return;
        }

        if(change == 'contados'){
            getProducts();
            return;
        }

        if(change == 'nao contados'){
            buscarItensNaoContados();
            return;
        }
    } 

    value = newValue => {

        let remove = newValue.replace(/\["/, "");
        let remove2 = remove.replace(/\"]/,"");

        let newEan = "";
    
        if(remove2.length < 13){
    
            
    
            for(i = remove2.length; i < 13; i++){
                newEan += 0;
            }
    
            
        }

        setEan(newEan + remove2);
        setShowCamera(false);
        buscar(newEan + remove2);
    }

    return(
        <>
            <Header title="Inventário" user={user.user} back={true}/>
            <Container>

                <ScrollView style={{marginBottom: 40}}>
                

                <BoxForm>
                <TituloSection>
                        <LinhaTexto>
                            <Titulo style={{ marginRight: 10 }}>
                                Inventario:
                            </Titulo>
                            <SubTitulo>
                                {nome}
                            </SubTitulo>
                        </LinhaTexto>
                        </TituloSection>
                    <Row>
                        <Coloum>
                            <SubTitulo>
                                Código EAN
                            </SubTitulo>
                            <TextInput
                                placeholder="Digite o Código"
                                keyboardType="numeric"
                                placeholderTextColor="#000" 
                                value={ean}
                                onChangeText={inputEan => setEan(inputEan)}
                            />
                        </Coloum>

                        {/* <Coloum>
                            <SubTitulo>
                                Descrição
                            </SubTitulo>
                            <TextInput placeholder="Digite a Descrição"
                             placeholderTextColor="#000" 
                            value={descricao}
                                onChangeText={inputDescricao => setDescricao(inputDescricao)}
                            />
                        </Coloum> */}
                    </Row>
                    {/* <BotaoPrimario onPress={() => setShowCamera(true)}>
                        <TextoBotao >Usar Leitor</TextoBotao>
                    </BotaoPrimario> */}

                    <BotaoSecundario onPress={() => buscar(ean)}>
                        <TextoBotao >Filtrar</TextoBotao>
                    </BotaoSecundario>

                    {/* <BotaoTodos onPress={buscarTudo}>
                        <TextoBotao >Filtrar todos</TextoBotao>
                    </BotaoTodos> */}
                </BoxForm>

                <BoxButtons>
                    <BotaoFiltrar background={(filterItens == 'todos' ? true : false)} onPress={() => changeItens("todos")}>
                        <TextoBotaoFiltrar background={(filterItens == 'todos' ? true : false)}>Todos</TextoBotaoFiltrar>
                    </BotaoFiltrar>

                    <BotaoFiltrar background={(filterItens == 'contados' ? true : false)} onPress={() => changeItens("contados")}>
                        <TextoBotaoFiltrar background={(filterItens == 'contados' ? true : false)}>Contados</TextoBotaoFiltrar>
                    </BotaoFiltrar>

                    <BotaoFiltrar background={(filterItens == 'nao contados' ? true : false)} onPress={() => changeItens("nao contados")}>
                        <TextoBotaoFiltrar background={(filterItens == 'nao contados' ? true : false)}>Não contados</TextoBotaoFiltrar>
                    </BotaoFiltrar>
                </BoxButtons>

                {renderItens()}

                
                

                <Modal visible={modal} animationType="fade" transparent={true}>
                    <ModalInventario isVisible={() => setModal(false)} item={itemSelected}
                        sendAmount={sendAmount} load={loadAmount} sendClean={sendClean}/>
                </Modal>
                <Modal visible={showCamera} animationType="fade" transparent={true}>
                    <Barcode value={value} fecharCamera={() => setShowCamera(false)}/>
                </Modal>
                {/* <ModalCamera isVisible={showCamera} onCancel={() => setShowCamera(false)} value={value} type="ean"/> */}

                </ScrollView>
                    
                <BotaoLeitor onPress={() => setShowCamera(true)}>
                    <Icon name="plus" size={35} color="#ed702f"/>
                </BotaoLeitor>

            </Container>
        </>
    )
}