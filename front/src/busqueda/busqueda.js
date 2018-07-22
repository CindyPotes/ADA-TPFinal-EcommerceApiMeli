import React, { Component } from 'react';
import queryString from "query-string"
//import { BrowserRouter as Route, Link } from "react-router-dom";

import Product from '../product/product'
import Search from '../search/search'

class Looking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      searchId: ''
    }
  }

  componentDidMount() {
    let id = queryString.parse(this.props.location.search);
    fetch('http://localhost:3000/api/items?q=' + id.search).then((result) => { 
      return result.json()
    }).then((result) => {
      this.setState({
        products: result,
        searchId: id
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    let id = queryString.parse(nextProps.location.search);
    let newId = id.search;
    if(newId !== this.state.searchId) {      
      fetch('http://localhost:3000/api/items?q=' + newId).then((result) => { 
        return result.json()
      }).then((result) => {     
        this.setState({
          products: result,
          searchId: newId 
        })        
      })
    }
  }

  render() {    
    return (
      <div>
        <Search />
        {this.state.products && this.state.products.items && 
          <React.Fragment>
            {this.state.products.items.map((product, i) =>{
              return(
                <Product 
                id={product.id} 
                title={product.title} 
                price={product.price.amount}
                decimals={product.price.decimals} 
                picture={product.picture}
                />
              )
            })}   
          </React.Fragment>
        }      
      </div>
    );
  }
}

export default Looking;