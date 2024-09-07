const subcategory = `
CREATE TABLE IF NOT EXISTS subcategory (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    , subcategory VARCHAR NOT NULL
    , category_id INTEGER REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);
`

module.exports = {subcategory}
