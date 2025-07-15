import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import axios from "axios";

import { Alert } from "react-native";

export const AuthContext = createContext({});

export default ({children}) => {

    const [user, setUser] = useState(null);
    const [date, setDate] = useState();
    const [resumoGeral, setResumoGeral] = useState();
    const [etiqueta, setEtiqueta] = useState();
    const [produtos, setProdutos] = useState();
    const [solicitacao, setSolicitacao] = useState();
    const [stores, setStores] = useState([]);
    const [currentStore, setCurrentStore] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [ip, setIp] = useState();
    const [ipJava, setIpJava] = useState();
    // const ipLink = "http://192.168.15.157/api";
    const ipLink = "http://volpix.com.br/api";

    useEffect(() => {
        async function loadStorage(){

          const storageIp = await AsyncStorage.getItem('ipVendas');
          const storageUser = await AsyncStorage.getItem("user");
          const storagePass = await AsyncStorage.getItem("password");
          const storageIpJava = await AsyncStorage.getItem("ipJava");
          const storageStore = await AsyncStorage.getItem("filial");
    
          if(storageIp && storageUser && storagePass){

    
            try{
                const response = await fetch(ipLink+'/me', {
                    method: 'GET',
                     headers: {
                        'Accept': 'application/json',
                        "user": storageUser,
                         "password": storagePass,
                         "ip": storageIp
                     } 
                 });

                 const json = await response.json();

                    

                        setResumoGeral(json.ResumoGeral);
                        setProdutos(json.Produtos);
                        setEtiqueta(json.Etiqueta);
                        setSolicitacao(json.Solicitação);
                        setUser(json.user);
                        setStores(json.stores);
                        setIp(storageIp);
                        setLoadingAuth(false);
                        let formated = json.date.replace("-", "/");
                        setDate(formated.replace("-", "/"));

                        

                        if(storageStore){
                            
                            let current = currentStoreSelected(storageStore);
                            //const {label} = current;
                            //setCurrentStore(current);
                        }else{

                            setCurrentStore(json.stores[0]);
                        }

                 
         
             } catch (e) {
                 console.log(e)
                 setLoadingAuth(false);
             }
          }

          setLoadingAuth(false);
    
        }
    
        loadStorage();
      }, []);

    function logoff(){
        setUser(null);
    }

    function currentStoreSelected(value){

        let current = stores.find(store => store.value === value);

        setCurrentStore(current);

    }

    function setConfig(ipVendas, ipJava){

        AsyncStorage.setItem("ipVendas", ipVendas);
        AsyncStorage.setItem("ipJava", ipJava);
    }

    function getIp(){
        setIp("teste")
    }


    async function signIn(user, password, ip){

        setLoading(true);

        try{

            const response = await fetch(ipLink+"/me",{
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'user': user,
                    'password': password,
                    'ip': ip
                }
            });
            const json = await response.json();

            // Debug para ver a estrutura da resposta
            console.log("JSON:", json);
                

                if(json.error){
                    Alert.alert("ops!", json.error);
                    setLoading(false);
                    return;
                }

                setResumoGeral(json.ResumoGeral);
                setProdutos(json.Produtos);
                setEtiqueta(json.Etiqueta);
                setSolicitacao(json.Solicitação);
                setUser(json.user);
                setStores(json.stores);
                setIp(ip);
                // setIpJava(ipJava);
                let formated = json.date.replace("-", "/");
                setDate(formated.replace("-", "/"));
                

                setCurrentStore(json.stores[0]);


                AsyncStorage.setItem("ipVendas", ip);
                // AsyncStorage.setItem("ipJava", ipJava);

                AsyncStorage.setItem("user", user);
                AsyncStorage.setItem("password", password);

                setLoading(false);

        }catch(err){
            setLoading(false);
            
            setLoading(false);
            console.log(err);
        }

        setLoading(false);


    }

    return (
        <AuthContext.Provider value={{signed: !!user , ipLink,
            signIn, loadingAuth, loading, stores, ip, date, resumoGeral, produtos,
            etiqueta, solicitacao, ipJava, user, logoff, currentStore, currentStoreSelected, setConfig}}>
            {children}
        </AuthContext.Provider>
    )


}