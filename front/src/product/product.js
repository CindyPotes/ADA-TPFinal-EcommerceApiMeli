import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import './product.css';

class Product extends Component{
 constructor(props){
 super(props)
 }

  render(){
    const url = '/items/' + this.props.id
    return(
        <div className = 'contenedor-producto'>
          <div className = 'producto'>
            <div className = 'img'>
              <img src={this.props.picture} alt="Celular"/>
            </div>
            <div className = 'contenedor-texto'>
              <div className= 'texto'>
              <p className = 'titulo'>{this.props.title}</p>
              </div>
              <div className = 'texto precio'>
                <p className = 'entero'>$ {this.props.price}</p>
                <p className = 'decimal'>.{this.props.decimals}</p>
              </div>  
            </div>
            <div className = 'boton'>
            <Link to={url}><button className = 'ver'>Ver Producto</button></Link>
            </div>
          </div>
        </div>
    )
  }
}

export default Product