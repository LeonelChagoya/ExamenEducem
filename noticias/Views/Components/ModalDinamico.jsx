'use strict';
const React = require('react');
import '../stylesheet/ModalDinamico.css';
import Autocomplete from './autocomplete';

class ModalDinamico extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tituloModal: this.props.titulo,
            subtituloModal: this.props.subtitulo,
            inputs: this.props.inputs !== undefined ? this.props.inputs : [],
        };    
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    generarInputs(){
        let inputsHtml = "";
        let contadorInputs = 1;

        inputsHtml = this.state.inputs.map((campo) => {
            
            //Definimos nombres e inicializamos variable de input
            let inputhtml = "";
            let labelTexto = campo.label;
            let inputNombre = campo.nombre;
            let inputTipo = campo.tipo;
            let opciones = campo.opciones;

            switch (inputTipo) {
                case "text":
                case "number":
                case "password":
                    inputhtml = <div key={"input-contenedor-"+contadorInputs} className='contenedorInput'>
                        <label htmlFor={inputNombre}>{labelTexto}</label>
                        <input key={"input"+inputNombre} type={inputTipo} id={inputNombre} name={inputNombre} />
                    </div>
                    break;

                case "textarea":
                    inputhtml = <div key={"textarea-contenedor-"+contadorInputs} className='contenedorInput'> 
                        <label htmlFor={inputNombre}>{labelTexto}</label>
                        <textarea key={"textarea"+inputNombre} id={inputNombre} name={inputNombre} rows="5" cols="50"/>
                    </div>
                    break;

                case "radio":
                    let radioBotones = opciones.map((opcion) => {
                        return <div key={"btnRadioInput-"+opcion.valor} className='btnRadio'>
                            <input key={"radio-"+opcion.valor} type="radio" id={opcion.valor} name={inputNombre} value={opcion.valor}/>
                            <label htmlFor={opcion.valor}>{opcion.label}</label>
                        </div>
                    });
                    inputhtml = <div key={"radios-contenedor-"+contadorInputs} className='contenedorInput'>
                        <label>{labelTexto}</label>
                        {radioBotones}
                    </div>
                    break; 

                case "select":
                    let selectInputOpciones = opciones.map((opcion) => {
                        return <option key={opcion.label} value={opcion.valor}>{opcion.label}</option>
                    });

                    inputhtml = <div key={"select-contenedor-"+contadorInputs} className='contenedorInput'>
                        <label htmlFor={inputNombre}>{labelTexto}</label>
                        <select key={"select-"+inputNombre} name={inputNombre} id={inputNombre}>
                            {selectInputOpciones}
                        </select>
                    </div>
                    break;

                case "checkbox":
                    let checkboxes = opciones.map((opcion) => {
                        return <div key={"contenedor"+opcion.nombre}>
                            <input key={opcion.nombre} type="checkbox" id={"cbox-"+opcion.nombre} name={opcion.nombre} value={opcion.valor} />
                            <label key={opcion.nombre+"label"}>{opcion.label}</label> 
                        </div>
                    });
                
                    inputhtml = <div key={"checkbox-contenedor-"+contadorInputs} className='contenedorInput'>
                        {checkboxes}
                    </div>
                    break;
                
                case "autocomplete":
                    let autocomplete = <Autocomplete idInputNombre={inputNombre} suggestions={opciones} persiste={true}/>
                    inputhtml = <div key={"autocomplete-contenedor-"+contadorInputs} className='contenedorInput'>
                        <label key={inputNombre+"label"}>{labelTexto}</label>
                        {autocomplete}
                    </div>
                    break;
            
                default:
                    break;
            }

            contadorInputs++;

            return (inputhtml);
            
        });

        return inputsHtml;
    }

    handleSubmit(){
        let data;
        let form = document.getElementById("formulario-modal");
        
        //Valida que sea un formulario
        if (!form || form.nodeName !== "FORM") {
            return;
        }

        let i, j, q = [];

        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            //Si el elemento no tiene nombre, omitimos
            if (form.elements[i].name === "") {
                continue;
            }


            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            q[form.elements[i].name] = form.elements[i].value;
                        }
                        break;
                    }
                    break;
                case 'file':
                    //Nada por ahora
                    break;
                case 'TEXTAREA':
                    q[form.elements[i].name] = form.elements[i].value;
                    break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                    case 'select-one':
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                q[form.elements[i].name] = form.elements[i].options[j].value;
                            }
                        }
                        break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                    }
                    break;
            }
        }
        data = q;
        
        if (this.props.enviar !== undefined) {
            this.props.enviar(data);
        }
    }

    render(){
    
        const statusModalClass = this.props.mostrar ? "" : "ocultar";
        const tituloModal = this.state.tituloModal;
        const subtituloModal = this.state.subtituloModal;
        const inputsHtml = this.generarInputs();
        const cerrarModal = this.props.funcionMostrar;

        return(
            <div className={"modal " + statusModalClass} >
                <section className='modal-main'>
                    <div>
                        <div className='modal-header'>
                            <p className='titulo'>{tituloModal}</p>
                            <p className='subtitulo'>{subtituloModal}</p>
                        </div>

                        <div className='modal-body'>
                            <form key={"formulario-modal"} id="formulario-modal">
                                {inputsHtml}
                            </form>
                        </div>
                        
                        <div className='modal-footer'>
                            <button onClick={cerrarModal} className="btn cerrar">Cerrar</button>
                            <button type="submit" className="btn enviar" onClick={this.handleSubmit}>Agregar</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ModalDinamico;