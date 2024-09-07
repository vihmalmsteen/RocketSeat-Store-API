const products = `
CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    , name VARCHAR NOT NULL
    , price DECIMAL(8,2) NOT NULL
    , stock INTEGER
    , sold INTEGER 
    , subcategory_id INTEGER REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
    , created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`

module.exports = {products}

