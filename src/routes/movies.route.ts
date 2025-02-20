import express from 'express';
const router = express.Router();
import {MoviesController} from "../controllers/movies.controller";
import {MoviesService} from "../services/movies.service";
import {MoviesRepository} from "../services/movies.repository";

const moviesRepository = new MoviesRepository();
const moviesService = new MoviesService(moviesRepository);
const moviesController = new MoviesController(moviesService);

/* GET programming languages. */
router.get('/popular', moviesController.getPopularMovies);

export default router;