import {Database} from 'sqlite3';

export class DBClient {
    private readonly DB_FILE;

    constructor(DB_FILE = 'db.sqlite') {
        this.DB_FILE = DB_FILE
    }

    connect() {
        const db = new Database(this.DB_FILE, async (err) => {
            if (err) console.error(err.message)
            await DBClient.createTables(db)
        })
        return db
    }

     static async createTables(db: Database) {
         const sqlCreateUsers = `CREATE TABLE IF NOT EXISTS users (
                                 id           INTEGER PRIMARY KEY AUTOINCREMENT,
                                 email        TEXT,
                                 name         TEXT);`

         const sqlCreateMovies = `CREATE TABLE IF NOT EXISTS movies (
                                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                                title        TEXT,
                                release_date TEXT,
                                popularity   INTEGER,
                                rating       INTEGER);`

         const sqlCreateFavoriteMovies = `CREATE TABLE IF NOT EXISTS favoriteMovies (
                                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                                userId       INTEGER,
                                movieId      INTEGER,
                                CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id),
                                CONSTRAINT fk_movie FOREIGN KEY (movieId) REFERENCES movies(id));`
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(sqlCreateUsers, (err: Error) => { if (err) reject(err) })
                db.run(sqlCreateMovies, (err: Error) => { if (err) reject(err) })
                db.run(sqlCreateFavoriteMovies, (err: Error) => {
                    if (err) reject(err)
                    resolve(null)
                })
            })
        })
    }
}