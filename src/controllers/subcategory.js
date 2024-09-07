const { sqliteConn } = require("../database/DBconnection")
const { errorHandler } = require("../utils/errorHandler")


class subcategory_controller {

    async create(req, res) {
        const {category_id, subcategory} = req.body
        const database = await sqliteConn()
        const foundCategory = await database.get(`select * from category where id = ?`,[category_id])
        const foundSubcategory = await database.get(`select * from subcategory where subcategory = ?`,[subcategory])
        if(!foundCategory) {
            throw new errorHandler('Categoria inexistente.')
        }
        if(foundSubcategory) {
            throw new errorHandler('Subcategoria já existe.')
        }
        await database.run(`insert into subcategory (subcategory, category_id) values (?,?)`, [subcategory, category_id])
        res.send('Subcategoria criada.')
    }


    async read(req, res) {
        const {subcategory_id} = req.params
        const database = await sqliteConn()
        const foundSubcategory = await database.get(`select * from subcategory where id = ?`,[subcategory_id])
        if(!foundSubcategory) {
            throw new errorHandler('Subcategoria não encontrada.')
        }
        res.json(foundSubcategory)
    }


    async update(req, res) {
        const {subcategory_id} = req.params
        const {subcategory, category_id} = req.body
        const database = await sqliteConn()
        const foundSubcategoryId = await database.get(`select * from subcategory where id = ?`, [subcategory_id])
        const foundSubcategory = await database.get(`select * from subcategory where subcategory = ?`, [subcategory])
        const foundcategoryId = await database.get(`select * from category where id = ?`, [category_id])
        if(!foundSubcategoryId) {
            throw new errorHandler('Subcategoria não encontrada.')
        }
        if(foundSubcategory && foundSubcategory.id != subcategory_id) {
            throw new errorHandler("Categoria já cadastrada.")
        }
        if(!foundcategoryId) {
            throw new errorHandler('Categoria informada não existe.')
        }
        await database.run(`update subcategory set subcategory = ?, category_id = ? where id = ?`,
            [subcategory,category_id,subcategory_id])
        res.send('Subcategoria atualizada.')
    }


    async delete(req, res) {
        const {subcategory_id} = req.params
        const database = await sqliteConn()
        console.log('jsdvfjs')
        const foundSubcategory = await database.get(`select * from subcategory where id = ?`,[subcategory_id])
        if(!foundSubcategory) {
            throw new errorHandler('Subcategoria não encontrada.')
        }
        await database.run(`delete from subcategory where id = ?`,[subcategory_id])
        res.send('Subcategoria deletada.')
    }
}


module.exports = {subcategory_controller}


