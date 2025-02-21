import Movie from "../../domain/movie";
import {Database} from "sqlite3";

export class MoviesRepository {
    constructor (private dbClient: Database) {}

    public async getPopularMovies (limit: number = 10): Promise<Movie[]> {
        const query = 'SELECT * FROM movies ORDER BY popularity LIMIT ?';

        return new Promise((resolve, reject) => {
            this.dbClient.all(query, [limit], (err, rows: any) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(rows.map(this.mapRowToMovie))
            });
        });
    }

    private mapRowToMovie (row: any): Movie {
        return new Movie(
            row.title,
            new Date(row.releaseDate),
            row.popularity
        );
    }
}