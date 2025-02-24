import {Request, Response} from 'express';
import {MoviesService} from "../services/movies.service";

export class MoviesController {

    constructor(private service: MoviesService) {}

    public async getPopular(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const popularMovies = await this.service.getPopular(limit);
        res.send(popularMovies);
    }

    public async getTopRated(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const topRatedMovies = await this.service.getTopRated(limit);
        res.send(topRatedMovies);
    }

    public async getNewReleases(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const isAsc: boolean = req.query.order == 'asc'

        const newReleasesMovies = await this.service.getNewReleases(isAsc, limit);
        res.send(newReleasesMovies);
    }
}
