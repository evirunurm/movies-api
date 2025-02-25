import Movie from "../../../domain/movie";
import {Database} from "sqlite3";

export class FavoritesRepository {
    constructor (private dbClient: Database) {}

    insert(movie: Movie): Promise<Movie> {
        return Promise.resolve(movie);
    }
}