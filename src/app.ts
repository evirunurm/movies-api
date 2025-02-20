import express from 'express'
import movieRoutes from './routes'

const app = express()

const PORT = 3000

app.use(express.json())

app.use('/api', movieRoutes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

export default app