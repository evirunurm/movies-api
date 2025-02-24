import {MoviesRepository} from "./movies.repository";
import {Database} from "sqlite3";
import {MovieMother} from "../../../test/builders/moviesMother";
import {DBClient} from "../dbClient";
import {DBSeeder} from "../seeder/dbSeeder";

describe('Movies Repository', () => {
    let moviesRepository: MoviesRepository
    let db: Database
    let dbClient: DBClient

    beforeEach(async () => {
        dbClient = new DBClient(':memory:')
        db = dbClient.connect()
        await DBClient.createTables(db)
        moviesRepository = new MoviesRepository(db)
    })

    it('should get the stored movies', async () => {
        const movies = Array.from({length: 20}, (_, nameIdentifier) =>
            MovieMother.aMovie({nameIdentifier}))
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getAll()

        expect(storedMovies.length).toBe(movies.length)
    })

    it('should get paginated to-be-released stored movies', async  () => {
        const movies = Array.from({length: 10}, (_, nameIdentifier) =>
            MovieMother.aMovieReleasedNextYear(nameIdentifier))
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated()
        expect(storedMovies.length).toBe(10)
    })
})