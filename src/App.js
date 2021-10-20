import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto'

//redux
import { Provider } from 'react-redux';
import store from './store';

//lo que este en el switch es lo que mostarar dependiendo de la url
//lo que este afuera del switch lo cargara para todas las paginas

function App() {

  

  return (
    <Router>
      <Provider store={store}>
        <Header/>
        <div className="container mt-5">
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
