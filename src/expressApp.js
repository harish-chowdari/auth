const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/AuthRoutes')
const cartRoutes = require('./routes/cartRoutes')


module.exports = () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use('/', authRoutes)
    app.use('/', cartRoutes)

    app.get('/', (req, res) => {
        res.send('Auth Service is running')
    })

    return app
}
