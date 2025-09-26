import React from "react";
import { View, Text, StyleSheet } from "react-native";
import stylesDefault from "../../pages/stylesDefault";

export default ({current}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Versão Volpix 1.1.22</Text>
            {/* <Text style={styles.text}>{current}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: stylesDefault.colors.backgroundColorBlack,
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        flexDirection: "row"
    },
    text: {
        color: "#fff",
        fontSize: 15
    }

})