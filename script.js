function calcularRentabilidad() {
    const inversionInicial = parseFloat(document.getElementById('inversionInicial').value);
    const flujoEfectivoAnual = parseFloat(document.getElementById('flujoEfectivoAnual').value);
    const gastos = parseFloat(document.getElementById('gastos').value);
    const numeroAnos = parseFloat(document.getElementById('numeroAnos').value);
    const tasaInflacion = parseFloat(document.getElementById('tasaInflacion').value) / 100;
    const tasaDescuento = parseFloat(document.getElementById('tasaDescuento').value) / 100;

    let rentabilidadTotal = 0;
    let rentabilidadFlujoMedio = 0;
    let payback = 0;
    let vpn = -inversionInicial;
    let flujoEfectivoNeto = flujoEfectivoAnual - gastos;
    let tir = 0;
    let acumuladoFlujoNeto = -inversionInicial;  // Iniciar el acumulado con la inversión inicial negativa

    for (let i = 1; i <= numeroAnos; i++) {
        let flujoAjustadoInflacion = flujoEfectivoNeto / Math.pow(1 + tasaInflacion, i);
        rentabilidadTotal += flujoEfectivoNeto;
        rentabilidadFlujoMedio += flujoEfectivoNeto / numeroAnos;
        vpn += flujoEfectivoNeto / Math.pow(1 + tasaDescuento, i);
        acumuladoFlujoNeto += flujoEfectivoNeto;  // Acumular flujo neto año a año

        if (payback === 0 && acumuladoFlujoNeto >= 0) {
            payback = i;
        }
    }

    for (let rate = 0; rate <= 1; rate += 0.0001) {
        let npv = -inversionInicial;
        for (let i = 1; i <= numeroAnos; i++) {
            npv += flujoEfectivoNeto / Math.pow(1 + rate, i);
        }
        if (npv >= 0) {
            tir = rate * 100;
            break;
        }
    }

    rentabilidadTotal = (rentabilidadTotal / inversionInicial) * 100;
    rentabilidadFlujoMedio = (rentabilidadFlujoMedio / inversionInicial) * 100;
    let rentabilidadInflacion = ((flujoEfectivoNeto * numeroAnos) / (inversionInicial * Math.pow(1 + tasaInflacion, numeroAnos))) * 100;

    document.getElementById('resultados').innerHTML = `
        <p>Rentabilidad Total: ${rentabilidadTotal.toFixed(2)}%</p>
        <p>Rentabilidad Flujo Medio: ${rentabilidadFlujoMedio.toFixed(2)}%</p>
        <p>Retorno de Inversión (Payback): ${payback} años</p>
        <p>Rentabilidad con Inflación: ${rentabilidadInflacion.toFixed(2)}%</p>
        <p>Valor Presente Neto (VPN): $${vpn.toFixed(2)}</p>
        <p>Tasa Interna de Retorno (TIR): ${tir.toFixed(2)}%</p>
    `;
}
