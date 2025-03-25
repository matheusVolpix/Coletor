import React, {useState, useContext, useEffect} from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import stylesDefault from "../../pages/stylesDefault";
import ListaVendas from "../ListaVendas";
import { AuthContext } from "../../contextApi/auth";
import api from "../../services/api";

export default ({setVisible, openModal2, openModal3, date2, date3,
    dateMoviments2, dateMoviments3
}) => {

    const [stores, setStores] = useState();
    const [total, setTotal] = useState();
    const [load, setLoad] = useState(false);
    const {ip, ipJava} = useContext(AuthContext);

    async function handleFilter(){

        var dataInicio = new Date(dateMoviments2);
        var dataFim = new Date(dateMoviments3);
        var diffMilissegundos = dataFim - dataInicio;
        var diffSegundos = diffMilissegundos / 1000;
        var diffMinutos = diffSegundos / 60;
        var diffHoras = diffMinutos / 60;
        var diffDias = diffHoras / 24;
        var diffMeses = diffDias / 30;

        if(diffDias > 30){
            Alert.alert("Ops!", "Por favor o intervalo deve ser de no máximo 30 dias");
            return;
        }

        setLoad(true);

        if(!date2){
            Alert.alert("Ops!", "Por favor selecione a data de inicio");
            return;
        }

        if(!date3){
            Alert.alert("Ops!", "Por favor selecione a data de fim");
            return;
        }



        try {

            const response = await api.get(`http://${ip}:${ipJava}/VolpixWebService/webresources/generic/BalancoGeral/${dateMoviments2}/${dateMoviments3}`,
                {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        }).then((resp) => {
                
                sum(resp.data);
                console.log(resp.data);
        })

        } catch(err) {

        }

        setLoad(false);

    }

    function sum(data){

        setStores(data);

        let total = 0;
        data.forEach(element => {
            total += parseFloat(element.total);
        });

        setTotal(total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
    }

    function list(){
        if(stores){
            return(
                <View style={{marginVertical: 10, width: "90%", flex: 1, paddingVertical: 20}}>
                    <FlatList
                    data={stores}
                    keyExtractor={ item => item.lojaMatriz}
                    renderItem={({item}) => <ListaVendas data={item}/>} />
                </View>
            
           
            )
                    
        }
    }

    return(
        <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{flex: 2, backgroundColor: "rgba(0,0,0,0.5)"}}></View>
            </TouchableWithoutFeedback>
            
            <View style={styles.boxModal}>
                <Text style={styles.title}>Selecione a data de inicio e fim</Text>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.buttonSelect} onPress={openModal2}>
                        <Text style={styles.titleButtonSelect}>Inicio {(date2 ?? date2)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSelect} onPress={openModal3}>
                        <Text style={styles.titleButtonSelect}>Fim {(date3 ?? date3)}</Text>
                    </TouchableOpacity>
                </View>
                {list()}

                
                
                <TouchableOpacity style={styles.buttonFilter} onPress={handleFilter}>
                {load ? <ActivityIndicator size={25} color="#fff"/> : <Text style={styles.titleButtonFilter}>Filtrar</Text>}
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{flex: 2, backgroundColor: "rgba(0,0,0,0.5)"}}></View>
            </TouchableWithoutFeedback>
            
        </View>
    )
}

const styles = StyleSheet.create({

    boxModal: {
        flex: 6,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        position: "relative"
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },  
    containerButton:{
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    buttonSelect:{
        backgroundColor: stylesDefault.colors.colorPrimary,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    titleButtonSelect: {
        color: "#fff"
    },
    buttonFilter: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        backgroundColor: stylesDefault.colors.colorPrimary,
        position: "absolute",
        bottom: 10
    },
    titleButtonFilter: {
        color: "#fff"
    }

})