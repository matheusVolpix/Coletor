import React from "react";
import { View, Modal, StyleSheet, ActivityIndicator} from "react-native";


export default props => {

    return(
        
        <Modal onRequestClose={props.onCancel}
            transparent={true} 
            visible={props.isVisible} 
            animationType="fade">
            
            
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: "center"}}>
                <ActivityIndicator color="#fff" size={30} />
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
        width: '100%', 
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