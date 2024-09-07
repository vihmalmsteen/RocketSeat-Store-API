const category = `
CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    , category VARCHAR NOT NULL
);
`

module.exports = {category}

