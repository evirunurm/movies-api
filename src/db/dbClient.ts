import sqlite3 from 'sqlite3';

export class DBClient {
    private readonly DB_FILE = 'db.sqlite';

    connect() {
        const db = new sqlite3.Database(this.DB_FILE, (err:any) => {
                if (err) {
                    console.error(err.message)
                    throw err
                } else {
                    const sqlCreate =
                        `CREATE TABLE IF NOT EXISTS movies (
                             id           INTEGER PRIMARY KEY AUTOINCREMENT,
                             title        TEXT,
                             release_date TEXT,
                             popularity   INTEGER,
                             rating       INTEGER
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