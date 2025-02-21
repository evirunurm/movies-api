import {MoviesRepository} from "../db/repositories/movies.repository";
import {MoviesView} from "../domain/moviesView";
import Movie from "../domain/movie";
import {PaginatedMoviesView} from "../domain/paginatedMoviesView";
import {PaginationView} from "../domain/paginationView";

export class MoviesService {
    private readonly defaultLimit: number = 10

    constructor (private repository: MoviesRepository) {}

    async getPopular(limit: number | null = null): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        const sortedMovies = this.sortByProperty(movies, 'popularity')
        return new MoviesView(
            sortedMovies.slice(0, limit || this.defaultLimit)
        )
    }

    async getTopRated(limit: number | null = null): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        const sortedMovies = this.sortByProperty(movies, 'rating')
        return new MoviesView(
            sortedMovies.slice(0, limit || this.defaultLimit)
        )
    }

    async getNewReleases(isAsc = false): Promise<PaginatedMoviesView> {
        const movies = await this.repository.getMovies()
        const newReleases = movies.filter(movie => movie.releaseDate > new Date())
        const sortedMovies = this.sortByProperty(newReleases, 'releaseDate', isAsc)
        return new PaginatedMoviesView(sortedMovies, new PaginationView(0, 0, 0))
    }

    private sortByProperty(movies: Movie[], property: string, isAsc = false): Movie[] {
        // @ts-ignore
        return movies.sort((first, second) => isAsc ? first[property] - second[property] : second[property] - first[property])
    }
}
