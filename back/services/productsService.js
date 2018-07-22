var restler = require('restler')

let self = {}

//funcion en la que se le pide a la api de meli la data de determinado producto
self.searching = function(id){ 
  let product = new Promise(function(resolve, reject){ 
    restler.get('https://api.mercadolibre.com/items/' + id).on('complete', function(result) {
    resolve(result);
    }).on('fail', function(err) {
      reject(err)
    })
  })  
  return product
}

//funcion en la que se le pide a la api de meli la data de la descripcion del producto
self.description = function(id){ 
  let description = new Promise(function(resolve, reject){ 
    restler.get('https://api.mercadolibre.com/items/' + id + '/description' ).on('complete', function(result) {
    resolve(result);
    }).on('fail', function(err) {
      reject(err)
    })
  })  
  return description
}

//funcion en la que se arma el producto con la data de la api de meli como lo pide el ejercicio
self.product = function(data){
  let productoNew = {}
  
  productoNew['author'] = {
    name: 'Cindy',
    lastname: 'Potes'
  }

  let amount 
  let decimals 
  let precio = data.price.toString() 

  //armado de numero entero (precio)
  if (precio.indexOf('.') > -1) {
    amount = parseInt(precio.slice(0, precio.indexOf('.')))
  } else {
    amount = parseInt(precio)
  }

  //armado del decimal (precio)
  if (precio.indexOf('.') > -1) {
    decimals = parseInt(precio.slice(precio.indexOf('.')+1))
  } else {
    decimals = 0
  }

  productoNew['item'] = {
    id: data.id,
    title: data.title,
    price: {
      currency: data.currency_id,
      amount: amount,
      decimals: decimals
    },
    picture: data.thumbnail,
    condition: data.condition,
    free_shipping: data.shipping.free_shipping,
    sold_quantity: data.sold_quantity,
    description: data.description.plain_text
  }
  
  return productoNew
}

module.exports = self