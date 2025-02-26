import {PaginatedMoviesView} from "../../../domain/view/paginatedMovies.view";
import {PaginationView} from "../../../domain/view/pagination.view";
import {INewReleasesService, NewReleasesGetConfiguration, NewReleasesServiceDependencies} from "./inewReleases.service";

export class NewReleasesService implements INewReleasesService {
    private readonly defaultPerPage: number = 10
    private readonly moviesRepository

    constructor ({moviesRepository}: NewReleasesServiceDependencies) {
        this.moviesRepository = moviesRepository
    }

    async get({isAsc, perPage, page = 1}: NewReleasesGetConfiguration): Promise<PaginatedMoviesView> {
        const limit: number = perPage || this.defaultPerPage
        const offset: number = (page - 1) * limit
        const movies = await this.moviesRepository.getNewReleasesPaginated({offset, perPage: limit, isAsc})
        const total = await this.moviesRepository.getCountNewReleases()
        return new PaginatedMoviesView(movies, new PaginationView(total, page, limit))
    }
}
