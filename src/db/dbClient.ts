import sqlite3 from 'sqlite3';

const DB_FILE = 'db.sqlite';

export class DBClient {
    connect() {
        const db = new sqlite3.Database(DB_FILE, (err:any) => {
                if (err) {
                    console.error(err.message)
                    throw err
                } else {
                    const sqlCreate =
                        `CREATE TABLE IF NOT EXISTS movies (
                             id           INTEGER PRIMARY KEY AUTOINCREMENT,
                             title        TEXT,
                             release_date TEXT,
                             popularity   INTEGER
                         )`;
                    db.run(sqlCreate, err => {
                        if (err) {
                            return console.error(err.message);
                        }
                    });
                }
            })
        return db
    }
}