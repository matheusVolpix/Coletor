import React, {useState} from "react";
import { View, Text } from "react-native";
import stylesDefault from "../../../pages/stylesDefault";
import { LineChart } from "react-native-gifted-charts";

export default props => {

    const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}, {value: 30}, {value: 26}, {value: 40}, {value: 30}, {value: 26}, {value: 40}, {value: 30}];

      return (
        <View
      style={{
        margin: 10,
        padding: 16,
        width: "90%",
        backgroundColor: stylesDefault.colors.backgroundColorBlack,
        alignItems: "center"
      }}>
        <Text style={{color: "#fff", marginBottom: 8}}>Venda por Hora</Text>
          <LineChart
            initialSpacing={0}
            data={data}
            spacing={60}
            textColor1="green"
            color1="skyblue"
            textFontSize={13}
            thickness={5}
            height={250}
            yAxisTextStyle={{color: "#fff"}}
            dataPointsHeight={6}
            dataPointsWidth={6}
            dataPointsColor1="blue"
            dataPointsColor2="red"          
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#fff"
            labelStyle={{color: "fff"}}
            color="#fff"
          />
      </View>
        );
}