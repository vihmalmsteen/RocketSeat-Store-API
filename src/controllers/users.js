const {sqliteConn} = require('../database/DBconnection')
const {hash, compare} = require('bcryptjs')
const {errorHandler} = require('../utils/errorHandler')



class user_controllers {

    async create(req, res) {
        const {role, name, email, password} = req.body
        const hashedPassword = await hash(password, 8)
        const database = await sqliteConn()

        const otherUser = await database.get(`select * from users where email = ?`, [email])
        if(otherUser) {
            throw new errorHandler("Email em uso.")
        }
        await database.run(`insert into users (role, name, email, password) values (?,?,?,?)`, 
            [role,name,email,hashedPassword])
        res.send('User criado.')
    }


    async read(req, res) {
        const {user_id} = req.params
        const database = await sqliteConn()
        const user = await database.get(`select * from users where id = ?`, [user_id])
        if(!user) {
            throw new Error("User não encontrado.")
        }
        res.json(user)
    }


    async update(req, res) {
        const {user_id} = req.params
        const {name,email,password} = req.body
        const database = await sqliteConn()
        const foundUser = await database.get(`select * from users where id = ?`, [user_id])
        const passCompare = await compare(password, foundUser.password)
        if(!passCompare) {
            throw new errorHandler("Senha inválida.")
        }
        const newPass = await hash(password,8)
        await database.run(`update users set name=?,email=?,password=?,updated_at=datetime() where id = ?`,
            [name,email,newPass,user_id])
        res.send('User atualizado.')
    }


    async delete(req, res) {
        const {user_id} = req.params
        const {email, password} = req.body
        const database = await sqliteConn()
        const foundUser = await database.get(`select * from users where id = ? and email = ?`, [user_id, email])
        if(!foundUser) {
            throw new errorHandler("User não encontrado.")
        }
        
        const passCompare = await compare(password, foundUser.password)
        if(!passCompare) {
            throw new errorHandler("Senha inválida.")            
        }
        await database.run(`delete from users where id = ?`, [user_id])
        res.send('User deletado.')
    }


}



module.exports = {user_controllers}