const users = `
CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    , role VARCHAR NOT NULL CHECK(role IN ('admin', 'staff', 'user'))
    , name VARCHAR NOT NULL
    , email VARCHAR NOT NULL
    , password VARCHAR NOT NULL
    , created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`

module.exports = {users}
