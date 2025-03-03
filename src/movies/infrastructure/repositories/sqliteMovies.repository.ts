import Movie from "../../domain/models/movie";
import {Database} from "sqlite3";
import {MoviesRepository, NewReleasesQuery,} from "../../../favorites/domain/ports/movies.repository";
import {SqliteDBClient} from "../../../app/infrastructure/sqlite/sqliteDBClient";
import {MovieMapper} from "../../../shared/infrastructure/movieMapper";

export type SqliteMoviesRepositoryDependencies = {
    dbClient: SqliteDBClient
}

export class SqliteMoviesRepository implements MoviesRepository {
    private db: Database

    constructor ({dbClient}: SqliteMoviesRepositoryDependencies ) {
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
                resolve(rows.map(MovieMapper.RowToMovie))
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
                movies.push(MovieMapper.RowToMovie(rows))
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
}