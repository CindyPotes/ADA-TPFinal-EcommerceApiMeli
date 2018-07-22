searchService = require('../services/searchService')

let self = {}

//funcion que le pide al service la pegada a api, luego los productos los envia a otra funcion donde van a ser acomodados como lo pide el ejercicio
self.searchProducts = function(req, res){
  let id = req.query.q
  searchService.searching(id).then(function(products){
    const result = searchService.result(products)
    return res.json(result)
  }).catch(function(err) {
    console.log(err)
  }) 	 
};







module.exports = self