import {Database} from "sqlite3";

type InsertQuery = {
    movieId: number
    userId: number
}

export class FavoritesRepository {
    constructor (private dbClient: Database) {}

    insert({movieId, userId}: InsertQuery): Promise<number> {
        const insertQuery = `INSERT INTO favoriteMovies(userId, movieId) VALUES(?, ?)`

        return new Promise((resolve, reject) => {
            // In the callback, 'this' object will contain a property lastID, which contain the value of the last inserted row ID.
            // So, we must use an old-school function () { ... } style callback rather than a lambda function,
            // otherwise this.lastID and this.changes will be undefined.
            // Because lambda functions do not have their own this, they inherit the context from the parent scope.
            this.dbClient.run(insertQuery, [movieId, userId], function (error) {
                if (error) {
                    reject(error)
                    return
                }
                resolve(this.lastID)
            })
        })
    }
}