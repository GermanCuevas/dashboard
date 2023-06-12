import React, { useEffect, useState } from 'react';

export const Team5 = () => {
  const [respuesta, setRespuesta] = useState(undefined);

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
      } catch (error) {
        console.error('Error:', error);
      }
    };

    llamada();
  }, []);

  const bitcoinPrice = respuesta && respuesta.bitcoin ? respuesta.bitcoin.usd : 0;

  return (
    <div className="card">
      <h1>Team5</h1>
      <p>Bitcoin: ${bitcoinPrice}</p>
    </div>
  );
};
