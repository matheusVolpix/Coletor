import React, { useEffect, useState } from "react";
import { Modal, TextInput, Text, TouchableOpacity, View, TouchableWithoutFeedback, StyleSheet, KeyboardAvoidingView } from "react-native";
import stylesDefault from "../../pages/stylesDefault";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default props => {

    const [ipVendas, setIpVendas] = useState('');
    const [portaJava, setPortaJava] = useState('');

    useEffect(() => {

        async function getIps(){

            const storageIp = await AsyncStorage.getItem("ipVendas");
            const storageIpJava = await AsyncStorage.getItem("ipJava");

            if(storageIp){
                setIpVendas(storageIp);
            }

            if(storageIpJava){
                setPortaJava(storageIpJava);
            }

        }

        getIps();

    }, [])

    return(
        <Modal onRequestClose={props.onCancel}
        transparent={true} 
        visible={props.isVisible}
        animationType="slide">
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.7)"}}>

                </View>
            </TouchableWithoutFeedback>
            
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.box}>
                    <Text style={styles.title}>Configuraçoes de IP</Text>
                    <View style={{alignItems: "center"}}>
                        <TextInput style={styles.input} placeholder="Ip"
                         autoCapitalize='none'
                        placeholderTextColor="#b8b6b6" value={ipVendas}
                        onChangeText={(ip)=> setIpVendas(ip)} />
                    </View>

                    {/* <View style={{alignItems: "center"}}>
                        <TextInput style={styles.input} placeholder="Porta do Ip2 (Ex: 8585 ou 8080)"
                         autoCapitalize='none'
                        placeholderTextColor="#b8b6b6" 
                        value={portaJava}
                        onChangeText={value => setPortaJava(value)}/>
                    </View> */}
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.button}
                        onPress={() => props.insertIp(ipVendas, portaJava)}>
                            <Text style={{color: 'white'}}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </KeyboardAvoidingView>
                
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.7)"}}>

                </View>
            </TouchableWithoutFeedback>
            
        </Modal>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    box:{
        width: '100%',
        padding: 30,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center"
    },
    title:{
        color: "#000",
        textAlign: "center"
    },
    input:{
        width: '90%',
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        marginTop: 10,
        height: 40,
        paddingLeft: 20,
        color: '#000'
    },
    button:{
        marginTop: 10,
        width: '90%',
        backgroundColor: stylesDefault.colors.colorPrimary,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20

    }
})