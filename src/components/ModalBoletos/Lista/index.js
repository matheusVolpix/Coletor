import React from "react";

import { BoletoLinhas,
    Linha
 } from "../style";

export default ({boleto}) => {

    function formatarBRL()
    {
        if(boleto.valor){
            return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        }).format(boleto.valor);
        }
        
        return;
    }

    function formatarDataBR(boleto) {
        if (!boleto) return null;

        const [ano, mes, dia] = boleto.split("-");
        return `${dia}/${mes}/${ano}`; // ex: 2025-08-10 → 10/08/25
    }

    return(
        <BoletoLinhas>
            <Linha>{boleto.codigo}</Linha>
            <Linha>Valor: {formatarBRL()}</Linha>
            <Linha>Vencimento: {formatarDataBR(boleto.vencimento)}</Linha>
        </BoletoLinhas>
    )
}