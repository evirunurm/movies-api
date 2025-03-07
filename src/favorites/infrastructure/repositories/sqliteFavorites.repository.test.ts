import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/movieMother";
import {SqliteFavoritesRepository} from "./sqliteFavorites.repository";
import {DBSeeder} from "../../../app/infrastructure/sqlite/dbSeeder";
import {User} from "../../domain/models/user";
import {SqliteDBClient} from "../../../app/infrastructure/sqlite/sqliteDBClient";

describe('Favorites Repository', () => {
    let favoritesRepository: SqliteFavoritesRepository
    let db: Database
    let dbClient: SqliteDBClient

    beforeEach(async () => {
        dbClient = new SqliteDBClient({dbFile: ':memory:'})
        await dbClient.init()
        db = dbClient.getDB()
        favoritesRepository = new SqliteFavoritesRepository({dbClient})
    })

    afterEach(() => {
        db.close()
    })


    it('should insert favorite movies', async () => {
        await DBSeeder.seedUsers(db, [new User('exampleUser', 'user@example.com')])
        await DBSeeder.seedMovies(db, [
            MovieMother.aMovie({title: 'Not favorite movie'}),
            MovieMother.aMovie({title: 'Favorite movie'})
        ])

        const favoriteMovieId = await favoritesRepository.insert({
            userId: 1,
            movieId: 2
        })
        const favoriteMovies = await favoritesRepository.getAllForUser(1)

        expect(favoriteMovieId).toBe(1)
        expect(favoriteMovies.length).toBe(1)
        expect(favoriteMovies[0].title).toBe('Favorite movie')
    })

    it('should not insert favorite movie if it already exists for the user', async () => {
        await DBSeeder.seedUsers(db, [new User('exampleUser', 'user@example.com')])
        await DBSeeder.seedMovies(db, [
            MovieMother.aMovie({title: 'Favorite movie'})
        ])

        await favoritesRepository.insert({
            userId: 1,
            movieId: 1
        })

        await expect(async () => {
            await favoritesRepository.insert({
                userId: 1,
                movieId: 1
            })
        }).rejects.toThrow('Favorite movie already exists for user with id 1')
        const favoriteMovies = await favoritesRepository.getAllForUser(1)
        expect(favoriteMovies.length).toBe(1)
    })


   it('should delete favorite movies', async () => {
       await DBSeeder.seedUsers(db, [
           new User('exampleUser', 'user@example.com')
       ])
       await DBSeeder.seedMovies(db, [MovieMother.aMovie({})])
       await favoritesRepository.insert({
           userId: 1,
           movieId: 1
       })

       await favoritesRepository.delete({
           userId: 1,
           movieId: 1
       })
       // We're using the getAllUsers method to check if the favorite movie was deleted.
       // This is ok since we're testing the repository, and it's integration with the DB.
       const favoriteMovies = await favoritesRepository.getAllForUser(1)

       expect(favoriteMovies.length).toBe(0)
   })

    describe('when getting', () => {
        it('should not get not-favorite movies', async () => {
            await DBSeeder.seedUsers(db, [new User('exampleUser', 'user@example.com')])
            await DBSeeder.seedMovies(db, [
                MovieMother.aMovie({title: 'Favorite movie'}),
                MovieMother.aMovie({title: 'Not favorite movie'})
            ])
            await favoritesRepository.insert({
                userId: 1,
                movieId: 1
            })

            const favoriteMovies = await favoritesRepository.getAllForUser(1)

            expect(favoriteMovies.length).toBe(1)
            expect(favoriteMovies[0].title).toBe('Favorite movie')
        })
    })
})