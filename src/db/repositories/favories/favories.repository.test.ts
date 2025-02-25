
import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {DBClient} from "../../dbClient";
import {FavoritesRepository} from "./favories.repository";
import {DBSeeder} from "../../seeder/dbSeeder";

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

    it('should insert favorite movies', async () => {
        await DBSeeder.seedMovies(db, [MovieMother.aMovie({nameIdentifier: 10})])
        const favoriteMovieId = await favoritesRepository.insert({
            userId: 1,
            movieId: 1
        })

        expect(favoriteMovieId).toBe(1)
    })
})