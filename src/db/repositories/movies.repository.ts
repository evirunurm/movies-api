import Movie from "../../domain/movie";
import {Database} from "sqlite3";

export class MoviesRepository {
    constructor (private dbClient: Database) {}

    public async getMovies (): Promise<Movie[]> {
        const query = 'SELECT * FROM movies';
        return new Promise((resolve, reject) => {
            this.dbClient.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const movies = rows
                        .map(row => {
                            const movieRow = row as Movie;
                            return new Movie(
                                    movieRow.title,
                                    new Date(movieRow.releaseDate),
                                    movieRow.popularity)
                        });
                    resolve(movies);
                }
            });
        });
    }
}