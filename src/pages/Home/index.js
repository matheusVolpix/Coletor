import React, {useContext, useState, useEffect} from "react";
import { View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Modal, 
    TouchableOpacity, 
    ActivityIndicator, 
    TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../../contextApi/auth";
import Header from "../../components/Header";
import stylesDefault from "../stylesDefault";
import ChartBarAndLine from "../../components/Charts/Home/ChartBarAndLine";
import PieChart from "../../components/Charts/Home/PieChart";
import { useIsFocused } from "@react-navigation/native";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, setDate } from "date-fns";
import Icon from "react-native-vector-icons/Feather";
import ModalCalendar from "../../components/ModalCalendar";
import ModalCalendar2 from "../../components/ModalCalendar2";
import ModalCalendar3 from "../../components/ModalCalendar3";
import ModalSales from "../../components/ModalSales";
import Footer from "../../components/Footer";

export default props => {

    const focused = useIsFocused();

    const {user, ip, stores, getIp, currentStore} = useContext(AuthContext);

    const [modalCalendar, setModalCalendar] = useState(false);
    const [modalSales, setModalSales] = useState(false);
    const [modalCalendar2, setModalCalendar2] = useState(false);
    const [modalCalendar3, setModalCalendar3] = useState(false);
    const [dateMovements, setDateMoviments] = useState(new Date());
    const [date, setDate] = useState("");

    const [dateMovements2, setDateMoviments2] = useState();
    const [date2, setDate2] = useState("");

    const [dateMovements3, setDateMoviments3] = useState(new Date(Date.now() - 86400000));
    const [date3, setDate3] = useState("");

    const [loadingValue, setLoadingValue] = useState(false);
    const [loadingChart, setLoadingChart] = useState(false);
    const [balance, setBalance] = useState();
    const [countStore, setCountStore] = useState();
    const [chartBar, setChartBar] = useState();
    const [pie, setPie] = useState();

    useEffect(() => {

        let isActive = true;

        if(isActive){

            let date = new Date(dateMovements);
            let date2 = new Date(Date.now() - 86400000);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let onlyDate2 = date2.valueOf() + date2.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, "yyyy-MM-dd");
            let dateFormated2 = format(onlyDate2, "yyyy-MM-dd");
            let dateString = format(onlyDate, "dd/MM/yyyy");
            let dateString2 = format(onlyDate2, "dd/MM/yyyy");

            setDateMoviments(dateFormated);
            setDate(dateString);
            setDateMoviments2(dateFormated2);
            setDate2(dateString2);
            setDateMoviments3(dateFormated2);
            setDate3(dateString2);

            setLoadingValue(true);

            setTimeout(() => {
                getBalance();
            }, 4000)

            

            getCharts();

            countStores();

        }

        

        

        return () => isActive = false;

    }, [focused, dateMovements])

    function VerifyLoop(){
        let date = new Date();
        let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
        let dateFormated = format(onlyDate, "yyyy-MM-dd");

         if(dateFormated === dateMovements){
            setInterval(() => {
                getBalance();
            }, 4000)
        }else{
            getBalance();
        }
    }


    function filterDateMovements(dateSelected){
        // console.log(dateSelected);
        setDateMoviments(dateSelected);
    }

    function filterDateMovements2(dateSelected){

            let date = new Date(dateSelected);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, "yyyy-MM-dd");
            let dateString = format(onlyDate, "dd/MM/yyyy");

            setDateMoviments2(dateFormated);
            setDate2(dateString);
    }

    function filterDateMovements3(dateSelected){

        let date = new Date(dateSelected);
        let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
        let dateFormated = format(onlyDate, "yyyy-MM-dd");
        let dateString = format(onlyDate, "dd/MM/yyyy");

        setDateMoviments3(dateFormated);
        setDate3(dateString);
}

    function intercale(array1, array2) {
        var arrayResult = [];
        var total = 0;
        if (array1.length > array2.length) {
          total = array1.length;
        } else {
          total = array2.length;
        }
      
        for (var i = 0; i < total; i++) {
          if (array1[i]) {
            arrayResult.push(array1[i]);
          }
          if (array2[i]) {
            arrayResult.push(array2[i]);
          }
        }

        arrayResult.forEach(item => {
            item.value = parseFloat(item.value);
          });
      
        setChartBar(arrayResult);
      }

      function intercaleWithoutControl(array1) {
        var arrayResult = [];
        var total = 0;

        total = array1.length;

      
        for (var i = 0; i < total; i++) {
          if (array1[i]) {
            arrayResult.push(array1[i]);
          }
        }

        arrayResult.forEach(item => {
            item.value = parseFloat(item.value);
        });
      
        setChartBar(arrayResult);
      }

    function eachPie(array){
        array.forEach(item => {
            item.value = parseFloat(item.value);
          });

        setPie(array);
    }

    function formatedBalance(){
        return balance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    async function getBalance(){

        let date = new Date(dateMovements);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, "yyyy-MM-dd");
            let dateString = format(onlyDate, "dd/MM/yyyy");

        try{

            const response = await api.get(`/managerial/balance/${dateFormated}`, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    user: user.user,
                    password: user.pass,
                    ip: ip
                }
            }).then((resp) => {

                if(resp.data.balance.total){
                    const total = parseFloat(resp.data.balance.total);
                    const formated = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                    setBalance(formated);
                }
                
            })

        } catch(error){
            console.log(error)
        }

        setLoadingValue(false);


    }

    

   async function getCharts(){

    setLoadingChart(true);

     let date = new Date(dateMovements);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, "yyyy-MM-dd");
            let dateString = format(onlyDate, "dd/MM/yyyy")

    try{

        const response = await api.get(`/managerial/chart/${dateFormated}`, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                user: user.user,
                password: user.pass,
                ip: ip
            }
        }).then((resp) => {

            if(resp.data.controller){
                intercale(resp.data.bars, resp.data.controller);

            }else{
                intercaleWithoutControl(resp.data.bars);
            }
        
            
            eachPie(resp.data.bestSellers);

        })

    }catch(error){
        console.warn(error);
    }

    setLoadingChart(false);
   }

    
    function countStores(){

        let tamanho= 0;  
        for (var i in stores) {
            if (stores.hasOwnProperty(i)) {
                tamanho++;
            }
        }

        setCountStore(tamanho);
    }

    function viewChartBar(){

        if(pie){
            
            return(<PieChart pie={pie}/>)
        }else{
            return;
        }

    }

    function loadChart(){
        if(loadingChart){
            return(
                <ActivityIndicator color="#ed702f" size={30}/>
            )
        }else{
            return(
                <ChartBarAndLine chart={chartBar} />
                
            )
        }
    }


    

    return(
        <ScrollView style={{flex: 1, backgroundColor: stylesDefault.colors.backgroundColorApp}}>
            <Header title="Resumo Geral" user={user.user}/>
            <View style={styles.container}>
                <View style={[styles.boxDefault, {flexDirection: "row"}]}>
                    <View style={{width: "15%"}}>
                        <TouchableOpacity onPress={() => setModalCalendar(true)}>
                            <Icon name="calendar" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: "85%", alignItems: "center"}}>
                        <Text style={styles.title}>Vendas {loadingValue ? <ActivityIndicator color="#ed702f" size={30}/> : balance }</Text>
                        <Text style={{color: "#888"}}>Última atualização {date}</Text>
                    </View>
                    
                </View>

                <TouchableWithoutFeedback onPress={() => setModalSales(true)}>
                    <View style={styles.boxDefault}>
                        <Text style={styles.title}>Números de lojas</Text>
                        <Text style={{color: "#888"}}>{countStore} lojas</Text>
                    </View>
                </TouchableWithoutFeedback>
                    
                
                

                {loadChart()}

                {viewChartBar()}

                <Modal visible={modalSales} animationType="fade" transparent={true}>
                    <ModalSales setVisible={() => setModalSales(false)} openModal2={() =>setModalCalendar2(true)}
                        openModal3={() =>setModalCalendar3(true)}
                        dateMoviments2={dateMovements2} 
                        dateMoviments3={dateMovements3}
                        date2={date2}
                        date3={date3}/>
                </Modal>

                <Modal visible={modalCalendar} animationType="fade" transparent={true}>
                    <ModalCalendar setVisible={() => setModalCalendar(false)}
                        handleFilter={filterDateMovements}/>

                </Modal>

                <Modal visible={modalCalendar2} animationType="fade" transparent={true}>
                    <ModalCalendar2 setVisible={() => setModalCalendar2(false)}
                        handleFilter={filterDateMovements2}/>

                </Modal>

                <Modal visible={modalCalendar3} animationType="fade" transparent={true}>
                    <ModalCalendar3 setVisible={() => setModalCalendar3(false)}
                        handleFilter={filterDateMovements3}/>

                </Modal>
                {!loadingChart ? <Footer current={currentStore}/> : null}
                
                

                
            </View>
            
        </ScrollView>
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
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },  
})