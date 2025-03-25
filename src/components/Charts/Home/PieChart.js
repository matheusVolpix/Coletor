import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import stylesDefault from "../../../pages/stylesDefault";

export default ({pie}) => {

    const pieData = [
        {
          value: 26,
          color: '#009FFF',
          gradientCenterColor: '#006DFF',
          focused: true,
          label: 'Pão Frances'
        },
        {value: 23, color: '#93FCF8', gradientCenterColor: '#3BE9DE', label: "Pão Frances"},
        {value: 20, color: '#BDB2FA', gradientCenterColor: '#8F80F3', label: "Pão de quijo"},
        {value: 14, color: '#FFA5BA', gradientCenterColor: '#FF7F97', label: "Queijo mussarela"},
        {value: 23, color: '#93FCF8', gradientCenterColor: '#3BE9DE', label: "Costela Gaucha"},
    ];

    const test =  [{"label": "PAO FRANCES kg", "value": 2752.079999999999}, {"label": "LEITE ITALAC LV INTE", "value": 1939.3442000000025}, {"label": "Q MUSSARELA kg LACTO", "value": 1403.36}, {"label": "FRANGO/ FILE kg RESF", "value": 1312.7500000000002}, {"label": "CONTRA FILE kg", "value": 1055.09}]

    const renderDot = color => {
        return (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: color,
              marginRight: 10,
            }}
          />
        );
      };

      let products = pie.map((v,k) => {
        return  (<View key={k}
          style={{flexDirection: 'row', alignItems: 'center', margin: 5, width: "100%", justifyContent: "center"}}>
          {renderDot(v.color)}
          <Text style={{color: '#000'}}>{v.label}</Text>
        </View>)
    });

      const renderLegendComponent = () => {
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
                flexWrap: "wrap"
              }}>
              {products}
            </View>
          </>
        );
      };

    return(

        <View
      style={{
        margin: 20,
        padding: 10,
        width: "90%",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: stylesDefault.colors.colorPrimary
      }}>
      <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: "center"}}>
        Produtos mais vendidos
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pie}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>

    )
}