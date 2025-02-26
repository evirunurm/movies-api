import {Request, Response} from 'express';
import {PopularityService} from "../services/movies/popularity/popularity.service";
import {RatingService} from "../services/movies/rating/rating.service";
import {INewReleasesService} from "../services/movies/newReleases/newReleases.service.types";

type MoviesControllerDependencies = {
    ratingService: RatingService,
    popularMoviesService: PopularityService,
    newReleasesService: INewReleasesService
}

export class MoviesController {
    private readonly ratingService
    private readonly popularMoviesService
    private readonly newReleasesService

    constructor ({
        ratingService,
        popularMoviesService,
        newReleasesService
    }: MoviesControllerDependencies) {
        this.ratingService = ratingService
        this.popularMoviesService = popularMoviesService
        this.newReleasesService = newReleasesService
    }

    public async getPopular(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const popularMovies = await this.popularMoviesService.get(limit)
        res.send(popularMovies)
    }

    public async getTopRated(req: Request, res: Response) {
        const limit: number | undefined  = req.query.limit ? parseInt(req.query.limit as string) : undefined
        const topRatedMovies = await this.ratingService.get(limit)
        res.send(topRatedMovies)
    }

    public async getNewReleases(req: Request, res: Response) {
        const isAsc = req.query.order == 'asc'
        const page = req.query.page ? parseInt(req.query.page as string) : 1
        const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : undefined

        const newReleasesMovies = await this.newReleasesService.get({isAsc, perPage, page})
        res.send(newReleasesMovies)
    }
}
