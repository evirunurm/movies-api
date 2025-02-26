import express from 'express'
import GlobalRoutes from './routes/routes'
import Injector from "./injector";
require('dotenv').config()

type AppDependencies = {
    injector: Injector
}

export default class App {
    public app: express.Application
    public readonly injector: Injector

    constructor ({injector}: AppDependencies) {
        this.injector = injector
        this.app = express()
        this.initializeMiddlewares()
        this.initializeRoutes()
        this.startServer()
    }

    private initializeMiddlewares() {
        this.app.use(express.json())
    }

    private initializeRoutes() {
        this.app.use('/api', new GlobalRoutes().getRouter())
        this.app.use('/api/movies', this.injector.container.resolve('moviesRoutes').getRouter())
        this.app.use('/api/user', this.injector.container.resolve('usersRoutes').getRouter())
    }

    private startServer() {
        if (process.env.NODE_ENV !== 'test') {
            const { PORT } = process.env
            this.app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
        }
    }
}