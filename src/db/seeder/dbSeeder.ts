import Movie from "../../domain/movie";
import {Database, RunResult} from "sqlite3";
import FavoriteMovies from "../../domain/entities/favoriteMovies";
import {User} from "../../domain/entities/user";

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

    static async seedUsers(db: Database, users: User[]) {
        const sqlInsert = `INSERT INTO users (email, name)
                           VALUES ${users.map(user =>
                        `('${user.email}', ${user.name})`).join(',')}`

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

    static async seedFavoriteMovie(db: Database, favoriteMovies: FavoriteMovies[]) {
        const sqlInsert = `INSERT INTO favoriteMovies (userId, movieId)
                           VALUES ${favoriteMovies.map(favoriteMovie =>
                        `('${favoriteMovie.userId}', ${favoriteMovie.movieId})`).join(',')}`

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
        const sqlInsertMovies = `INSERT INTO movies (title, release_date, popularity, rating)
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
                                  ('Beetlejuice 6', '2030-02-04', 654, 8.8);`
        const sqlInsertUsers = `INSERT INTO users (email, name)
                                VALUES ('email@gmail.com', 'Jane Doe');`

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(sqlInsertMovies, (err: Error) => {
                    if (err) {
                        reject(err)
                        console.error(err)
                    }
                })
                db.run(sqlInsertUsers,  (err: Error) => {
                    if (err) {
                        reject(err)
                        console.error(err)
                    }
                    resolve(null)
                })
            })
        })
    }
}