import {Database} from "sqlite3";
import Movie from "../../../domain/entity/movie";
import {ElementNotFoundError} from "../../../domain/error/elementNotFoundError";
import {FavoritesRepositoryDependencies, IFavoritesRepository, InsertQuery} from "./ifavories.repository";


export class FavoritesRepository implements IFavoritesRepository {
    private db: Database

    constructor ({dbClient}: FavoritesRepositoryDependencies) {
        this.db = dbClient.getDB()
    }

    insert({movieId, userId}: InsertQuery): Promise<number> {
        const insertQuery = `INSERT INTO favoriteMovies(userId, movieId) VALUES(?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(insertQuery, [userId, movieId], function (error) {
                if (error) {
                    reject(new ElementNotFoundError(`User with id ${userId} or movie with id ${movieId} not found`))
                }
                resolve(this.lastID)
            })
        })
    }

    delete({movieId, userId}: InsertQuery): Promise<void> {
        const deleteQuery = `DELETE FROM favoriteMovies WHERE userId = ? AND movieId = ?`

        return new Promise((resolve, reject) => {
            this.db.run(deleteQuery, [userId, movieId], (error) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve()
            })
        })
    }

    getAllForUser(userId: number): Promise<Movie[]> {
        const selectQuery = `SELECT movies.* FROM movies
            JOIN favoriteMovies ON movies.id = favoriteMovies.movieId
            WHERE favoriteMovies.userId = ?`

        return new Promise((resolve, reject) => {
            this.db.all(selectQuery, [userId], (error, rows: any) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(rows.map(this.mapRowToMovie))
            }
        )})
    }

    // TODO: Separate this method into a separate mapper/utility class
    private mapRowToMovie (row: any): Movie {
        return new Movie(
            row.title,
            new Date(row.release_date),
            row.popularity,
            row.rating,
            row.id
        )
    }
}