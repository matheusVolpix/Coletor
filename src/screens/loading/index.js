import React from "react";
import { View, ActivityIndicator, Image, StyleSheet } from "react-native";
import logo from "../../../assets/img/Logo-loading.png";
import stylesDefault from "../../pages/stylesDefault";

export default props => {

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ActivityIndicator color="#ed702f" size={30}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    logo: {
        width: "90%",
        marginBottom: 20
    }
})