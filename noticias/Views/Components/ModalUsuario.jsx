import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormUser from "./FormUser";

function ModalUsuario(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Bienvenido a EDUCEM
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormUser />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AgregarUsuario() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Agregar Usuario
      </Button>

      <ModalUsuario show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

//render(<AgregarUsuario />);
export default AgregarUsuario;
