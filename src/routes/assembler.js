const routes = require('express').Router()
const {route_users} = require('./users')
const {category_routes} = require('./category')
const {subcategory_routes} = require('./subcategory')


routes.use('/users', route_users)
routes.use('/category', category_routes)
routes.use('/subcategory', subcategory_routes)

module.exports = {routes}

// meu nome é fofinha. O seu é fofuxo. Juntando isso dá oq? Marido
