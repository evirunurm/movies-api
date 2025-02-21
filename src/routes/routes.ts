import express from 'express';

class GlobalRoutes {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', (req: express.Request, res: express.Response) => {
            res.send('Welcome to the movies API ✨');
        });
    }
}

export default new GlobalRoutes().router;