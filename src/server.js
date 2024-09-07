require('express-async-errors')
const express = require('express')
const {sqliteConn} = require('./database/DBconnection')
const {routes} = require('./routes/assembler')
const {errorHandler} = require('./utils/errorHandler')


sqliteConn()

const port = 3000

const app = express().use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    res.send(`Welcome to store API!<br>
              More routes on the way!`)
})

app.listen(port, () => {
    const mainResponse = `Server listening to port ${port}`
    console.log(mainResponse)
})

