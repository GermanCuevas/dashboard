import { useEffect, useState } from 'react';

export const Team1 = () => {
  const [respuesta, setRespuesa] = useState(undefined);
  useEffect(() => {
    const llamada = async () => {
      let response = await fetch('http://localhost:8080/ap1/saludos');
      let data = await response.text();
      setRespuesa(data);
    };
    llamada();
  }, []);

  return (
    <div className="card">
      <h1>Team1</h1>
      <p>{respuesta}</p>
    </div>
  );
};
