var restler = require('restler')

let self = {}

//funcion el la que se le piede la data de 4 productos a la api de meli (promesa)
self.searching = function(id){ 
  let products = new Promise(function(resolve, reject){ 
    restler.get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + id).on('complete', function(result) {
    resolve(result);
    }).on('fail', function(err) {
      reject(err)
    })
  })  
  return products
}

//funcion en la que se organiza la informacion que viene de la api de meli como lo pide el ejercicio
self.result = function(data){
  let resultNew = {}
  let categories = []
  let items = []

  resultNew['author'] = {
    name: 'Cindy',
    lastname: 'Potes'
  }

  //armado de las categorias
  if ( data.filters.length > 0) {
    let category = data.filters[0].values[0].path_from_root
    for (let i = 0; i < category.length; i++) {
      categories.push(category[i].name)
    }
  }else{
    let filters = data.available_filters[0].values
    let maxObj = {
      name: '',
      results: 0
    }
    for (let i = 0; i< filters.length; i++) {
      if (maxObj.results < filters[i].results) {
        maxObj = {
          name: filters[i].name,
          results: filters[i].results
        }        
      } 
    }
    categories.push(maxObj.name) 
  }
  resultNew['categories'] = categories

  //armado de los items
  let results = data.results
  let amount 
  let decimals 
  for (let i = 0; i < results.length; i++) {

    let price = results[i].price.toString() 

    //armado de numero entero (precio)
    if (price.indexOf('.') > -1) {
      amount = parseInt(price.slice(0, price.indexOf('.')))
    } else {
      amount = parseInt(price)
    }

    //armado del decimal (precio)
    if (price.indexOf('.') > -1) {
      decimals = parseInt(price.slice(price.indexOf('.')+1))
    } else {
      decimals = 0
    }
    
    items.push({id: results[i].id,
                title: results[i].title,
                price: {currency: results[i].currency_id,
                        amount: amount,
                        decimals: decimals},
                picture: results[i].thumbnail,
                condition: results[i].condition,
                free_shipping: results[i].shipping.free_shipping})
  }

  resultNew['items'] = items
  
  return resultNew
}

module.exports = self