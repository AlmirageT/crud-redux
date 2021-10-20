import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

//redux
import { useDispatch } from 'react-redux'; 
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {

    const { nombreProducto, precioProducto, id } = producto;
    const dispatch = useDispatch();
    const history = useHistory(); // habilitar history para redireccion

    //confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //preguntar al usuario
        Swal.fire({
            title: 'Estas seguro de eliminar el registro?',
            text: "Al eliminarlo no sera reversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al action
                dispatch(borrarProductoAction(id));
            }
        })

    }

    //funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/productos/editar/${producto.id}`);
    }

    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    return ( 
        <tr>
            <td><span className="font-weight-bold">{nombreProducto}</span></td>
            <td>{formatterPeso.format(precioProducto)}</td>
            <td className="acciones">
                <button type="button" 
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2"
                >Editar</button>
                <button className="btn btn-danger" 
                    type="button"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;