import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

//crear nuevos producros
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());
        try {
            //insertar en la apí
            await clienteAxios.post('/productos',producto);
            //si todo sale bien se actualiza el state
            dispatch(agregarProductoExito(producto));
            //alerta
            Swal.fire({
                title: 'Exito!',
                text: 'Producto agregado con exito',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.log(error);
            //si hay un error
            dispatch(agregarProductoError(true));
            //alerta error
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error, intentalo nuevamente',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}
//submit del producxto
const agregarProducto = () =>({
    type: AGREGAR_PRODUCTO
});
//si el producto se agrego en la bd
const agregarProductoExito = (producto) =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});
// si el producto no se agrego y hubo un error
const agregarProductoError = (estado) =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//FUNCION PARA LEER LOS PRODUCTOS DE LA BD
export function obtenerProductoAction (){
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargarProductosExito(respuesta.data));
        } catch (error) {
            console.log(error);
            //si hay un error
            dispatch(descargarProductosError(true));
            //alerta error
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error, intentalo nuevamente',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}
const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
});
const descargarProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});
const descargarProductosError = (estado) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
});

//SELECCIONA Y ELIMINA UN PRODUCTO
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(productoEliminadoExito());
            //si se elimina mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success'
            );
        } catch (error) {
            console.log(error);
            //si hay un error
            dispatch(productoEliminadoError(true));
            //alerta error
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error, intentalo nuevamente',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}
const obtenerProductoEliminar = id =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
const productoEliminadoExito = () =>({
    type: PRODUCTO_ELIMINADO_EXITO
});
const productoEliminadoError = estado =>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: estado
});

//COLOCAR producto en edicion
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) );
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

//EDITAR UN REGISTRO EN LA API Y EN EL STATE
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto());
        try {
            await clienteAxios.put(`/productos/${producto.id}`,producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            console.log(error);
            //si hay un error
            dispatch(productoEditadoError(true));

            //alerta error
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error, intentalo nuevamente',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}
const editarProducto = () =>({
    type:COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const productoEditadoError = estado =>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: estado
});