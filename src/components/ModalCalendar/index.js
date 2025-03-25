import React, {useState} from "react";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import stylesDefault from "../../pages/stylesDefault";

import { ptBR } from "./localeCalendar";

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default  ({setVisible, handleFilter}) => {

    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({});

    function handleOnDayPress(date){
        // console.log(date.dateString)

        setDateNow(new Date(date.dateString));

        let markedDay = {};

        markedDay[date.dateString] = {
            selected: true,
            selectedColor: "#3b3dbf",
            textColor: "#fff"
        }

        setMarkedDates(markedDay);
    }

    function handleFilterDate(){
        handleFilter(dateNow);
        setVisible();
    }

    return(
        <View style={{flex:1}}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{backgroundColor: "rgba(0,0,0,0.5)", flex: 1}}></View>
            </TouchableWithoutFeedback>
            <View style={{backgroundColor: "#fff", flex: 1, justifyContent: "center"}}>
                <Calendar
                        onDayPress={handleOnDayPress}
                        markedDates={markedDates}
                        enableSwipeMonths={true}
                        theme={{
                            todayTextColor: "#ff0000",
                            selectedDayBackgroundColor: stylesDefault.colors.colorPrimary,
                            selectedDayTextColor: "#fff"
                        }}
                    />

                <TouchableOpacity style={{width: "90%", margin: 20, height: 45, justifyContent: "center", alignItems: "center",
                    backgroundColor: stylesDefault.colors.colorPrimary, marginTop: 10
                }} onPress={handleFilterDate}>
                    <Text style={{color: "#fff"}}>Filtrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}