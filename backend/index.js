import app from './app.js'
import mongoose from 'mongoose'
import config from './utils/config.js'

const startServer = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log('Connected to MongoDB')

        app.listen(config.PORT, () => {
            console.log(`Server running on ${config.PORT}`)
        })
        
    } catch (error) {
        console.error('Failed to start server', error.message)
        process.exit(1)
   }
}

startServer()