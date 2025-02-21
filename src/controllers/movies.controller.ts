import {Request, Response} from 'express';
import {MoviesService} from "../services/movies.service";
import {MoviesView} from "../domain/moviesView";

export class MoviesController {

    constructor(private service: MoviesService) {}

    public async getPopularMovies(req: Request, res: Response) {
        const limit: number | null  = req.query.limit ? parseInt(req.query.limit as string) : null
        const popularMovies = await this.service.getPopularMovies(limit);
        res.send(popularMovies);
    }
}
