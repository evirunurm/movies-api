import express from 'express';

export default class GlobalRoutes {
    private router = express.Router()

    constructor () {
        this.initializeRoutes()
    }

    public getRouter() {
        return this.router
    }

    private initializeRoutes() {
        this.router.get('/', (_req: express.Request, res: express.Response) => {
            res.send('Welcome to the movies API ✨')
        })
    }
}