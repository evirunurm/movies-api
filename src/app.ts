import express from 'express';
import movieRoutes from './routes/movies.route';
import globalRoutes from './routes/routes';

class App {
    public app: express.Application;
    private readonly PORT: number = 3000;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.startServer();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeRoutes() {
        this.app.use('/api/movies', movieRoutes);
        this.app.use('/api', globalRoutes);
    }

    private startServer() {
        if (process.env.NODE_ENV !== 'test') {
            this.app.listen(this.PORT, () => console.log(`Listening on port ${this.PORT}`));
        }
    }
}

export default new App().app;