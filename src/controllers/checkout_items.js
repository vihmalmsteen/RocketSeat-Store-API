const {sqliteConn} = require("../database/DBconnection")
const {errorHandler} = require("../utils/errorHandler")


class checkout_items_controller {
    
    async create(req, res) {
        const database = await sqliteConn()
        const {checkout_id} = req.params
        const {product_ids} = req.body


        const foundCheckout = await database.get(`select * from checkouts where id = ?`, [checkout_id])
        if(!foundCheckout) {
            throw new errorHandler("Checkout não encontrado.")
        }


        const uniqueProductIds = [...new Set(product_ids)]
        const foundProducts = await database.all(
            `select id from products where id in (${uniqueProductIds.map(() => '?').join(',')})`,
            uniqueProductIds
        )
        if (foundProducts.length !== uniqueProductIds.length) {
            throw new errorHandler("Um ou mais produtos não estão cadastrados.")
        }


        for (const product_id of product_ids) {
            await database.run(`insert into checkout_items (checkout_id, product_id) values (?,?)`,
                [checkout_id, product_id]
            )
        }
        
        const insertedProducts = await database.all(`select * from checkout_items where checkout_id = ?`, [checkout_id])
        res.json(insertedProducts)
    }


    async read(req, res) {
        const database = await sqliteConn()
        const {checkout_item_id} = req.params
        const foundItem = await database.get(`select * from checkout_items where id = ?`, [checkout_item_id])
        if(!foundItem) {
            throw new errorHandler("Item vendido não encontrado.")
        }
        res.json(foundItem)
    }


    async update(req, res) {
        const database = await sqliteConn()
        const {checkout_item_id} = req.params
        const {checkout_id, product_id} = req.body
        const foundItem = await database.get(`select * from checkout_items where id = ?`, [checkout_item_id])
        if(!foundItem) {
            throw new errorHandler("Item vendido ou pedido não encontrados.")
        }
        const newCheckoutId = await checkout_id ?? foundItem.checkout_id
        const newProductId = await product_id ?? foundItem.product_id
        await database.run(`update checkout_items set checkout_id = ?, product_id = ? where id = ?`,
            [newCheckoutId,newProductId,checkout_item_id]
        )
        res.send(`Produto vendido ${checkout_item_id} atualizado.`)
    }


    async delete(req, res) {
        const database = await sqliteConn()
        const {checkout_item_id} = req.params
        const foundItem = await database.get(`select * from checkout_items where id = ?`, [checkout_item_id])
        if(!foundItem) {
            throw new errorHandler("Item vendido não encontrado.")
        }
        await database.run(`delete from checkout_items where id = ?`, [checkout_item_id])
        res.send(`Item vendido deletado do pedido ${foundItem.checkout_id}.`)
    }
}



module.exports = {checkout_items_controller}