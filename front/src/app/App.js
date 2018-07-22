import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Busqueda from '../busqueda/busqueda'
import Descripcion from '../descripcion/descripcion'
import Search from '../search/search'

class App extends Component {
  render() {
    return (
      <Router>
        <div> 
          <Route exact path="/items" component={Busqueda} />
          <Route exact path="/items/:id" component={Descripcion} />
          <Route exact path="/" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
