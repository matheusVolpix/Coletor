import React from "react";
import { View, Modal, StyleSheet, Dimensions} from "react-native";
import Barcode from "../Barcode";
import BarcodeNFE from "../BarcodeNFE";

const {width} = Dimensions.get('window');

export default props => {

    return(
        
        <Modal onRequestClose={props.onCancel}
            transparent={true} 
            visible={props.isVisible} 
            animationType="slide">
            
            
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', width: "100%"}}>
                {props.type == 'NFE' ? <BarcodeNFE value={props.value} /> : <Barcode value={props.value} />}
                
            </View>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxItems:{ 
        height: '90%',
        marginTop: 10, 
        width: width * 0.8, 
        marginHorizontal: 10,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    headerBox:{
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    titleBox:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    text:{
        marginTop: 8
    },  
    button:{
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'red',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton:{
        color: "#fff",
        textAlign: 'center'
    }
})