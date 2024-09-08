const checkouts_routes = require('express').Router()
const {checkouts_controller} = require('../controllers/checkouts')

const checkoutsController = new checkouts_controller()

checkouts_routes.post('/create', checkoutsController.create)
checkouts_routes.get('/read/:checkout_id', checkoutsController.read)
checkouts_routes.put('/update/:checkout_id', checkoutsController.update)
checkouts_routes.delete('/delete/:checkout_id', checkoutsController.delete)


module.exports = {checkouts_routes}