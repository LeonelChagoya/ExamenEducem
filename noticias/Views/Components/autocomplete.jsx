import React, { useState } from "react";
import '../stylesheet/autocomplete.css';

const Autocomplete = (props) => {

    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [input, setInput] = useState("");
    const [idInput, setIdInput] = useState("");

    const { funcion } = props;
    const { persiste } = props; //Indica si borrar el texto al seleccionar una opción o no
    const { idInputNombre } = props //Indica el nombre para el campo de input

    const onChange = e => {
        const { suggestions } = props;
        const input = e.currentTarget.value;
        const newFilteredSuggestions = suggestions.filter(
            suggestion => suggestion.texto.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
        setActive(0);
        setFiltered(newFilteredSuggestions);
        setIsShow(true);
        setInput(e.currentTarget.value);
    };

    const onClick = e => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);

        if (persiste === undefined) {
            setInput("");    
        }else{
            setInput(e.currentTarget.innerText);
        }
        
        setIdInput(e.currentTarget.id);

        if (funcion !== undefined) {
            funcion(e.currentTarget.id,e.currentTarget.innerText);
        }
    };

    const onKeyDown = e => {
        switch (e.keyCode) {
            case 13: //Tecla enter, ha seleccionado con enter el elemento que se encontraba activo, ocultamos las opciones e insertamos la opcion elegida                
                setActive(0);
                setIsShow(false);
                
                if (persiste === undefined) {
                    setInput("");    
                }

                if (filtered[active] !== undefined && filtered[active] !== "") {
                    
                    let seleccionado = filtered[active];
                    
                    if(persiste !== undefined){
                        setInput(seleccionado.texto);
                    }

                    setIdInput(seleccionado.id);

                    if (funcion !== undefined) {
                        funcion(seleccionado.id, seleccionado.texto);
                    }
                    
                }
                break;
            case 38: //Boton flecha arriba, si el elemento activo es el primero no avanza (null) y en caso contrario, marca activo el anterior
                return (active === 0) ? null : setActive(active - 1);
                break;
            case 40: //Boton flecha abajo, si el elemento activo es el ultimo, no avanza (null) y en caso contrario, marca activo el siguiente
                return (active === filtered.length - 1) ? null : setActive(active + 1);
                break;
            default:
                break
        }
    };

    const renderAutocomplete = () => {
        if (isShow && input) {
            if (filtered.length) {
                return (
                    <ul className="autocomplete">
                        {filtered.map((suggestion, index) => {
                            let className;
                            if (index === active) {
                                className = "active";
                            }
                            return (
                                <li id={suggestion.id} className={className} key={suggestion.id} onClick={onClick}>
                                    {suggestion.texto}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className="no-autocomplete">
                        <em>No se encontraron resultados</em>
                    </div>
                );
            }
        }
        return <></>;
    }

    let nombreIdInput = idInputNombre !== undefined ? idInputNombre : "idAutocomplete";

    return (
        <>
            <div className="container-autocomplete">
                <input
                    type="text"
                    placeholder={"Escribe y selecciona"}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={input}
                />
                <input 
                    name={nombreIdInput}
                    type="hidden"
                    value={idInput}
                />
                {renderAutocomplete()}
            </div>
        </>
    );
}
export default Autocomplete;