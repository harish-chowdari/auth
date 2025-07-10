const dotenv = require('dotenv')
const expressApp = require('./expressApp')
const { databaseConnection } = require('./database')
const { PORT } = require('./config/constants')

dotenv.config()

const startServer = async () => {
    await databaseConnection()

    const app = expressApp()

    const port = PORT || 5000
    app.listen(port, () => {
        console.log(`Auth Service running on port ${port}`)
    })
}

startServer()
