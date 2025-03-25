import React, {useContext, useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stylesDefault from "../../pages/stylesDefault";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { AuthContext } from "../../contextApi/auth";
import ListSolicitation from "../../components/ListSolicitation";
import ModalLoading from "../../components/modals/ModalLoading";
import { useIsFocused } from "@react-navigation/native";

export default props => {

    const {user, stores, ip, currentStore, currentStoreSelected} = useContext(AuthContext);
    const [storeSelected, setStoreSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [solicitations, setSolicitations] = useState();
    const [loadingRemove, setLoadingRemove] = useState(false);
    const IsFocused = useIsFocused();

    useEffect(() => {

        let isActive = true;

        async function getStoreSelected(){

            const store = await AsyncStorage.getItem("filial");
            if(store && isActive){
                setStoreSelected(store);
            }

        }

        getStoreSelected();

        return () => isActive = false;

    }, [IsFocused]);

    function getStoreSelected()
    {
        if(!storeSelected){
            return;
        }else{
            return storeSelected.toString();
        }
    }

    let buildPicker = stores.map((v,k) => {
        return(
            <Picker.Item key={k} value={v.value} label={v.label}/>
        )
    })

    async function search(){

        setLoading(true);

        if(storeSelected === null){
            Alert.alert("Ops!", "Por favor, selecione a filial");
            setLoading(false);
            return;
        }

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

                    setLoading(false);
                    
                })

        } catch(err){
            setLoading(false);
        }  
    }

    async function removeSolicitation (ean,store){

        setLoadingRemove(true);

        let data = {
            ean: ean,
            store: store
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
                }
            ).then((resp) => {
                if(resp.data.error){
                    Alert.alert("ops!", resp.data.error);
                    setLoadingRemove(false);
                    return;
                }else{
                    setSolicitations(resp.data.solicitation);
                    setLoadingRemove(false);
                }
            })

        } catch(err){
            Alert.alert(err);
            setLoadingRemove(false);
        }
    }

    function loadingActive(loading){
        if(loading){
            return(
                <ModalLoading isVisible={loading} onCancel={() => setLoadingRemove(false)}/>
            )
        }
    }

    function list(list){
        if(!list){
            return;
        }else{
            return(
                <View style={[styles.boxDefault, {flex: 1}]}>
                    <FlatList
                        data={solicitations}
                        keyExtractor={item => `${item.codigoean}`}
                        renderItem={({item}) => <ListSolicitation item={item} remove={removeSolicitation}/>}
                    />
                </View>
            )
        }
    }

    return(
        <View style={{flex: 1}}>
            {loadingActive(loadingRemove)}
            <Header title="Solicitações" user={user.user}/>
            <View style={styles.container}>
                <View style={styles.boxDefault}>
                    <Text style={styles.title}>Filtre por filial</Text>
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
                </View>
                    
                {list(solicitations)}
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
        justifyContent: "center"
    },
    boxDefault: {
        backgroundColor: "#fff",
        padding: 20,
        width: '90%',
        borderTopColor: stylesDefault.colors.colorPrimary,
        borderTopWidth: 1,
        marginBottom: 20
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },  
    boxInput: {
        marginTop: 20,
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