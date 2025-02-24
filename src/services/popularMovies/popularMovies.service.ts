import {MoviesRepository} from "../../db/repositories/movies.repository";
import {MoviesView} from "../../domain/moviesView";
import Movie from "../../domain/movie";

export class PopularMoviesService {
    private readonly defaultLimit: number = 10

    constructor (private repository: MoviesRepository) {}

    async get(limit: number | undefined = undefined): Promise<MoviesView> {
        const movies = await this.repository.getAll()
        const sortedMovies = this.sortByProperty(movies, 'popularity')
        return new MoviesView(
            sortedMovies.slice(0, limit || this.defaultLimit)
        )
    }

    private sortByProperty(movies: Movie[], property: string, isAsc = false): Movie[] {
        // @ts-ignore
        return movies.sort((first, second) => isAsc ? first[property] - second[property] : second[property] - first[property])
    }
}
