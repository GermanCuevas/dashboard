import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { Peliculas } from './Peliculas';
import './team2.css';

export const Team2 = () => {
  const [respuesta, setRespuesa] = useState(undefined);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const handleShowSettingModal = () => setShowSettingModal(true);
  const handleCloseSettingModal = () => setShowSettingModal(false);

  useEffect(() => {
    const llamada = async () => {
      let response = await fetch('http://localhost:8080/api/greeting');
      let data = await response.text();
      setRespuesa(data);
    };
    llamada();
  }, []);

  return (
    <>
      <div className="card">
        <FontAwesomeIcon
          className="fw-bold fs-5 position-absolute"
          style={{ right: '2rem', cursor: 'pointer' }}
          icon={faSliders}
          onClick={handleShowSettingModal}
        ></FontAwesomeIcon>
        <p>{respuesta}</p>
      </div>

      {/* MODAL EDITABLE PARA CADA TEAM */}
      <Modal show={showSettingModal} onHide={handleCloseSettingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Peliculas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Peliculas />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSettingModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
