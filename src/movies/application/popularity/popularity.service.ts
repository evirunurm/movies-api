import {MoviesRepository} from "../../../favorites/domain/ports/movies.repository";
import MoviesList from "../../domain/models/moviesList";
import {PaginatedMoviesView} from "../../domain/paginatedMovies.view";

export type PopularityServiceDependencies = {
    moviesRepository: MoviesRepository
}

export class PopularityService {
    private readonly defaultLimit: number = 10
    private readonly moviesRepository

    constructor ({moviesRepository}: PopularityServiceDependencies) {
        this.moviesRepository = moviesRepository
    }

    async get(limit: number | undefined = undefined): Promise<PaginatedMoviesView> {
        const moviesList = new MoviesList(await this.moviesRepository.getAll())
        moviesList.sortByProperty('popularity')
        moviesList.limit(limit || this.defaultLimit)
        const total = await this.moviesRepository.getCountMovies()
        return new PaginatedMoviesView(moviesList.getMovies(), {
            page: 0,
            perPage: limit ?? this.defaultLimit,
            total: total
        })
    }
}
