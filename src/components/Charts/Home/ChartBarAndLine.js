import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import stylesDefault from "../../../pages/stylesDefault";

export default ({chart}) => {

    return(
        <View
      style={{
        margin: 10,
        padding: 16,
        width: "90%",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: stylesDefault.colors.colorPrimary
      }}>
      <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: "center"}}>
        Vendas
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <BarChart
          data={chart}
          barWidth={26}
          initialSpacing={30}
          spacing={23}
          barBorderRadius={4}
          showGradient
          yAxisThickness={0}
          xAxisType={'dashed'}
          xAxisColor={'darkgray'}
          yAxisTextStyle={{color: 'darkgray'}}
          noOfSections={6}
          labelWidth={40}
          xAxisLabelTextStyle={{color: 'darkgray', textAlign: 'center'}}
        />
      </View>
    </View>
    )
}