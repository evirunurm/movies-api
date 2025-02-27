import {PaginatedMoviesView} from "../../domain/paginatedMovies.view";
import {PaginationView} from "../../domain/pagination.view";
import {MoviesRepository} from "../../../favorites/domain/ports/movies.repository";

export type NewReleasesServiceDependencies = {
    moviesRepository: MoviesRepository
}

type NewReleasesGetConfiguration = {
    isAsc?: boolean
    perPage?: number
    page?: number
}

export class NewReleasesService {
    private readonly defaultPerPage: number = 10
    private readonly moviesRepository

    constructor ({moviesRepository}: NewReleasesServiceDependencies) {
        this.moviesRepository = moviesRepository
    }

    async get({isAsc = false, perPage, page = 1}: NewReleasesGetConfiguration): Promise<PaginatedMoviesView> {
        const limit: number = perPage || this.defaultPerPage
        const offset: number = (page - 1) * limit
        const movies = await this.moviesRepository.getNewReleasesPaginated({offset, perPage: limit, isAsc})
        const total = await this.moviesRepository.getCountNewReleases()
        return new PaginatedMoviesView(movies, new PaginationView(total, page, limit))
    }
}
