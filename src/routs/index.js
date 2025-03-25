
import React, { useContext } from "react";
import Bottom from "./Bottom";
import {AuthContext} from "../contextApi/auth";
import Stack from './Stack';
import Drawer from './Drawer';
import Loading from "../screens/loading";

export default porps => {

    const {loadingAuth, signed} = useContext(AuthContext);

    if(loadingAuth){
        return(
            <Loading />
        )
    }

    return(
        signed ? <Bottom /> : <Stack />    
    )
    
}