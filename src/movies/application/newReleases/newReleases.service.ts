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

    async get({isAsc = false, perPage: givenPerPage, page = 1}: NewReleasesGetConfiguration): Promise<PaginatedMoviesView> {
        const perPage: number = givenPerPage || this.defaultPerPage
        const offset: number = (page - 1) * perPage
        const movies = await this.moviesRepository.getNewReleasesPaginated({offset, perPage: perPage, isAsc})
        const total = await this.moviesRepository.getCountNewReleases()
        return new PaginatedMoviesView(movies, new PaginationView(total, page, perPage))
    }
}
