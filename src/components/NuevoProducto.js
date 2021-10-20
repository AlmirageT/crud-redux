import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

//si los componentes estan en el react router dom se tiene acceso a una variable llamada history
const NuevoProducto = ({history}) => {

    // state del componente, se puede usar usestate porque no se pasara a otros componentes
    const [ nombreProducto, guardarNombre ] = useState('');
    const [ precioProducto, guardarPrecio ] = useState(0);

    // utilizar useDispatch y te crea o devuelve una funcion
    const dispatch = useDispatch();

    //acceder al state del store
    const cargando = useSelector( (state) => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);
    //mandar llamar el action de productoAction
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    //cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //validar formulario
        if(nombreProducto.trim() === '' || precioProducto <= 0){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }

        //si no hay errores
        dispatch(ocultarAlertaAction());
        //crear el nuevo producto
        agregarProducto({
            nombreProducto,
            precioProducto
        });
        //redireccion
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombreProducto"
                                    value={nombreProducto}
                                    onChange={e => guardarNombre(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number" 
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precioProducto"
                                    value={precioProducto}
                                    onChange={e => guardarPrecio(Number(e.target.value))}/>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"
                            >
                                    Agregar
                            </button>
                        </form>
                        { cargando ? <p>Cargando...</p> : null}
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;