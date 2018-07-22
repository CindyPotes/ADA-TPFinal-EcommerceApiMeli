import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import './search.css';
import Logo from '../images/logo.png'
import Lupa from '../images/lupa.png'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textoValue: '',
      arr: []
    }
  }

  handleChange(e) {
    const value = e.target.value    
    this.setState({
      textoValue: value
    })
  }

  handleClick() {
    const inputValue = this.state.textoValue
    const arr = this.state.arr
    arr.push(inputValue)
    this.setState({
      arr: arr,
      textoValue: ''
    })
  }



  render() {
    const url = '/items?search=' + this.state.textoValue
    return (
      <div className='contenedor-input'>
        <div className="input">
          <div className='contenedor-logo'>
            <img className='logo' src={Logo}/>
          </div>
          <div className='contenedor-form'>
            <form>
              <input className='texto-busqueda' onChange={this.handleChange.bind(this)} type="text" value={this.state.textoValue} />
                <Link to={url}>
                  <button className='contenedor-buscar'>
                  <img className="buscar" src={Lupa} onClick={this.handleClick.bind(this)}/>
                  </button>
                </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;