import { useEffect, useState } from "react";

import {
  faRainbow,
  faSliders,
  faSnowflake,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";

export const Team1 = () => {
  const [weather, setWeather] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [iconWeather, setIconWeather] = useState(undefined);
  const [bgCard, setBgCard] = useState(undefined);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [countryInput, setCountryInput] = useState(undefined);

  const handleCloseSettingModal = () => setShowSettingModal(false);
  const handleShowSettingModal = () => setShowSettingModal(true);
  const handleSettingChange = async () => {
    const requestAPI = {
      location: countryInput,
      units: "metric",
    };
    getWeather(requestAPI);
    setShowSettingModal(false);
    setCountry(countryInput);
  };

  const bgCooler = "#330031";
  const bgHot = "#ff7251";
  const bgNormal = "#5BC8FF";

  const getWeather = async (request) => {
    // Llamada a la API
    const response = await fetch(
      "http://localhost:8081/realtime?" + new URLSearchParams(request)
    );
    const weather = await response.json();

    // Seleccion de iconos
    if (weather.temperature <= 15) {
      setIconWeather(faSnowflake);
    } else if (weather.temperature >= 25) {
      setIconWeather(faSun);
    } else {
      setIconWeather(faRainbow);
    }

    // Seleccion de color de fondo
    if (weather.temperature <= 10) {
      setBgCard(bgCooler);
    } else if (weather.temperature >= 30) {
      setBgCard(bgHot);
    } else {
      setBgCard(bgNormal);
    }
    setWeather(weather);
    // return { temperature: 15, temperatureApparent: 15 };
  };

  useEffect(() => {
    const requestAPI = {
      location: "Buenos Aires",
      units: "metric",
    };
    setCountry("Buenos Aires");
    getWeather(requestAPI);
  }, []);

  return (
    <>
      <div className="card border-0" style={{ "background-color": bgCard }}>
        <div style={{ color: "white" }}>
          <FontAwesomeIcon
            className="fw-bold fs-5 position-absolute"
            style={{ right: "2rem", cursor: "pointer" }}
            icon={faSliders}
            onClick={handleShowSettingModal}
          ></FontAwesomeIcon>
        </div>
        <div className="card-body">
          <h1 className="card-tile fw-semibold" style={{ color: "white" }}>
            {`${weather?.temperature} C`}
            <FontAwesomeIcon
              className="ps-3"
              icon={iconWeather}
            ></FontAwesomeIcon>
          </h1>
          <div
            className="card-text d-flex flex-column"
            style={{ color: "white" }}
          >
            <small>
              Sensación Térmica
              <span className="fw-semibold ps-1">
                {weather?.temperatureApparent} C
              </span>
            </small>
            <small className="fw-semibold">{country}</small>
          </div>
        </div>
      </div>

      <Modal show={showSettingModal} onHide={handleCloseSettingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Configuración de clima</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>País o ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buenos Aires"
              value={countryInput}
              onChange={(e) => {
                setCountryInput(e.target.value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSettingModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSettingChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
