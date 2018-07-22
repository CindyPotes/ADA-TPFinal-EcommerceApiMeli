import React, { Component } from 'react';
import './descripcion.css';
//import { BrowserRouter as Route, Link } from "react-router-dom";

//import Producto from '../producto/producto'
import Search from '../search/search'

class descripcion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      producto: [],
      searchId: ''
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch('http://localhost:3000/api/items/' + id).then((result) => { 
      return result.json()
    }).then((result) => {
      console.log(result);
      this.setState({
        producto: result,
        searchId: id
      })
    })
  }

  render() {   
    
    return (
      <div>
        <Search />
        <div>
          {this.state.producto && this.state.producto.item &&
            <React.Fragment>
              <div className='contenedor'>
                <div className = 'contenedor-descripcion'>
                  <div className = 'descripcion'>
                    <div className = 'top'>
                      <div className= 'imagen-descripcion'>
                        <img className = 'imagen' src={this.state.producto.item.picture} alt=""/>
                      </div>
                      <div className= 'texto-descripcion'>
                        {this.state.producto.item.condition == 'new' ? <p>Nuevo</p>:<p>Usado</p>}               
                        <p className = 'titulo'>{this.state.producto.item.title}</p>
                        <div className = 'precio'>
                          <p className = 'entero'>${this.state.producto.item.price.amount}</p>
                          <p className = 'decimal'>.{this.state.producto.item.price.decimals}</p>
                        </div>
                      </div>
                    </div>
                    <div className='titulo-descripcion'>
                      <h1> Descripción del Producto</h1>
                    </div>
                    <div className = 'contenedor-parrafo'>
                      <p>{this.state.producto.item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

export default descripcion;