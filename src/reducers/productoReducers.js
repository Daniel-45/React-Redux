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

// Cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: false,
    loading: false,
    eliminarProducto: null,
    editarProducto: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case INSERTAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }
        case INSERTAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case INSERTAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case INICIO_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                eliminarProducto: action.payload
            }
        case ELIMINAR_PRODUCTO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.eliminarProducto),
                eliminarProducto: null
            }
        case ELIMINAR_PRODUCTO_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                editarProducto: action.payload
            }
        case EDITAR_PRODUCTO_EXITO:
            return {
                ...state,
                editarProducto: null,
                productos: state.productos.map(producto => 
                        producto.id === action.payload.id 
                        ? producto = action.payload
                        : producto
                )
            }
        case EDITAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}