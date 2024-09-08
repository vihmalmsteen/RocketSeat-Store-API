const { sqliteConn } = require("../database/DBconnection")
const { errorHandler } = require("../utils/errorHandler")



class checkouts_controller{


    async create(req, res) {
        const database = await sqliteConn()
        const {user_id, status, amount, payment_method, installments} = req.body
        const foundUser = await database.get(`select * from users where id = ?`, [user_id])
        if(!foundUser) {
            throw new errorHandler('User não encontrado.')
        }
        await database.run(`insert into checkouts (user_id, status, amount, payment_method, installments) values (?,?,?,?,?)`,
            [user_id, status, amount, payment_method, installments]
        )
        res.send('Checkout!')
    }


    async read(req, res) {
        const database = await sqliteConn()
        const {checkout_id} = req.params
        const foundCheckout = await database.get(`select * from checkouts where id = ?`,[checkout_id])
        if(!foundCheckout) {
            throw new errorHandler('Checkout inexistente.')
        }
        res.json(foundCheckout)
    }


    async update(req, res) {
        const database = await sqliteConn()
        const {checkout_id} = req.params
        const {status, amount, payment_method, installments} = req.body
        const foundCheckout = await database.get(`select * from checkouts where id = ?`,[checkout_id])
        if(!foundCheckout) {
            throw new errorHandler('Checkout inexistente.')
        }
        const newStatus = status ?? foundCheckout.status
        const newAmount = amount ?? foundCheckout.amount
        const newPayment_Method = payment_method ?? foundCheckout.payment_method
        const newInstallments = installments ?? foundCheckout.installments

        await database.run(`
            update checkouts 
            set status = ?, amount = ?, payment_method = ?, installments = ?, updated_at = datetime()
            where id = ?`,
            [newStatus, newAmount, newPayment_Method, newInstallments, checkout_id]
        )
        res.send('Checkout atualizado.')
    }


    async delete(req, res) {
        const database = await sqliteConn()
        const {checkout_id} = req.params
        const foundCheckout = await database.get(`select * from checkouts where id = ?`,[checkout_id])
        if(!foundCheckout) {
            throw new errorHandler('Checkout inexistente.')
        }
        await database.run(`delete from checkouts where id = ?`, [checkout_id])
        res.send('Checkout removido.')
    }
}


module.exports = {checkouts_controller}