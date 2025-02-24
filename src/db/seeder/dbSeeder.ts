import Movie from "../../domain/movie";
import {Database, RunResult} from "sqlite3";

export class DBSeeder {
    static async seedMovies(db: Database, movies: Movie[]) {
        const sqlInsert = `INSERT INTO movies (title, release_date, popularity, rating)
                           VALUES ${movies.map(movie =>
            `('${movie.title}', '${movie.releaseDate.toISOString().split('T')[0]}', ${movie.popularity}, ${movie.rating})`).join(',')}`

        return new Promise((resolve, reject) => {
            db.run(sqlInsert, (result: RunResult, err: Error) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    }

    static async seedBasicData(db: Database) {
        const sqlInsert = `INSERT INTO movies (title, release_date, popularity, rating)
                           VALUES ('The Shawshank Redemption', '1994-09-10', 678, 9.3),
                                  ('The Godfather', '1972-03-24', 600, 9.2),
                                  ('The Dark Knight', '2008-07-18', 583, 9.0),
                                  ('The Godfather: Part II', '1974-12-20', 500, 9.0),
                                  ('The Lord of the Rings: The Return of the King', '2003-12-17', 492, 8.9),
                                  ('Pulp Fiction', '1994-10-14', 488, 8.9),
                                  ('Schindler''s List', '1994-02-04', 478, 8.9),
                                  ('Beetlejuice 3', '2027-02-04', 666, 9.5),
                                  ('Beetlejuice 4', '2028-02-04', 456, 9.8),
                                  ('Beetlejuice 5', '2029-02-04', 784, 9.2),
                                  ('Beetlejuice 6', '2030-02-04', 654, 8.8)`

        return new Promise((resolve, reject) => {
            db.run(sqlInsert, (result: RunResult, err: Error) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    }
}