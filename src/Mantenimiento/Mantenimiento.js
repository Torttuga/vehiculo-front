import React from 'react';
import './Mantenimiento.css';

const mantenimiento = ( props ) => {
    return (
        <div className="Mantenimiento-div-table">
            <div className={props.estilo}>
                <div className="Mantenimiento-div-table-col">
                    <img src={props.image}></img>
                </div>
                <div className="Mantenimiento-div-table-col">
                    <p>Id: {props.id}</p>
                    <p>Marca: {props.make}</p>
                    <p>Modelo: {props.model}</p>
                    <p>Atiende: {props.name}</p>
                    <p>Entrega: {props.estimatedate}</p>
                    <p>Asignar a: <input type="text" onChange={props.nameChanged} /></p>
                    <p>Fecha de entrega: <input type="text" onChange={props.dateChanged} /></p>
                    <button onClick={props.click}>Guardar</button>
                </div>
            </div>
        </div>
    )
};

export default mantenimiento;
