import {
    INSERTAR_PRODUCTO,
    INSERTAR_PRODUCTO_EXITO,
    INSERTAR_PRODUCTO_ERROR,
    INICIO_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR
} from '../types'

import sweetAlert from 'sweetalert2';
import clienteAxios from './../config/axios';

// Crear nuevos productos
// Función que se utiliza en la vista
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        // console.log(producto);
        dispatch(insertarProducto()); 

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si no hay error se actualiza el state
            dispatch(insertarProductoExito(producto));

            // Alerta producto insertardo correctamente
            sweetAlert.fire(
                'Correcto',
                'El producto se ha insertado correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            // Si hay un error cambiar el state
            dispatch(insertarProductoError(true));

            // Alerta error al insertar un producto
            sweetAlert.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al insertar el producto'
            })
        }
    }
}

const insertarProducto = () => ({
    type: INSERTAR_PRODUCTO,
    payload: true
});

// Si el producto se guarda en base de datos
const insertarProductoExito = (producto) => ({
    type: INSERTAR_PRODUCTO_EXITO,
    payload: producto // Payload modifica el state
});

const insertarProductoError = (estado) => ({
    type: INSERTAR_PRODUCTO_ERROR,
    payload: estado // Payload modifica el state
});

// Descargar productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const resultado = await clienteAxios.get('/productos');
            // console.log(resultado.data);
            dispatch(descargaProductosExito(resultado.data));
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: INICIO_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = (productos) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// Selecciona y elimina un producto
export function eliminarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        // console.log(id);
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            // Si se elimina el producto mostrar la alerta
            sweetAlert.fire(
                'Eliminado',
                'El producto se ha eliminado correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = ()  => ({
    type: ELIMINAR_PRODUCTO_EXITO
});

const eliminarProductoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
});

// Cargar producto a editar
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

// Editar un registro en la API y el State
export function editarProductoAction(producto) {
    return async (dispatch) => {
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError())
        }
    }
}

const editarProductoExito = producto => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
});
