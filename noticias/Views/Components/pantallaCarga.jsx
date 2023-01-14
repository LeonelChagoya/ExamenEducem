'use strict';
const React = require('react');
import {AiOutlineLoading} from 'react-icons/ai';
import '../stylesheet/pantallaCarga.css';

class PantallaCarga extends React.Component{
    render(){
        let mostrarPantalla = "pantalla-cargando";
        
        if (this.props.mostrar) {
            mostrarPantalla += " mostrar";
        }

        return (
            <div className={mostrarPantalla}>
                <AiOutlineLoading className='icono-cargando rotar'/>
            </div>
        );
    }
}

export default PantallaCarga;