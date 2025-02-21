import {MoviesRepository} from "../db/repositories/movies.repository";
import {MoviesView} from "../domain/moviesView";
import Movie from "../domain/movie";

export class MoviesService {
    private readonly defaultLimit: number = 10

    constructor (private repository: MoviesRepository) {}

    public async getPopular (customLimit: number | null = null): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        return new MoviesView(this.sortByPopularityLimiting(movies, customLimit || this.defaultLimit))
    }

    public async getTopRated (customLimit: number | null = null): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        return new MoviesView(this.sortByRatingimiting(movies, customLimit || this.defaultLimit))
    }

    private sortByPopularityLimiting (movies: Movie[], limit: number): Movie[] {
        return movies
            .sort((first, second) => second.popularity - first.popularity)
            .slice(0, limit)
    }

    private sortByRatingimiting (movies: Movie[], limit: number): Movie[] {
        return movies
            .sort((first, second) => second.rating - first.rating)
            .slice(0, limit)
    }
}
