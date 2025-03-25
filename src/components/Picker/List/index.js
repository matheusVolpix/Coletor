import React from "react";
import { View } from "react-native";
import { Option, TextOption } from "../style";

export default ({item, first, last, itemSelected, isVisible}) => {

    function onPressItem()
    {
        itemSelected(item);
        isVisible();
    }
    
    return(
        <Option
            onPress={onPressItem} 
            activeOpacity={0.5}
           
            >
            <TextOption>{item.label}</TextOption>
        </Option>
    )
}