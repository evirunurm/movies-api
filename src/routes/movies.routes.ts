import express from 'express';
import {MoviesController} from "../controllers/movies.controller";
import {MoviesService} from "../services/movies.service";
import {MoviesRepository} from "../db/repositories/movies.repository";
import {DBClient} from "../db/dbClient";

class MoviesRoutes {
    public router = express.Router()
    private db = new DBClient()
    private moviesRepository = new MoviesRepository(this.db.connect())
    private moviesService = new MoviesService(this.moviesRepository)
    private moviesController = new MoviesController(this.moviesService)

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get('/popular', this.moviesController.getPopular.bind(this.moviesController))
        this.router.get('/top-rated', this.moviesController.getTopRated.bind(this.moviesController))
        this.router.get('/new-releases', this.moviesController.getNewReleases.bind(this.moviesController))
    }
}

export default new MoviesRoutes().router;