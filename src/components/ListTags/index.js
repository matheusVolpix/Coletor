import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import stylesDefault from "../../pages/stylesDefault";

export default ({item, remove}) => {
    

    return(
        <View style={styles.box}>
            <View style={styles.headerBox}>
                <Text style={{color: "#000", fontSize: 20}}>{item.codigoean}</Text>
            </View>
            <Text style={styles.text}>Loja: {item.loja}</Text>
            <TouchableOpacity style={styles.button} onPress={() => remove(item.codigoean, item.loja)}>
                <Text style={styles.textButton}>Excluir</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box:{
        padding: 5,
        borderWidth: 1,
        borderColor: stylesDefault.colors.backgroundColorBlack,
        marginBottom: 10
    },
    headerBox: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        padding: 5,
        borderColor: stylesDefault.colors.backgroundColorBlack,
    },
    text: {
        marginTop: 10,
        fontSize: 17,
        color: "#000",
    },
    button:{
        marginTop: 10,
        width: "100%",
        padding: 10,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
    textButton:{
        color: "#fff"
    }
})