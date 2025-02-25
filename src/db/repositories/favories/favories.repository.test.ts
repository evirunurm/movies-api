
import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {DBClient} from "../../dbClient";
import {FavoritesRepository} from "./favories.repository";

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
        const movie = MovieMother.aMovie({name: 'Favorite Movie'})

        const favoriteMovie = await favoritesRepository.insert(movie)

        expect(favoriteMovie.id).toBe(1)
    })
})