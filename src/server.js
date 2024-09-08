require('express-async-errors')
const express = require('express')
const {routes} = require('./routes/assembler')

const port = 3000

const app = express().use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    res.send(`<h4>Welcome to store API!</h4>
              Routes:<br>
              /users<br>
              /category<br>
              /subcategory<br>
              /products<br>
              /checkouts<br>
              /checkout_items<br><br>
              All with CRUD statements.
              `)
})

app.listen(port, () => {
    const mainResponse = `Server listening to port ${port}`
    console.log(mainResponse)
})

