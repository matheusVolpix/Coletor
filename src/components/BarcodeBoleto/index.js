import React, { useEffect, useState, useRef } from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import { Camera, useCameraDevice, useCodeScanner ,useCameraPermission ,NoCameraDeviceError} from "react-native-vision-camera";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default props => {

    const device = useCameraDevice('back')
    const [permissionCamera, setPermissionCamera] = useState(false);
    const [cameraAtiva, setCameraAtiva] = useState(true);

    useEffect(() => {

      async function permission(){
        const status = await Camera.getCameraPermissionStatus();
        console.log("Status inicial da permissão:", status);
          if(status === 'granted'){
              setPermissionCamera(true);
              
          }else{
            
          }
          
      }
     

      permission();

  }, []);

  async function permissionCameraAgain(){

    const newCameraPermission = await Camera.requestCameraPermission();
        if(newCameraPermission === 'granted'){
            setPermissionCamera(true);
        }
  }

    const codeScanner = useCodeScanner({
      codeTypes: ['code-128', 'code-39', 'itf'],
      onCodeScanned: (codes, frame) => {
        const value = codes[0]?.value;
        if (!value) return;

        if (/^\d{44,48}$/.test(value)) {
          props.value(value);
        } else {
          console.log('Código inválido para boleto:', value);
        }
      }
    });

       function view() {
    if (permissionCamera && cameraAtiva) {
      return (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            photoQualityBalance="balance"
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={props.fecharCamera} // <- fecha a câmera
          >
            <Icon name="x" size={50} color="#fff" />
          </TouchableOpacity>
        </>
      );
    } else if (!permissionCamera) {
      return (
        <View style={styles.BoxModal}>
          <TouchableOpacity
            onPress={permissionCameraAgain}
            style={styles.Button}
          >
            <Text style={{ color: "#fff" }}>Acessar câmera</Text>
          </TouchableOpacity>
        </View>
      );
    } 
  }

    return(
        <View style={styles.container}>           
            {view()}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "100%"
    },
    BoxModal:{
        height: "auto",
        padding: 10,
        width: "100%",
    },
    Button:{
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ed702f"
    },
    buttonContainer:{
        width: '100%',
        position: 'absolute',
        bottom: 80,
        padding: 10,
        alignItems: 'center'
    },
    cameraButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: "#fff",
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    cameraButtonIn: {
        width: 66,
        height: 66,
        backgroundColor: "#ccc",
        borderRadius: 33
    },
     close: {
    width: "100%",
    position: "absolute",
    top: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
    },
     buttonClose: {
        position: 'absolute',
        right: 15,
        top: 10,
        backgroundColor: "#ccc",
        borderRadius: 25
     }
})