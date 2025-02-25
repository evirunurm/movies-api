import {MoviesRepository} from "../../../db/repositories/movies/movies.repository";
import {PaginatedMoviesView} from "../../../domain/paginatedMoviesView";
import {PaginationView} from "../../../domain/paginationView";

type NewReleasesGetConfiguration = {
    isAsc?: boolean,
    perPage?: number,
    page?: number
}

export class NewReleasesService {
    private readonly defaultPerPage: number = 10

    constructor (private repository: MoviesRepository) {}

    async get({isAsc, perPage, page = 1}: NewReleasesGetConfiguration): Promise<PaginatedMoviesView> {
        const limit: number = perPage || this.defaultPerPage
        const offset: number = (page - 1) * limit
        const movies = await this.repository.getNewReleasesPaginated({offset, perPage: limit, isAsc})
        const total = await this.repository.getCountNewReleases()
        return new PaginatedMoviesView(movies, new PaginationView(total, page, limit))
    }
}
