const category_routes = require('express').Router()
const {category_controller} = require('../controllers/category')

const categoryController = new category_controller()

category_routes.post('/create', categoryController.create)
category_routes.get('/read/:category_id', categoryController.read)
category_routes.put('/update/:category_id', categoryController.update)
category_routes.delete('/delete/:category_id', categoryController.delete)


module.exports = {category_routes}