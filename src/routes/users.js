const {user_controllers} = require('../controllers/users')
const route_users = require('express').Router()

const userControllers = new user_controllers()

route_users.post('/create', userControllers.create)
route_users.get('/read/:user_id', userControllers.read)
route_users.put('/update/:user_id', userControllers.update)
route_users.delete('/delete/:user_id', userControllers.delete)

module.exports = {route_users}

