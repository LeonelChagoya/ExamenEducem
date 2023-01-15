import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import { Swal } from "sweetalert2";

class Formuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      contraseña: "",
      personal_interno: false,
    };
    this.agregarNuevoUsuario = this.agregarNuevoUsuario.bind(this);
  }

  //metodo para agregar el usuario a la BD
  agregarNuevoUsuario(e) {
    if (
      this.state.nombre ||
      this.state.correo ||
      this.state.contraseña !== ""
    ) {
      {
        new AjaxRequest("Noticias", "agregarUsuario").post({
          nombre: this.state.nombre,
          correo: this.state.correo,
          contraseña: this.state.contraseña,
          es_interno: this.state.personal_interno,
        });
      }
    } else {
      alert("Ingrese los datos requeridos");
      e.preventDefault();
    }
  }
  render() {
    return (
      <Form onSubmit={this.agregarNuevoUsuario}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            value={this.state.nombre}
            onChange={(e) => this.setState({ nombre: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo"
            value={this.state.correo}
            onChange={(e) => this.setState({ correo: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={this.state.contraseña}
            onChange={(e) => this.setState({ contraseña: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Text className="text-muted">
            Marque la casilla si pertenece al personal.
          </Form.Text>
          <Form.Check
            type="checkbox"
            label="Interno"
            checked={this.state.personal_interno}
            onChange={(e) =>
              this.setState({ personal_interno: e.target.checked })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    );
  }
}

export default Formuser;
