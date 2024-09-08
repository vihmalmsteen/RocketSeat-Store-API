const checkout_items_routes = require('express').Router()
const {checkout_items_controller} = require('../controllers/checkout_items')


const checkout_itemsController = new checkout_items_controller()


checkout_items_routes.post('/create/:checkout_id', checkout_itemsController.create)
checkout_items_routes.get('/read/:checkout_item_id', checkout_itemsController.read)
checkout_items_routes.put('/update/:checkout_item_id', checkout_itemsController.update)
checkout_items_routes.delete('/delete/:checkout_item_id', checkout_itemsController.delete)


module.exports = {checkout_items_routes}