const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const {users} = require('./create_tables/users')
const {products} = require('./create_tables/products')
const {category} = require('./create_tables/category')
const {subcategory} = require('./create_tables/subcategory')
const {checkout_items} = require('./create_tables/checkout_items')
const {checkouts} = require('./create_tables/checkouts')


async function sqliteConn () {
    let db = await sqlite.open({
        filename: path.resolve('src','database','storeDB.db'),
        driver: sqlite3.Database,
      })
    await db.run('PRAGMA foreign_keys = OFF;')
    await db.exec([users, products, category, subcategory, checkout_items, checkouts].join(''))
    await db.run('PRAGMA foreign_keys = ON;')

    return db
}

module.exports = {sqliteConn}

