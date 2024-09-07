const { sqliteConn } = require("../database/DBconnection");
const { errorHandler } = require("../utils/errorHandler");


class category_controller {
    

    async create(req, res) {
        const {category} = req.body
        const database = await sqliteConn()
        const foundCategory = await database.get(`select * from category where category  = ?`, [category])
        if(foundCategory) {
            throw new errorHandler("Categoria já cadastrada.")
        }
        await database.run(`insert into category (category) values (?)`, [category])
        res.send('Categoria cadastrada.')
    }


    async read(req, res) {
        const {category_id} = req.params
        const database = await sqliteConn()
        const foundCategory = await database.get(`select * from category where id = ?`, [category_id])
        if(!foundCategory) {
            throw new errorHandler("Categoria não encontrada.")
        }
        res.json(foundCategory)
    }


    async update(req, res) {
        const {category_id} = req.params
        const {category} = req.body
        const database = await sqliteConn()
        const foundCategoryId = await database.get(`select * from category where id = ?`, [category_id])
        const foundCategory = await database.get(`select * from category where category = ?`, [category])
        if(!foundCategoryId) {
            throw new errorHandler("Categoria não encontrada.")
        }
        if(foundCategory && foundCategory.id != category_id) {
            throw new errorHandler("Categoria já existe.")
        }
        await database.run(`update category set category = ? where id = ?`, [category, category_id])
        res.send('Categoria atualizada.')
    }


    async delete(req, res) {
        const {category_id} = req.params
        const database = await sqliteConn()
        const foundCategory = await database.get(`select * from category where id = ?`,[category_id])
        if(!foundCategory) {
            throw new errorHandler("Categoria não encontrada.")
        }
        await database.run(`delete from category where id = ?`,[category_id])
        res.send('Categoria deletada.')
    }
}


module.exports = {category_controller}