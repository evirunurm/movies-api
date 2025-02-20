import express from 'express';
import {MoviesController} from "../controllers/movies.controller";
import {MoviesService} from "../services/movies.service";
import {MoviesRepository} from "../services/movies.repository";

const moviesRepository = new MoviesRepository();
const moviesService = new MoviesService(moviesRepository);
const moviesController = new MoviesController(moviesService);

const router = express.Router();
router.get('/popular', moviesController.getPopularMovies);

export default router;