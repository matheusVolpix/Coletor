import React from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import stylesDefault from "../../pages/stylesDefault";

const {width} = Dimensions.get('window');

export default props => {

    flatItems = (item, store) => {

        return(
            <View style={styles.boxItems}>
                <View style={styles.headerBox}>
                    <Text style={styles.titleBox}>{item.descricaocompleta}</Text>
                </View>
                <Text style={styles.text}>{item.codigoean}</Text>
                <Text style={styles.text}>Loja {store}</Text>
                <Text style={styles.text}>Qtd Est: {item.estoque}</Text>
                <Text style={styles.text}>R$ Custo: {item.custo}</Text>
                <Text style={styles.text}>R$ Venda: {item.precovenda1}</Text>
                <Text style={styles.text}>R$ precooferta: {item.precooferta}</Text>
                {verifySolicitation(props.solicitacoes, item, props.loading)}
                {verifyTag(props.tags, item, props.loadingTag)}
            </View>
        )
        
    }

    verifySolicitation = (solicitations, item, loading) => {
        
        const verify = solicitations && solicitations.find(solicitacao => solicitacao.codigoean === item.codigoean);
        if(verify){
            return(
                <TouchableOpacity onPress={() => props.solicitacaoRemove(item.codigoean)} style={[styles.button, {backgroundColor: "red"}]}>
                    {loading ? <ActivityIndicator size={25} color="#fff"/> : <Text style={styles.textButton}>Produto Solicitado</Text>}
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity onPress={() => props.solicitacao(item.codigoean)} style={[styles.button, {backgroundColor: stylesDefault.colors.colorPrimary}]}>
                    {loading ? <ActivityIndicator size={25} color="#fff"/> : <Text style={styles.textButton}>Solicitar Produto</Text>}
                </TouchableOpacity>
            )
            
        }
    }

    verifyTag = (tags, item, loading) => {
        
        const verify = tags && tags.find(tag => tag.codigoean === item.codigoean);
        if(verify){
            return(
                <TouchableOpacity onPress={() => props.tagRemove(item.codigoean)} style={[styles.button, {backgroundColor: "red"}]}>
                    {loading ? <ActivityIndicator size={25} color="#fff"/> : <Text style={styles.textButton}>Produto Etiquetado</Text>}
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity onPress={() => props.tag(item.codigoean)} style={[styles.button, {backgroundColor: stylesDefault.colors.colorYellow}]}>
                    {loading ? <ActivityIndicator size={25} color="#fff"/> : <Text style={styles.textButton}>Etiqueta</Text>}
                </TouchableOpacity>
            )
            
        }
    }

    return(
        
        <Modal onRequestClose={props.onCancel}
            transparent={true} 
            visible={props.isVisible} 
            animationType="slide">
            <TouchableWithoutFeedback onPress={props.onCancel}>
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.7)'}}></View>
            </TouchableWithoutFeedback>
            
            <View style={{flex: 2,backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center'}}>
                <View style={styles.container}>
                    <FlatList data={props.items}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `${item.codigoean}` }
                    horizontal
                    snapToAlignment={"start"}
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    renderItem={({item}) => 
                        flatItems(item, props.store)
                    }/>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.7)'}}></View>
            </TouchableWithoutFeedback>
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
        fontWeight: 'bold',
        color: "#000"
    },
    text:{
        marginTop: 8,
        color: "#000"
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