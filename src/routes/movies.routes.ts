import express from 'express';
import {MoviesController} from "../controllers/movies.controller";

type MoviesRoutesDependencies = {
    moviesController: MoviesController
}

export default class MoviesRoutes {
    private router = express.Router()
    private readonly moviesController

    constructor({moviesController}: MoviesRoutesDependencies) {
        this.moviesController = moviesController
        this.initializeRoutes()
    }

    private getRouter() {
        return this.router
    }

    private initializeRoutes() {
        this.router.get('/popular', this.moviesController.getPopular.bind(this.moviesController))
        this.router.get('/top-rated', this.moviesController.getTopRated.bind(this.moviesController))
        this.router.get('/new-releases', this.moviesController.getNewReleases.bind(this.moviesController))
    }
}