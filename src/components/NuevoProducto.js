import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// Actions de Redux
import { crearNuevoProductoAction } from './../actions/productoActions';
import { mostrarAlertaAction, ocultarAlertaAction } from './../actions/alertaActions';

const NuevoProducto = ({ history }) => {

    // State
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState('');
    const [categoria, guardarCategoria] = useState('');

    // Dispatch se utiliza para ejecutar las actions
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    // Llamar el action de productoAction
    const insertarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

    // Cuando el usuario hace submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // Validar formulario
        if (nombre.trim() === '' || precio <= 0 || categoria.trim() === '') {

            const alerta = {
                message: 'Todos los campos son obligatorios',
                classes: 'alert alert-danger text-center p-3'
            }

            dispatch(mostrarAlertaAction(alerta));

            return;
        }

        // Si no hay errores
        dispatch(ocultarAlertaAction());

        // Crear nuevo producto
        insertarProducto({
            nombre,
            precio,
            categoria
        });

        // Redireccionar a la pantalla de inicio
        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 m-4 p-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">
                            NUEVO PRODUCTO
                        </h2>
                        {cargando
                            ? <p className="alert p-2 text-center">
                                Cargando...
                      </p>
                            : null}
                        {error
                            ? <p className="alert alert-danger p-2 text-center">
                                Error al insertar el producto
                      </p>
                            : null}
                        {alerta ? <p className={alerta.classes}>{alerta.message}</p> : null}
                        <hr />
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio del producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Categoría</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Categoría del producto"
                                    name="categoria"
                                    value={categoria}
                                    onChange={e => guardarCategoria(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary d-block w-100 text-uppercase"
                            >
                                Añadir Producto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;