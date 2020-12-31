import React, { Fragment, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from './../actions/productoActions';

// Componentes
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Consultar la API
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
    }, [dispatch]);

    // Obtener el state
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error)
    const cargando = useSelector(state => state.productos.loading)

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado Productos</h2>
            {cargando ?
                <p className="alert alert-success text-center col-8 m-auto">
                    Cargando los productos...
                </p>
                : null}
            {error ?
                <p className="alert alert-danger text-center col-8 m-auto">
                    Lo sentimos, se ha producido un error
                </p>
                : null}
            { productos.length === 0 ? 
                <p className="col-8 m-auto p-2">No hay productos</p>
                : productos.map(producto => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                    />
                ))}
        </Fragment>
    );
}

export default Productos;