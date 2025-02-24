import Movie from "../../domain/movie";
import {Database} from "sqlite3";

export class MoviesRepository {
    constructor (private dbClient: Database) {}

    public async getAll (): Promise<Movie[]> {
        // Important thing to take into account:
        // Retrieving all rows from the database could potentially be a serious performance issue
        // Using the method "dbClient.all" does not allow to use the LIMIT clause, nor the ORDER BY clause.
        // That's why this must be done in memory, or using "dbClient.each" to process the rows one by one
        const query = 'SELECT * FROM movies';

        return new Promise((resolve, reject) => {
            this.dbClient.all(query, (err, rows: any) => {
                if (err) {
                    reject(err)
                    return
            }
                resolve(rows.map(this.mapRowToMovie))
            });
        });
    }

    public async getNewReleasesPaginated (offset: number = 0, limit: number = 10, isAsc: boolean = false): Promise<Movie[]> {
        const movies: Movie[] = []
        const query = `SELECT * FROM movies 
                        WHERE julianday(release_date) > julianday('now') 
                        ORDER BY release_date ${isAsc ? 'ASC' : 'DESC'}
                        LIMIT ${offset}, ${limit}`;

        return new Promise((resolve, reject) => {
            this.dbClient.each(query, (_, rows: any) => {
                movies.push(this.mapRowToMovie(rows))
            }, (error, _count) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(movies)
            });
        });
    }

    private mapRowToMovie (row: any): Movie {
        return new Movie(
            row.title,
            new Date(row.release_date),
            row.popularity
        );
    }
}