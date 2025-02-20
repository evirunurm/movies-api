import express from 'express'
import movieRoutes from './routes'

const app = express()

const PORT = 3000

app.use(express.json())

app.use('/api', movieRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app