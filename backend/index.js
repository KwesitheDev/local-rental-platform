const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')

const startServer = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`)
        })
    } catch (error) {
        console.log('error connecting to MongoDB', error.message)
        process.exit(1).then(() => {
            console.log('Server closed')
        })    
    }
}

startServer()