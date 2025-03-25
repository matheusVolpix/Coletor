import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { Background, BoxItens, Option, TextOption,
    ButtonCancel, TextButtonCancel
 } from "./style";
import List from "./List";

export default ({list, isVisible, itemSelected}) => {
    return(
        <Background onPress={isVisible} activeOpacity={0}>

            <BoxItens>
                    <FlatList 
                        data={list}
                        keyExtractor={item => `${item.value}`}
                        renderItem={({item}) => 
                        <List item={item} 
                        itemSelected={itemSelected}
                        isVisible={isVisible}/>}
                    />
            </BoxItens>

            <ButtonCancel onPress={isVisible}>
                <TextButtonCancel>
                    Cancelar
                </TextButtonCancel>
            </ButtonCancel>
        </Background>
    )
}