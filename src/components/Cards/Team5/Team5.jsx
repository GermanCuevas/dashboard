import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Team5 = () => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  const handleShowSettingModal = () => setShowSettingModal(true);
  const handleCloseSettingModal = () => setShowSettingModal(false);
  const [respuesta, setRespuesta] = useState(undefined);
  const [dolar, setDolar] = useState(undefined);

  useEffect(() => {
    const llamada = async () => {
      try {
        const response = await fetch(
          'http://localhost:8085/crypto/crypto-prices?ids=bitcoin'
        );
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
      //Esta linea no se esta ejecutando===>
      //console.log('RESULTADO ' + data);
    };

    llamada();
  }, []);

  const bitcoinPrice =
    respuesta && respuesta.bitcoin ? respuesta.bitcoin.usd : 0;
  const dolarOficial = dolar
    ? 'Dolar ' +
      dolar.officialName +
      ': Compra $' +
      dolar.officialBuyPrice +
      ' - Venta $' +
      dolar.officialSellPrice
    : '';
  const dolarBlue = dolar
    ? 'Dolar ' +
      dolar.blueName +
      ': Compra $' +
      dolar.blueBuyPrice +
      ' - Venta $' +
      dolar.blueSellPrice
    : '';

  return (
    <div className="card">
      <FontAwesomeIcon
        className="fw-bold fs-5 position-absolute"
        style={{ right: '2rem', cursor: 'pointer' }}
        icon={faSliders}
        onClick={handleShowSettingModal}
      ></FontAwesomeIcon>
      <p>Bitcoin: ${bitcoinPrice}</p>
      <p>{dolarOficial}</p>
      <p>{dolarBlue}</p>

      {/* MODAL EDITABLE PARA CADA TEAM */}
      <Modal show={showSettingModal} onHide={handleCloseSettingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Configuracion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Aqui van la interfaz front dependiendo de la funcionalidad, en caso de que necesiten ayuda con esta parte porfavor avisarme (German).*/}
          <form className="my-form">
            <div className="boxInput">
              <label htmlFor="campo1">Campo 1</label>
              <input type="text" id="campo1" />
            </div>
            <div className="boxInput">
              <label htmlFor="campo2">Campo 2</label>
              <input type="text" id="campo2" />
            </div>
            <div className="boxInput">
              <label htmlFor="campo3">Campo 3</label>
              <input type="text" id="campo3" />
            </div>
            <button>Enviar</button>
          </form>
          {/* Este form es solo para ejemplificar, como mencione, se puede cambiar dependediendo del proyecto */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSettingModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
