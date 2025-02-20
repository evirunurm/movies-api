import Movie from "../../domain/movie";
import {MoviesRepository} from "./movies.repository";

export class MoviesController {

    constructor (private repository: MoviesRepository) {}

    public async getPopularMovies (): Promise<Movie[]> {
        const movies = await this.repository.getMovies()
        return movies.sort((first, second) =>
            second.popularity - first.popularity)
    }
}
