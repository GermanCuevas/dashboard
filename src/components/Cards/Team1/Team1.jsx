import { useEffect, useState } from 'react';

export const Team1 = () => {
  const [temperature, setTemperature] = useState(undefined);
  useEffect(() => {
    const llamada = async () => {
      // TODO se puede mejorar este fragmento de código
      // se puede dejar la construcción del request del lado del back por ejemplo
      const requestAPI = {
        location: "-34.607319,-58.435705",
        fields: 'temperature',
        timesteps: 'best',
        units: 'metric'
      }
      const response = await fetch('http://localhost:8080/weather?' + new URLSearchParams(requestAPI));
      const responseData = await response.json();
      const temperature = responseData[0].intervals[0].values.temperature;
      setTemperature(temperature);
    };
    llamada();
  }, []);

  return (
    <div className="card">
      <h1>Team1 CLima</h1>
      <p>{`${temperature} C`}</p>
      <small>Buenos Aires</small>
    </div>
  );
};
