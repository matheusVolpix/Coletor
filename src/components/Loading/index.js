import React from "react";
import { Container } from "./style";
import { ActivityIndicator } from "react-native";

export default props => {
    return(
        <Container>
            <ActivityIndicator size={22} color="#ed702f"/>
        </Container>
    )
}