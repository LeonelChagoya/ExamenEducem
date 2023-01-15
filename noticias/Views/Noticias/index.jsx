"use strict";
const React = require("react");
const ReactDOM = require("react-dom/client");
import Swal from "sweetalert2";
import PantallaCarga from "../Components/pantallaCarga";
import {
  AiOutlineAppstoreAdd,
  AiOutlineQuestion,
  AiOutlineSearch,
} from "react-icons/ai";
import NavbarComponent from "../Components/NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import AgregarUsuario from "../Components/ModalUsuario";

export default class NoticiasMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    //     this.obtenerCategorias();
  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <AgregarUsuario/>
      </div>
    );
  }
}

function init() {
  const main = document.getElementsByTagName("main")[0];
  const root = ReactDOM.createRoot(main);
  root.render(<NoticiasMain />);
}

init();
