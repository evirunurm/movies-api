import {Request, Response} from 'express';
import {PopularMoviesService} from "../services/popularMovies/popularMovies.service";
import {NewReleasesService} from "../services/newReleases/newReleases.service";
import {TopRatedMoviesService} from "../services/topRatedMovies/topRatedMovies.service";

export class MoviesController {

    constructor(private topRatedMoviesService: TopRatedMoviesService,
        private popularMoviesService: PopularMoviesService,
        private newReleasesService: NewReleasesService) {}

    public async getPopular(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const popularMovies = await this.popularMoviesService.get(limit);
        res.send(popularMovies);
    }

    public async getTopRated(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const topRatedMovies = await this.topRatedMoviesService.get(limit);
        res.send(topRatedMovies);
    }

    public async getNewReleases(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const isAsc: boolean = req.query.order == 'asc'

        const newReleasesMovies = await this.newReleasesService.get(isAsc, limit);
        res.send(newReleasesMovies);
    }
}
