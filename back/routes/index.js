var express = require('express');
var router = express.Router();
let productsController = require('../controllers/productsController')
let searchController = require('../controllers/searchController')

/* GET home page. */
router.get('/api/items', searchController.searchProducts)
router.get('/api/items/:id', productsController.description) 

module.exports = router;
