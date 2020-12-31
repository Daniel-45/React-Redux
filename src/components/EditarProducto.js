import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { editarProductoAction} from './../actions/productoActions'
import { useHistory }  from 'react-router-dom';

const EditarProducto = () => {

    // Redirección
    const history = useHistory();

    // Para ejecutar las actions
    const dispatch = useDispatch();

    // Nuevo state de producto
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: '',
        categoria: ''
    });

    const { nombre, precio, categoria } = producto;

    // Producto para editar
    const productoEditar = useSelector(state => state.productos.editarProducto);

    // Llenar el state
    useEffect(() => {
        guardarProducto(productoEditar)
    }, [productoEditar]);

    // Leer los datos del formulario
    const onChangeFormulario = e => {

         // Parsear el value si viene del campo precio
         const value = ( e.target.name === 'precio' ) 
         ? Number( e.target.value ) 
         : e.target.value;

        guardarProducto ({
            ...producto,
            [e.target.name]: value
        })
    }

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch(editarProductoAction(producto));

        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8 m-4 p-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">
                            Editar Producto
                        </h2>
                        <hr/>
                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary d-block w-100 text-uppercase"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;