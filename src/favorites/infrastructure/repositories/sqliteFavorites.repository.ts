import {Database} from "sqlite3";
import Movie from "../../../movies/domain/models/movie";
import {ElementNotFoundError} from "../../domain/elementNotFoundError";
import {FavoritesRepository} from "../../../movies/domain/ports/favorites.repository";
import FavoriteMovies from "../../domain/models/favoriteMovies";
import {SqliteDBClient} from "../../../shared/infrastructure/sqlite/sqliteDBClient";
import {MovieMapper} from "../../../shared/infrastructure/movieMapper";

export type SqliteFavoritesRepositoryDependencies = {
    dbClient: SqliteDBClient
}

export class SqliteFavoritesRepository implements FavoritesRepository {
    private db: Database

    constructor ({dbClient}: SqliteFavoritesRepositoryDependencies) {
        this.db = dbClient.getDB()
    }

    insert({movieId, userId}: FavoriteMovies): Promise<number> {
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

    delete({movieId, userId}: FavoriteMovies): Promise<void> {
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
                resolve(rows.map(MovieMapper.RowToMovie))
            }
        )})
    }
}