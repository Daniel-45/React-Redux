import { combineReducers } from 'redux';
import productosReducer from './productoReducers';
import alertaReducer from './alertaReducers';

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
})