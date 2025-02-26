import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {DBClient} from "../../dbClient";
import {FavoritesRepository} from "./favories.repository";
import {DBSeeder} from "../../seeder/dbSeeder";
import {User} from "../../../domain/entity/user";

describe('Favorites Repository', () => {
    let favoritesRepository: FavoritesRepository
    let db: Database
    let dbClient: DBClient

    beforeEach(async () => {
        dbClient = new DBClient({dbFile: ':memory:'})
        await dbClient.createTables()
        db = dbClient.getDB()
        favoritesRepository = new FavoritesRepository({dbClient})
    })

    afterEach(() => {
        db.close()
    })

    describe('when inserting', () => {
        it('should insert favorite movies', async () => {
            await DBSeeder.seedUsers(db, [new User('exampleUser', 'user@example.com')])
            await DBSeeder.seedMovies(db, [
                MovieMother.aMovie({title: 'Not favorite movie'}),
                MovieMother.aMovie({title: 'Favorite movie'})
            ])

            const users = await dbClient.getAllUsers()
            const movies = await dbClient.getAllMovies()
            console.log('Users:', users)
            console.log('Movies:', movies)

            const favoriteMovieId = await favoritesRepository.insert({
                userId: 1,
                movieId: 2
            })
            const favoriteMovies = await favoritesRepository.getAllForUser(1)

            expect(favoriteMovieId).toBe(1)
            expect(favoriteMovies.length).toBe(1)
            expect(favoriteMovies[0].title).toBe('Favorite movie')
        })
    })

   describe('when deleting', () => {
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