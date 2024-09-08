const {sqliteConn} = require('../database/DBconnection')
const { errorHandler } = require('../utils/errorHandler')



class products_controller {

    async create(req, res){
        const {name, price, stock, subcategory_id} = req.body
        const database = await sqliteConn()
        const foundSubcat = await database.get(`select * from subcategory where id = ?`, [subcategory_id])
        const foundProduct = await database.get(`select * from products where name = ?`, [name])
        if(!foundSubcat) {
            throw new errorHandler('Subcategoria não encontrada.')
        }
        if(!name || !price || !subcategory_id) {
            throw new errorHandler("Dados ausentes.")
        }
        if(foundProduct) {
            throw new errorHandler('Produto já cadastrado.')
        }
        await database.run(`insert into products (name, price, stock, subcategory_id) values (?,?,?,?)`,
            [name, price, stock, subcategory_id]
        )

        res.send(`Produto cadastrado.`)
    }


    async read(req, res){
        const {product_id} = req.params
        const database = await sqliteConn()
        const foundProduct = await database.get('select * from products where id = ?', [product_id])
        if(!foundProduct) {
            throw new errorHandler('Produto não encontrado.')
        }
        res.json(foundProduct)
    }


    async update(req, res){
        const {name,price,stock,sold,subcategory_id} = req.body
        const {product_id} = req.params
        const database = await sqliteConn()
        const foundProduct = await database.get(`select * from products where id = ?`, [product_id])
        if(!foundProduct) {
            throw new errorHandler('Produto não encontrado.')
        }
        const newName = name ?? foundProduct.name
        const newPrice = price ?? foundProduct.price
        const newStock = stock ?? foundProduct.stock
        const newSold = sold ?? foundProduct.sold
        const newSubcategory_id = subcategory_id ?? foundProduct.subcategory_id

        await database.run(`update products set name=?,price=?,stock=?,sold=?,subcategory_id=?,updated_at=datetime() where id=?`,
            [newName,newPrice,newStock,newSold,newSubcategory_id,product_id]
        )
        res.send('Produto atualizado.')
    }


    async delete(req, res){
        const {product_id} = req.params
        const database = await sqliteConn()
        const foundProduct = await database.get(`select * from products where id = ?`, [product_id])
        if(!foundProduct) {
            throw new errorHandler('Produto não encontrado.')
        }
        await database.run(`delete from products where id = ?`,[product_id])
        res.send('Produto deletado.')
    }
}



module.exports = {products_controller}