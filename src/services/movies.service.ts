import {MoviesRepository} from "../db/repositories/movies.repository";
import {MoviesView} from "../domain/moviesView";
import Movie from "../domain/movie";

export class MoviesService {
    private readonly defaultLimit: number = 10

    constructor (private repository: MoviesRepository) {}

    public async getPopularMovies (customLimit: number | null = null): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        return new MoviesView(this.sortLimitedMoviesByPopularity(movies, customLimit || this.defaultLimit))
    }

    private sortLimitedMoviesByPopularity (movies: Movie[], limit: number): Movie[] {
        return movies
            .sort((first, second) => second.popularity - first.popularity)
            .slice(0, limit)
    }
}
