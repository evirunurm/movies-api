import {Request, Response} from 'express';
import {RatingService} from "../application/rating/rating.service";
import {PopularityService} from "../application/popularity/popularity.service";
import {NewReleasesService} from "../application/newReleases/newReleases.service";

type MoviesControllerDependencies = {
    ratingService: RatingService,
    popularMoviesService: PopularityService,
    newReleasesService: NewReleasesService
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
        const {isAsc, perPage, page} = this.getNewReleasesParams(req)
        const newReleasesMovies = await this.newReleasesService.get({isAsc, perPage, page})
        res.send(newReleasesMovies)
    }

    private getNewReleasesParams(req: Request) {
        const isAsc = req.query.order == 'asc'
        const page = req.query.page ? parseInt(req.query.page as string) : 1
        const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : undefined
        return {isAsc, perPage, page}
    }
}
