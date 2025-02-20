import {Request, Response} from 'express';
import {MoviesService} from "../services/movies.service";

export class MoviesController {

    constructor(
        private service: MoviesService
    ) {}

    public async getPopularMovies(req: Request, res: Response) {
        res.send(await this.service.getPopularMovies());
    }
}
