import React, {useContext, useState, useEffect} from "react";
import { View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    SafeAreaView, 
    Image, 
    ImageBackground, 
    StyleSheet,
    ActivityIndicator,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Logo from "../../../assets/img/logo.png";
import Background from "../../../assets/img/background.jpg";
import stylesDefault from "../stylesDefault";
import ModalConfig from "../../components/modals/ModalConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {AuthContext} from "../../contextApi/auth";

export default props => {

    const {signIn, loading, ip, ipJava} = useContext(AuthContext);

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [ipVendas, setIp] = useState(ip);
    const [ipPortaJava, setIpJava] = useState(ipJava);
    const [showConfig, setShowConfig] = useState(false);

    useEffect(() => {

        async function getIps(){

            const storageIp = await AsyncStorage.getItem("ipVendas");
            const storageIpJava = await AsyncStorage.getItem("ipJava");
            const storageUser = await AsyncStorage.getItem("user");
            const storagePassword = await AsyncStorage.getItem("password");
            

            if(storageIp){
                setIp(storageIp);
            }

            if(storageIpJava){
                setIpJava(storageIpJava);
            }
            if(storageUser){
                setUser(storageUser);
            }
            if(storagePassword){
                setPassword(storagePassword);
            }

        }

        getIps();

        

    }, [])

    function insertIp(ipVendas, ipJava){
        setIp(ipVendas);
        setIpJava(ipJava);
        setShowConfig(false);
    }

    function handlerSignIn(){

        if(!ipVendas){
            Alert.alert("Ops!", "Por favor insira as configurações de IP e porta");
            return;
        }

        signIn(user, password, ipVendas);
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ModalConfig isVisible={showConfig}
                onCancel={() => setShowConfig(false)}
                insertIp={insertIp}/>
            <ImageBackground source={Background} style={styles.background}>
                <View style={{flex: 1}}>

                </View>
                <View style={styles.box}>
                    <View style={styles.viewIcon}>
                        <TouchableOpacity style={{padding: 5}} onPress={() => setShowConfig(true)}>
                            <Icon style={styles.icon} name="settings" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    
                    <Image source={Logo} style={styles.logo}/>
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <Text style={styles.text}>Seja bem vindo, inisra sua conta</Text>
                    </View>

                    <View style={styles.boxInput}>
                        <Icon name="user" size={20} color="#000" style={styles.icon}/>
                        <TextInput style={styles.textInput} placeholder="Insira seu usuário"
                        placeholderTextColor="#000"
                        value={user} onChangeText={user => setUser(user)}/>
                    </View>

                    <View style={styles.boxInput}>
                        <Icon name="lock" size={20} color="#000" style={styles.icon}/>
                        <TextInput style={styles.textInput} placeholder="Insira seu senha"
                        secureTextEntry={true} value={password}
                        placeholderTextColor="#000" 
                        onChangeText={password => setPassword(password)}/>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handlerSignIn}>
                        {loading ? <ActivityIndicator size={25} color="#fff"/> : <Text style={{color: '#fff'}}>Entrar</Text>}
                    </TouchableOpacity>
                    
                </View>
                <View style={{flex: 1}}></View>
            </ImageBackground>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    background:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    box:{
        backgroundColor: stylesDefault.colors.backgroundColorBlack,
        width: '90%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20
    },
    viewIcon: {
        width: "100%",
        alignItems: "flex-end",
        position: "absolute",
        marginTop: 20
    },  
    icon: {
        position: "absolute"
    },  
    logo: {
        resizeMode: 'contain',
        height: 100,
        width: 200,
    },
    text: {
        color: "#fff"
    },
    boxInput:{
        width: '100%',
        height: 40,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 15
    },
    textInput: {
        backgroundColor: stylesDefault.colors.backgroundColorWhite,
        width: '80%',
        height: 40,
        color: '#000'
    },
    icon:{
        width: "10%",
        textAlign: 'center'
    },
    button:{
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        backgroundColor: stylesDefault.colors.colorPrimary,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 20
    }

})

