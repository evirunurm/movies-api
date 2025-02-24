import express from 'express';
import {MoviesController} from "../controllers/movies.controller";
import {MoviesRepository} from "../db/repositories/movies.repository";
import {DBClient} from "../db/dbClient";
import {TopRatedMoviesService} from "../services/topRatedMovies/topRatedMovies.service";
import {NewReleasesService} from "../services/newReleases/newReleases.service";
import {PopularMoviesService} from "../services/popularMovies/popularMovies.service";

class MoviesRoutes {
    public router = express.Router()
    private db = new DBClient()
    private moviesRepository = new MoviesRepository(this.db.connect())
    private topRatedMoviesService = new TopRatedMoviesService(this.moviesRepository)
    private newReleasesService = new NewReleasesService(this.moviesRepository)
    private popularMoviesService = new PopularMoviesService(this.moviesRepository)
    private moviesController = new MoviesController(this.topRatedMoviesService, this.popularMoviesService, this.newReleasesService)

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