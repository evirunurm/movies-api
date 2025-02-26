import {Database} from 'sqlite3';

type DBClientDependencies = {
    dbFile: string
}

export class DBClient {
    private readonly db: Database

    constructor({dbFile}: DBClientDependencies) {
        this.db = new Database(dbFile, async (err) => {
            if (err) console.error(err.message)
            if (process.env.NODE_ENV !== 'test') await this.createTables()
        })
    }

    async init() {
        await this.createTables()
    }

    getDB() {
        return this.db
    }

    async createTables() {
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

         const turnOnForeignKeys = 'PRAGMA foreign_keys = ON'

         return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run(sqlCreateUsers, (err: Error) => { if (err) reject(err) })
                this.db.run(sqlCreateMovies, (err: Error) => { if (err) reject(err) })
                this.db.run(sqlCreateFavoriteMovies, (err: Error) => {
                    if (err) reject(err)
                    resolve(null)
                })
                this.db.get(turnOnForeignKeys)
            })
        })
    }

    async getAllUsers() {
        const query = 'SELECT * FROM users'

        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows: any) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(rows)
            })
        })
    }

    async getAllMovies() {
        const query = 'SELECT * FROM movies'

        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows: any) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(rows)
            })
        })
    }
}