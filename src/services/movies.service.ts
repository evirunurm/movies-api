import {MoviesRepository} from "../db/repositories/movies.repository";
import {MoviesView} from "../domain/moviesView";
import Movie from "../domain/movie";
import {PaginatedMoviesView} from "../domain/paginatedMoviesView";
import {PaginationView} from "../domain/paginationView";

export class MoviesService {
    private readonly defaultLimit: number = 10

    constructor (private repository: MoviesRepository) {}

    async getPopular(limit: number | undefined = undefined): Promise<MoviesView> {
        const movies = await this.repository.getAll()
        const sortedMovies = this.sortByProperty(movies, 'popularity')
        return new MoviesView(
            sortedMovies.slice(0, limit || this.defaultLimit)
        )
    }

    async getTopRated(limit: number | undefined = undefined): Promise<MoviesView> {
        const movies = await this.repository.getAll()
        const sortedMovies = this.sortByProperty(movies, 'rating')
        return new MoviesView(
            sortedMovies.slice(0, limit || this.defaultLimit)
        )
    }

    async getNewReleases(isAsc = false, limit = 10): Promise<PaginatedMoviesView> {
        const defLimit = limit || this.defaultLimit
        const movies = await this.repository.getNewReleasesPaginated(0, defLimit, isAsc)
        return new PaginatedMoviesView(movies, new PaginationView(0, 1, defLimit))
    }

    private sortByProperty(movies: Movie[], property: string, isAsc = false): Movie[] {
        // @ts-ignore
        return movies.sort((first, second) => isAsc ? first[property] - second[property] : second[property] - first[property])
    }
}
