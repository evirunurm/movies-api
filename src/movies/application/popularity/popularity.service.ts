import {MoviesView} from "../../domain/movies.view";
import {MoviesRepository} from "../../../favorites/domain/ports/movies.repository";
import MoviesList from "../../domain/models/moviesList";

export type PopularityServiceDependencies = {
    moviesRepository: MoviesRepository
}

export class PopularityService {
    private readonly defaultLimit: number = 10
    private readonly moviesRepository

    constructor ({moviesRepository}: PopularityServiceDependencies) {
        this.moviesRepository = moviesRepository
    }

    async get(limit: number | undefined = undefined): Promise<MoviesView> {
        const moviesList = new MoviesList(await this.moviesRepository.getAll())
        moviesList.sortByProperty('popularity')
        moviesList.limit(limit || this.defaultLimit)
        return new MoviesView(moviesList.getMovies())
    }
}
