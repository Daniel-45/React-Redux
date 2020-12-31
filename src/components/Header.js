import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar bg-dark justify-content-between p-3">
            <h2>
                <Link to={"/"} className="text-decoration-none text-white">
                    React - Redux
                    </Link>
            </h2>
            <Link to={"/productos/nuevo"}
                className="btn btn-primary d-block d-md-inline-block"
            >
                <i className="fas fa-plus-square"></i> Nuevo Producto
            </Link>
        </nav>
    );
}

export default Header;