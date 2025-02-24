import {MoviesRepository} from "../../db/repositories/movies.repository";
import {PaginatedMoviesView} from "../../domain/paginatedMoviesView";
import {PaginationView} from "../../domain/paginationView";

export class NewReleasesService {
    private readonly defaultLimit: number = 10

    constructor (private repository: MoviesRepository) {}

    async get(isAsc = false, limit = 10): Promise<PaginatedMoviesView> {
        const defLimit = limit || this.defaultLimit
        const movies = await this.repository.getNewReleasesPaginated(0, defLimit, isAsc)
        return new PaginatedMoviesView(movies, new PaginationView(0, 1, defLimit))
    }
}
