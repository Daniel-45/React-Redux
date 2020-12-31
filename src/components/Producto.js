import React, { Fragment } from 'react';
import sweetAlert from 'sweetalert2';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { 
    eliminarProductoAction, 
    obtenerProductoEditar 
} from './../actions/productoActions';

const Producto = ({ producto }) => {

    // Extraer propiedades del producto
    const { id, nombre, precio, categoria } = producto;

    // Para poder ejecutar las actions
    const dispatch = useDispatch();

    // Para poder redireccionar
    const history = useHistory(); // Habilitar history para redirección

    // Confirmar si se quiere eliminar
    const confirmarEliminarProducto = id => {
        // Pedir confirmación al usuario

        sweetAlert.fire({
            title: '¿Estás seguro?',
            text: "Si eliminas el producto no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Ejecutar el action
                dispatch(eliminarProductoAction(id));
            }
        })
    }

    // Función para redirecciona
    const redireccionarEditarProducto = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <Fragment>
            <div className="card col-8 m-auto p-4">
                <p>
                    <span className="font-weight-bold">Identificador: </span>
                    {id}
                </p>
                <p>
                    <span className="font-weight-bold">Categoría: </span>
                    {categoria}
                </p>
                <p>
                    <span className="font-weight-bold">Precio: </span>
                    {precio}€
                </p>
                <p>
                    <span className="font-weight-bold">Nombre: </span>
                    {nombre}
                </p>
                <div className="d-flex">
                    <button 
                        type="button"
                        onClick={() => redireccionarEditarProducto(producto)}
                        className="btn btn-primary mr-1"
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => confirmarEliminarProducto(id)}
                    >
                        Eliminar
                </button>
                </div>
            </div>
            <br />
        </Fragment>
    );
}

export default Producto;