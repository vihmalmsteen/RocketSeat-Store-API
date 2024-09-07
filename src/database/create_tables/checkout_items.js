const checkout_items = `
CREATE TABLE IF NOT EXISTS checkout_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    , checkout_id INTEGER REFERENCES checkouts(id) ON DELETE CASCADE ON UPDATE CASCADE
    , product_id INTEGER REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);
`

module.exports = {checkout_items}
