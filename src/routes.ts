import express from 'express'
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Welcome to the movie API')
});

router.get('/movies', (req: express.Request, res: express.Response) => {
    res.send('A list of all movies')
});

export default router