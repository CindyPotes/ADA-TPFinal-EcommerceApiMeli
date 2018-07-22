productsService = require('../services/productsService')

let self = {}

//funcion en la que se le pide al service la pegada a la api de meli, se convina el resultado y se le envia la data product para armar el resultado como lo pide el ejercicio
self.description = function(req, res){
  let id = req.params.id
  productsService.searching(id).then(function(product){
    productsService.description(id).then(function(description){
      product.description = description
      const productNew = productsService.product(product)
      return res.json(productNew)
    })
  }).catch(function(err) {
    console.log(err)
  }) 	 
};


module.exports = self