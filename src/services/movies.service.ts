import {MoviesRepository} from "../db/repositories/movies.repository";
import {MoviesView} from "../domain/moviesView";
import Movie from "../domain/movie";

export class MoviesService {
    private readonly defaultLimit: number = 10

    constructor (private repository: MoviesRepository) {}

    public async getPopular(customLimit: number | null = null): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        const sortedMovies = this.sortByProperty(movies, 'popularity')
        return new MoviesView(
            sortedMovies.slice(0, customLimit || this.defaultLimit)
        )
    }

    public async getTopRated(customLimit: number | null = null): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        const sortedMovies = this.sortByProperty(movies, 'rating')
        return new MoviesView(
            sortedMovies.slice(0, customLimit || this.defaultLimit)
        )
    }

    private sortByProperty(movies: Movie[], property: string): Movie[] {
        // @ts-ignore
        return movies.sort((first, second) => second[property] - first[property])
    }
}
