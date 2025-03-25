import React, {useState, useContext, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Picker } from "@react-native-picker/picker";
import api from "../../services/api";
import ModalCollector from "../../components/modals/ModalCollector";
import { AuthContext } from "../../contextApi/auth";
import { useIsFocused } from "@react-navigation/native";


import stylesDefault from "../../pages/stylesDefault";
import ModalCamera from "../../components/modals/ModalCamera";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default props => {

    const {stores, ip, ipJava, user, currentStore, currentStoreSelected} = useContext(AuthContext);
    const [storeSelected, setStoreSelected] = useState();
    const [ean, setEan] = useState("");
    const [description, setDescription] = useState("");
    const [showCamera, setShowCamera] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [solicitations, setSolicitations] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [loadingTag, setLoadingTag] = useState(false);
    const IsFocused = useIsFocused();

    useEffect(() => {

        async function getStoreSelected(){

            const store = await AsyncStorage.getItem("filial");
            if(store){
                setStoreSelected(store);
            }

        }

        getStoreSelected();

    }, [IsFocused]);
    

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

    search = async () => {

        setLoading(true);

        let eanInput = "";
        let descriptionInput = "";

        if(!description && !ean){
            Alert.alert("Ops!", "Por favor insira o código ean ou a descrição");
            setLoading(false);
            return;
        }

        if (!ean || !ean.trim()) {
            eanInput = "0";
            
        }else{
            eanInput = ean;
        }

        if (!description || !description.trim()) {
            descriptionInput = "0";
        }else{
            descriptionInput = description;
        }

        if(!storeSelected || storeSelected == 0){
            Alert.alert("Ops!", "Por favor selecione a Filial");
            setLoading(false);
            return;
        }
        
                try{
                    const response = await api.get(`http://${ip}:${ipJava}/VolpixWebService/webresources/generic/Produto/${eanInput}/${descriptionInput}/${storeSelected}`, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        } 
                    }).then((resp) => {
                        const products = resp.data;
                        if(!products){
                            Alert.alert("ops!", `Não foi possivel localizar o produto`);
                            setLoading(false);
                            return;
                        }
                        setProducts(products);
                        getSolicitation();
                        
                    })

                    
         
                } catch (e) {
                    Alert.alert("Ops!", `${test}`);
                    setLoading(false);
                }
            }

    getSolicitation = async () => {
        try{
            const response = await api.get(`/collector/${storeSelected}`, 
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    user: user.user,
                    password: user.pass,
                    ip: ip
                }
            }).then((resp) => {
                setSolicitations(resp.data.solicitation);
                setShowModal(true);

                setLoading(false);
                setLoadingModal(false);
                
            })
 
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

    solicitacaoRemove = async ean => {

        setLoadingModal(true);

        let data = {
            ean: ean,
            store: storeSelected
        };
       

        try{
            const response = await api.post('/collector/solicitation-delete', 
            data,
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    user: user.user,
                    password: user.pass,
                    ip: ip
                }
            }).then((resp) => {
                
            })
 
        } catch (e) {
            console.log(e)
            setLoadingModal(false);
        }
        
        
        getSolicitation();
    }

    registerSolicitation = async ean => {

        setLoadingModal(true);

        var data = {
            ean: ean,
            store: storeSelected
        };
        
        try{
            const response = await api.post('/collector/solicitation', 
            data,
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    user: user.user,
                    password: user.pass,
                    ip: ip
                }
            }).then((resp) => {
                
            })
 
        } catch (e) {
            console.log(e)
            setLoadingModal(false);
        }
        
        
        getSolicitation();

    }

    getTag = async () => {
        try{
            const response = await api.get(`/collector/tag/${storeSelected}`, 
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    user: user.user,
                    password: user.pass,
                    ip: ip
                }
            }).then((resp) => {
                setTags(resp.data.tag);
                setLoadingTag(false);
                
            })
 
        } catch (e) {
            console.log(e)
            setLoadingTag(false);
            
        }
    }

    registerTag = async ean => {
        setLoadingTag(true);

        var data = {
            ean: ean,
            store: storeSelected
        };
        
        try{
            const response = await api.post('/collector/tag-register', 
            data,
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    user: user.user,
                    password: user.pass,
                    ip: ip
                }
            }).then((resp) => {
                
            })
 
        } catch (e) {
            console.log(e)
            setLoadingTag(false);
        }
        
        
        getTag();
    } 

    deleteTag = async ean => {

        setLoadingTag(true);

        var data = {
            ean: ean,
            store: storeSelected
        };
       

        try{
            const response = await api.post('/collector/tag-delete', 
            data,
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    user: user.user,
                    password: user.pass,
                    ip: ip
                }
            }).then((resp) => {
                
            })
 
        } catch (e) {
            console.log(e)
            setLoadingTag(false);
        }
        
        
        getTag();
    }

    function scannShow(){
        if(!storeSelected){
            Alert.alert("Ops!", "Selecione uma filial");
            return;
        }else{
            setShowCamera(true);
        }
    }

    let buildPicker = stores.map((v,k) => {
        return(
            <Picker.Item key={k} value={v.value} label={v.label}/>
        )
    })

    function getStoreSelected()
    {
        if(!storeSelected){
            return;
        }else{
            return storeSelected.toString();
        }
    }
        
        return(

            
            <View style={{flex: 1}}>
                <Header title="Coletor" user={user.user}/>

                <View style={styles.container}>

                
                
                <ModalCamera isVisible={showCamera} onCancel={() => setShowCamera(false)} value={value}/>
                <ModalCollector isVisible={showModal} items={products} 
                onCancel={() => setShowModal(false)}
                loading={loadingModal}
                loadingTag={loadingTag}
                solicitacao={registerSolicitation} solicitacoes={solicitations}
                solicitacaoRemove={solicitacaoRemove}
                tag={registerTag}
                tags={tags}
                store={currentStore}
                tagRemove={deleteTag}/>
                
                <View style={styles.boxDefault}>
                    <Text style={styles.title}>Filtre por codigo de barras, descriçao e filial</Text>
                    <View style={styles.boxInput}>
                        <Text style={{color: "#000"}}>Codigo EAN</Text>
                        <TextInput style={styles.input} placeholder="EAN" value={ean}
                        placeholderTextColor="#000"
                        onChangeText={ean => setEan(ean)} keyboardType="numeric"/>
                    </View>
                    
                    <View style={styles.boxInput}>
                        <Text style={{color: "#000"}}>Descriçao</Text>
                        <TextInput style={styles.input} value={description}
                        placeholderTextColor="#000"
                        onChangeText={description => setDescription(description)} placeholder="Descriçao do produto"/>
                    </View>
                    <View style={styles.boxInput}>
                        <Text style={{color: "#000"}}>Filial</Text>
                        <View style={styles.dropdown}>
                            <Picker
                                    style={{color: "#000"}}
                                    selectedValue={getStoreSelected()}
                                    onValueChange={(value, _) =>[
                                        setStoreSelected(value),
                                        currentStoreSelected(value),
                                        AsyncStorage.setItem("filial", value)
                                    ]}>
                                <Picker.Item key={99} value={0} label=""/>
                                {buildPicker}
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity
                    onPress={search}
                    style={[styles.button, {backgroundColor: stylesDefault.colors.colorPrimary}]}>
                         {loading ? <ActivityIndicator size={25} color="#fff"/> : <Text style={{color: '#fff'}}>Filtrar</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#20a8d8'}]}
                    onPress={scannShow}>
                        <Text style={{color: '#fff'}}>Leitor</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer current={currentStore}/>
            </View>
            
            
        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: stylesDefault.colors.backgroundColorApp,
        alignItems: "center",
        justifyContent: 'center'
    },
    boxDefault: {
        backgroundColor: "#fff",
        padding: 20,
        width: '90%',
        borderTopColor: stylesDefault.colors.colorPrimary,
        borderTopWidth: 1,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },  
    boxInput: {
        marginTop: 20,
    },  
    input: {
        width: '100%',
        borderBottomWidth: 1,
        height: 35,
        marginTop: 10,
        color: '#000'
    },
    dropdown: {
        justifyContent: "center",
        height: 35,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        color: "black"
      },
    button: {
        width: '100%',
        height: 35,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})