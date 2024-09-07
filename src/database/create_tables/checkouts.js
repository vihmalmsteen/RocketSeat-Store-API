const checkouts = `
CREATE TABLE IF NOT EXISTS checkouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    , user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    , created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    , status VARCHAR NOT NULL CHECK(status IN ('Paid', 'WaitingPayment', 'Refunded', 'Chargeback', 'Cancelled'))
    , amount DECIMAL(8,2) NOT NULL
    , payment_method VARCHAR NOT NULL CHECK(payment_method IN ('Pix', 'CreditCard', 'DebitCard', 'bankSlip'))
    , installments INTEGER NOT NULL CHECK(installments IN (1,2,3,4,5,6))
);
`

module.exports = {checkouts}

