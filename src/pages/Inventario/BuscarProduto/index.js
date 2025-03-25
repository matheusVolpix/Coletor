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
    Botao
 } from "./style";
import { AuthContext } from "../../../contextApi/auth";
import Header from "../../../components/Header";
import { Container } from "../style";
import { ActivityIndicator, FlatList, Modal, ScrollView } from "react-native";
import ListaInventario from "../../../components/Inventario/ListaInventario";
import ModalInventario from "../../../components/Inventario/ModalInventario";
import ModalCamera from "../../../components/modals/ModalCamera";
import Barcode from "../../../components/Barcode";


export default ({route}) => {

    const {codigo} = route.params;  

    const {user, ip} = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [ean, setEan] = useState('');
    const [loadItens, setLoadItens] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const [loadAmount, setLoadAmount] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {

        async function getProducts(){

            setLoadItens(true);
            try{

                const response = await fetch('http://volpix.com.br/api/inventario/lista-itens-inventario/'+ codigo, {
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

        getProducts();

        

    }, []);

    async function buscar()
    {

        setLoadItens(true);
        try{

            const response = await fetch('http://volpix.com.br/api/inventario/buscar-item', {
                method: 'POST',
                headers: {
                    'Accept' : "application/json",
                    'user': user.user,
                    "Content-Type": "application/x-www-form-urlencoded",
                    'password': user.pass,
                    'ip': ip
                },
                body: new URLSearchParams({
                    ean: ean,
                    descricao: descricao,
                    codigo: codigo
                }).toString(),
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

            const response = await fetch('http://volpix.com.br/api/inventario/quantidade', {
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
                                Inventario Rotativo
                            </SubTitulo>
                        </LinhaTexto>
                        <LinhaTexto>
                            <Titulo style={{ marginRight: 10 }}>
                                Código:
                            </Titulo>
                            <SubTitulo>
                                0125030004
                            </SubTitulo>
                        </LinhaTexto>
                        <Titulo>
                            Busque um produto
                        </Titulo>
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
                                autoFocus={true}
                                value={ean}
                                onChangeText={inputEan => setEan(inputEan)}
                            />
                        </Coloum>

                        <Coloum>
                            <SubTitulo>
                                Descrição
                            </SubTitulo>
                            <TextInput placeholder="Digite a Descrição"
                             placeholderTextColor="#000" 
                            value={descricao}
                                onChangeText={inputDescricao => setDescricao(inputDescricao)}
                            />
                        </Coloum>
                    </Row>
                    <BotaoPrimario onPress={() => setShowCamera(true)}>
                        <TextoBotao >Usar Leitor</TextoBotao>
                    </BotaoPrimario>

                    <BotaoSecundario onPress={buscar}>
                        <TextoBotao >Pesquisar</TextoBotao>
                    </BotaoSecundario>
                </BoxForm>

                {renderItens()}

                
                

                <Modal visible={modal} animationType="fade" transparent={true}>
                    <ModalInventario isVisible={() => setModal(false)} item={itemSelected}
                        sendAmount={sendAmount} load={loadAmount} sendClean={sendClean}/>
                </Modal>
                <Modal visible={showCamera} animationType="fade" transparent={true}>
                    <Barcode value={value}/>
                </Modal>
                 <ModalCamera isVisible={showCamera} onCancel={() => setShowCamera(false)} value={value}/>

                </ScrollView>


            </Container>
        </>
    )
}