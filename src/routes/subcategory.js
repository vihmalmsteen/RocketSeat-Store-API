const { subcategory_controller } = require('../controllers/subcategory')
const subcategory_routes = require('express').Router()

const subcategoryController = new subcategory_controller()

subcategory_routes.post('/create',subcategoryController.create)
subcategory_routes.get('/read/:subcategory_id',subcategoryController.read)
subcategory_routes.put('/update/:subcategory_id',subcategoryController.update)
subcategory_routes.delete('/delete/:subcategory_id',subcategoryController.delete)


module.exports = {subcategory_routes}

