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

    useEffect(() => {
        async function loadStorage(){

          const storageIp = await AsyncStorage.getItem('ipVendas');
          const storageUser = await AsyncStorage.getItem("user");
          const storagePass = await AsyncStorage.getItem("password");
          const storageIpJava = await AsyncStorage.getItem("ipJava");
          const storageStore = await AsyncStorage.getItem("filial");
    
          if(storageIp && storageUser && storagePass){

    
            try{
                await api.get('/me', {
                     headers: {
                        "user": storageUser,
                         "password": storagePass,
                         "ip": storageIp
                     } 
                 }).then((response) => {

                    if(response.data.ResumoGeral === "N" && 
                        response.data.Produtos === "N" &&
                        response.data.Etiqueta === "N" &&
                        response.data.Solicitação === "N"){
                        Alert.alert("Ops!", "Você esta sem acesso ao aplicativo");   
                    }else{

                        setResumoGeral(response.data.ResumoGeral);
                        setProdutos(response.data.Produtos);
                        setEtiqueta(response.data.Etiqueta);
                        setSolicitacao(response.data.Solicitação);
                        setUser(response.data.user);
                        setStores(response.data.stores);
                        setIp(storageIp);
                        setIpJava(storageIpJava);
                        setLoadingAuth(false);
                        let formated = response.data.date.replace("-", "/");
                        setDate(formated.replace("-", "/"));

                        

                        if(storageStore){
                            
                            let current = currentStoreSelected(storageStore);
                            //const {label} = current;
                            //setCurrentStore(current);
                        }else{

                            setCurrentStore(response.data.stores[0]);
                        }

                    }

                    

                 });

                 
         
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


    async function signIn(user, password, ip, ipJava){

        setLoading(true);

        try{

            const response = await api.get("/me",{
                headers:{
                    user: user,
                    password: password,
                    ip: ip
                }
            }).then((response) => {
                if(response.data.error){
                    Alert.alert("ops!", response.data.error);
                    return;
                }

                
                if(response.data.ResumoGeral === "N" && 
                    response.data.Produtos === "N" &&
                    response.data.Etiqueta === "N" &&
                    response.data.Solicitação === "N"
                ){
                    Alert.alert("Ops!", "Você esta sem acesso ao aplicativo");
                    return;
                }

                setResumoGeral(response.data.ResumoGeral);
                setProdutos(response.data.Produtos);
                setEtiqueta(response.data.Etiqueta);
                setSolicitacao(response.data.Solicitação);
                setUser(response.data.user);
                setStores(response.data.stores);
                setIp(ip);
                setIpJava(ipJava);
                let formated = response.data.date.replace("-", "/");
                setDate(formated.replace("-", "/"));
                

                setCurrentStore(response.data.stores[0]);


                AsyncStorage.setItem("ipVendas", ip);
                AsyncStorage.setItem("ipJava", ipJava);

                AsyncStorage.setItem("user", user);
                AsyncStorage.setItem("password", password);

               


            })

        }catch(err){
            Alert.alert("Ops!", err);
            setLoading(false);
        }

        setLoading(false);


    }

    return (
        <AuthContext.Provider value={{signed: !!user , 
            signIn, loadingAuth, loading, stores, ip, date, resumoGeral, produtos,
            etiqueta, solicitacao, ipJava, user, logoff, currentStore, currentStoreSelected, setConfig}}>
            {children}
        </AuthContext.Provider>
    )


}