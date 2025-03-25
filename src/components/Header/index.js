import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import stylesDefault from "../../pages/stylesDefault";
import { AuthContext } from "../../contextApi/auth";

import { useNavigation } from "@react-navigation/native";

export default ({title, user, back}) => {

    const {logoff} = useContext(AuthContext)

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                {back ? 
                    (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" color="#fff" size={20}/>
                    </TouchableOpacity>)
                    : null
                }
                 {/*<TouchableOpacity style={{paddingVertical: 7, paddingHorizontal: 10}} onPress={() => navigation.openDrawer()}>
                     {/*<Icon name="menu" size={24} color="#fff" />
                 </TouchableOpacity>*/}
                <Text style={styles.text}>{title}</Text>
            </View>

            <View style={styles.containerHeader}>
                <Text style={styles.text}>{user}</Text>
                <TouchableOpacity onPress={logoff}>
                    <Icon name="log-out" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: stylesDefault.colors.backgroundColorBlack
    },
    containerHeader:{
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center"

    },
    text: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 17,

    }
})