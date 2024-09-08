const products_routes = require('express').Router()
const {products_controller} = require('../controllers/products')

const productsController = new products_controller()

products_routes.post('/create', productsController.create)
products_routes.get('/read/:product_id', productsController.read)
products_routes.put('/update/:product_id', productsController.update)
products_routes.delete('/delete/:product_id', productsController.delete)

module.exports = {products_routes}

