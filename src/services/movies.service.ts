import {MoviesRepository} from "../db/repositories/movies.repository";
import {MoviesView} from "../domain/moviesView";

export class MoviesService {
    constructor (private repository: MoviesRepository) {}

    public async getPopularMovies (): Promise<MoviesView> {
        const movies = await this.repository.getMovies()
        const sortedMovies = movies.sort((first, second) => second.popularity - first.popularity)
        return new MoviesView(sortedMovies)
    }
}
