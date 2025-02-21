import {Request, Response} from 'express';
import {MoviesService} from "../services/movies.service";

export class MoviesController {

    constructor(private service: MoviesService) {}

    public async getPopular(req: Request, res: Response) {
        const limit: number | null  = req.query.limit ? parseInt(req.query.limit as string) : null
        const popularMovies = await this.service.getPopular(limit);
        res.send(popularMovies);
    }

    public async getTopRated(req: Request, res: Response) {
        const limit: number | null  = req.query.limit ? parseInt(req.query.limit as string) : null
        const topRatedMovies = await this.service.getTopRated(limit);
        res.send(topRatedMovies);
    }
}
