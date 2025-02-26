import Movie from "../../../domain/entity/movie";
import {Database} from "sqlite3";
import {IMoviesRepository, MoviesRepositoryDependencies, NewReleasesQuery,} from "./imovies.repository";

export class MoviesRepository implements IMoviesRepository {
    private db: Database

    constructor ({dbClient}: MoviesRepositoryDependencies ) {
        this.db = dbClient.getDB()
    }

    public async getAll (): Promise<Movie[]> {
        const query = 'SELECT * FROM movies'

        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows: any) => {
                if (err) {
                    reject(err)
                    return
            }
                resolve(rows.map(this.mapRowToMovie))
            })
        })
    }

    public async getNewReleasesPaginated ({
      offset = 0,
      perPage = 10,
      isAsc = false
    }: NewReleasesQuery): Promise<Movie[]> {
        const movies: Movie[] = []
        const query = `SELECT * FROM movies 
                        WHERE julianday(release_date) > julianday('now') 
                        ORDER BY release_date ${isAsc ? 'ASC' : 'DESC'}
                        LIMIT ${offset}, ${perPage}`

        return new Promise((resolve, reject) => {
            this.db.each(query, (_, rows: any) => {
                movies.push(this.mapRowToMovie(rows))
            }, (error, _count) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(movies)
            })
        })
    }

    public async getCountNewReleases (): Promise<number> {
        const query = `SELECT COUNT(*) as count FROM movies WHERE julianday(release_date) > julianday('now')`

        return new Promise((resolve, reject) => {
            this.db.get(query, (err, row: any) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(row.count)
            })
        })
    }

    // TODO: Separate this method into a separate mapper/utility class
    private mapRowToMovie (row: any): Movie {
        return new Movie(
            row.title,
            new Date(row.release_date),
            row.popularity,
            row.id
        )
    }
}