import {Request, Response} from 'express';
import {MoviesService} from "../services/movies.service";
import {MoviesView} from "../domain/moviesView";
import Movie from "../domain/movie";

export class MoviesController {

    constructor(
        private service: MoviesService
    ) {}

    getPopularMovies(req: Request, res: Response) {
        const movies = new MoviesView()
        movies.results = [
            new Movie('The Shawshank Redemption', new Date('2019-05-12'), 9.3),
            new Movie('The Godfather', new Date('2019-05-12'), 9.2),
            new Movie('The Dark Knight', new Date('2019-05-12'), 9.0),
        ]
        res.send(movies);
    }
}
