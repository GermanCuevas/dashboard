import React, { useEffect, useState } from 'react';

export const Team5 = () => {
  const [respuesta, setRespuesta] = useState(undefined);
  const [dolar, setDolar] = useState(undefined);

  useEffect(() => {
    const llamada = async () => {
      try {
        const response = await fetch('http://localhost:8085/crypto/crypto-prices?ids=bitcoin');        
        if (response.ok) {
          const data = await response.json();
          setRespuesta(data);
        } else {
          console.log('Failed to retrieve cryptocurrency prices');
        }
        const dolarData = await fetch('http://localhost:8085/dollar/data');
        if (dolarData.ok) {
          const data = await dolarData.json();
          setDolar(data);
        } else {
          console.log('Failed to retrieve dollar data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      console.log("RESULTADO " + data);
    };

    llamada();
  }, []);

  const bitcoinPrice = respuesta && respuesta.bitcoin ? respuesta.bitcoin.usd : 0;
  const dolarOficial = dolar ? "Dolar " + dolar.officialName + ": Compra $" + dolar.officialBuyPrice + " - Venta $" + dolar.officialSellPrice : "";
  const dolarBlue = dolar ? "Dolar " + dolar.blueName + ": Compra $" + dolar.blueBuyPrice + " - Venta $" + dolar.blueSellPrice : "";

  return (
    <div className="card">
      <h1>Team5</h1>
      <p>Bitcoin: ${bitcoinPrice}</p>
      <p>{dolarOficial}</p>
      <p>{dolarBlue}</p>
    </div>
  );
};
