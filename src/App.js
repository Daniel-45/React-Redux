import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Componentes
import Productos from './components/Productos'
import NuevoProducto from './components/NuevoProducto'
import EditarProducto from './components/EditarProducto'

// Redux
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          {/* Todo lo que esté fuera del switch se utiliza en todas las páginas */}
          {/* Todo lo que está en el switch dentro del Route se utiliza en cada página */}
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route exact path="/productos/editar/:id" component={EditarProducto} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
