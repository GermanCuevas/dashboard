import { useEffect, useState } from "react";

export const Team1 = () => {
  const [temperature, setTemperature] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const getWeather = async (request) => {
    const response = await fetch(
      "http://localhost:8081/realtime?" + new URLSearchParams(request)
    );
    const responseData = await response.json();
    const temperature = responseData.temperature;
    return temperature;
  };
  useEffect(() => {
    const countryMain = 'Buenos Aires';
    const requestAPI = {
      location: countryMain,
      units: "metric",
    };
    const callApi = async () => {
      const temperature = await getWeather(requestAPI);
      setTemperature(temperature);
    };
    callApi();
    setCountry(countryMain);
  }, []);

  return (
    <div className="card">
      <h1>Team1 CLima</h1>
      <p>{`${temperature} C`}</p>
      <small>{country}</small>
    </div>
  );
};
