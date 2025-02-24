import {Database, RunResult} from 'sqlite3';

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
         const sqlCreate = `CREATE TABLE IF NOT EXISTS movies (
                             id           INTEGER PRIMARY KEY AUTOINCREMENT,
                             title        TEXT,
                             release_date TEXT,
                             popularity   INTEGER,
                             rating       INTEGER
                         )`
        return new Promise((resolve, reject) => {
            db.run(sqlCreate, (result: RunResult, err: Error) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    }
}