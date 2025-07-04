const dotenv = require('dotenv')
const expressApp = require('./expressApp')
const { databaseConnection } = require('./database')

dotenv.config()

const startServer = async () => {
    await databaseConnection()

    const app = expressApp()

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Auth Service running on port ${PORT}`)
    })
}

startServer()
