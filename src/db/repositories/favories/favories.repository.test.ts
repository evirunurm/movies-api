
import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {DBClient} from "../../dbClient";
import {FavoritesRepository} from "./favories.repository";
import {DBSeeder} from "../../seeder/dbSeeder";
import FavoriteMovies from "../../../domain/entities/favoriteMovies";
import {User} from "../../../domain/entities/user";

describe('Favorites Repository', () => {
    let favoritesRepository: FavoritesRepository
    let db: Database
    let dbClient: DBClient

    beforeEach(async () => {
        dbClient = new DBClient(':memory:')
        db = dbClient.connect()
        await DBClient.createTables(db)
        favoritesRepository = new FavoritesRepository(db)
    })

    describe('when inserting', () => {
        it('should insert favorite movies', async () => {
            await DBSeeder.seedMovies(db, [MovieMother.aMovie({nameIdentifier: 10})])
            const favoriteMovieId = await favoritesRepository.insert({
                userId: 1,
                movieId: 1
            })

            expect(favoriteMovieId).toBe(1)
        })
    })

   describe('when deleting', () => {
       it('should delete favorite movies', async () => {
           await DBSeeder.seedUsers(db, [
               new User('exampleUser', 'user@example.com')
           ])
           await DBSeeder.seedMovies(db, [MovieMother.aMovie({})])
           await DBSeeder.seedFavoriteMovie(db, [
               new FavoriteMovies(1, 1),
           ])

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
        it('should get favorite movies', async () => {
            await DBSeeder.seedUsers(db, [new User('exampleUser', 'user@example.com')])
            await DBSeeder.seedMovies(db, [MovieMother.aMovie({title: 'Testing movie'})])
            await DBSeeder.seedFavoriteMovie(db, [new FavoriteMovies(1, 1)])

            const favoriteMovies = await favoritesRepository.getAllForUser(1)

            expect(favoriteMovies.length).toBe(1)
            expect(favoriteMovies[0].title).toBe('Testing movie')
        })

        it('should not get not-favorite movies', async () => {
            await DBSeeder.seedUsers(db, [new User('exampleUser', 'user@example.com')])
            await DBSeeder.seedMovies(db, [
                MovieMother.aMovie({title: 'Favorite movie'}),
                MovieMother.aMovie({title: 'Not favorite movie'})
            ])
            await DBSeeder.seedFavoriteMovie(db, [new FavoriteMovies(1, 1)])

            const favoriteMovies = await favoritesRepository.getAllForUser(1)

            expect(favoriteMovies.length).toBe(1)
            expect(favoriteMovies[0].title).toBe('Favorite movie')
        })
    })
})