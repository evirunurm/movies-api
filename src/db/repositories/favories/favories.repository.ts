import {Database} from "sqlite3";
import Movie from "../../../domain/entity/movie";
import {DBClient} from "../../dbClient";
import {ElementNotFoundError} from "../../../domain/error/elementNotFoundError";

type FavoritesRepositoryDependencies = {
    dbClient: DBClient
}

type InsertQuery = {
    movieId: number
    userId: number
}

export class FavoritesRepository {
    private db: Database

    constructor ({dbClient}: FavoritesRepositoryDependencies) {
        this.db = dbClient.getDB()
    }

    insert({movieId, userId}: InsertQuery): Promise<number> {
        const insertQuery = `INSERT INTO favoriteMovies(userId, movieId) VALUES(?, ?)`

        return new Promise((resolve, reject) => {
            // In the callback, 'this' object will contain a property lastID, which contain the value of the last inserted row ID.
            // So, we must use an old-school function () { ... } style callback rather than a lambda function,
            // otherwise this.lastID and this.changes will be undefined.
            // Because lambda functions do not have their own this, they inherit the context from the parent scope.
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