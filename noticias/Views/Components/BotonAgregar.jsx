'use strict';
const React = require('react');
const ReactDOM = require('react-dom/client');

class BotonAgregar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }

    render(){
        let clases = "btn abrirModal";
        if (this.props.clases !== undefined) {
            clases += " " +  this.props.clases;
        }
        return(
            <button className={clases}
                onClick={() => this.props.abrirModal()}>
                {this.props.texto}
            </button>
        )
    }
}

export default BotonAgregar;