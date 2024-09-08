const routes = require('express').Router()

const {route_users} = require('./users')
const {category_routes} = require('./category')
const {subcategory_routes} = require('./subcategory')
const {products_routes} = require('./products')
const {checkouts_routes} = require('./checkouts')
const {checkout_items_routes} = require('./checkout_items')


routes.use('/users', route_users)
routes.use('/category', category_routes)
routes.use('/subcategory', subcategory_routes)
routes.use('/products', products_routes)
routes.use('/checkouts', checkouts_routes)
routes.use('/checkout_items', checkout_items_routes)


module.exports = {routes}


