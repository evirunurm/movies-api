import {MoviesRepository} from "./movies.repository";
import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {DBClient} from "../../dbClient";
import {DBSeeder} from "../../seeder/dbSeeder";

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

    it('should get to-be-released movies', async  () => {
        const movies = Array.from({length: 10}, (_, nameIdentifier) =>
            MovieMother.aMovieReleasedNextYear(nameIdentifier))
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({})
        expect(storedMovies.length).toBe(10)
    })

    it('should not obtain more to-be-released movies than the specified limit', async  () => {
        const movies = Array.from({length: 10}, (_, nameIdentifier) =>
            MovieMother.aMovieReleasedNextYear(nameIdentifier))
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({
            offset: 0,
            perPage: 5
        })
        expect(storedMovies.length).toBe(5)
    })

    it('should obtain the amount of to-be-released movies left for the page', async  () => {
        const movies = Array.from({length: 10}, (_, nameIdentifier) =>
            MovieMother.aMovieReleasedNextYear(nameIdentifier))
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({
            offset: 6,
            perPage: 5
        })
        expect(storedMovies.length).toBe(4)
    })

    it('should get the count of all to-be-released movies', async  () => {
        const movies = Array.from({length: 10}, (_, nameIdentifier) =>
            MovieMother.aMovieReleasedNextYear(nameIdentifier))
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getCountNewReleases()
        expect(storedMovies).toBe(10)
    })

    it('should get new releases in descending order by default', async  () => {
        const movies = Array.from({length: 3}, (_, nameIdentifier) =>{
            const today = new Date()
            return MovieMother.aMovie({
                nameIdentifier,
                releaseDate: new Date(2021, 1, today.getFullYear() + nameIdentifier)
            })
        })
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({})
        expect(storedMovies[0].title).toBe('Movie 2')
        expect(storedMovies[1].title).toBe('Movie 1')
        expect(storedMovies[2].title).toBe('Movie 0')
    })

    it('should get new releases in ascending order', async  () => {
        const movies = Array.from({length: 3}, (_, nameIdentifier) =>{
            const today = new Date()
            return MovieMother.aMovie({
                nameIdentifier,
                releaseDate: new Date(2021, 1, today.getFullYear() + nameIdentifier)
            })
        })
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({isAsc: true})
        expect(storedMovies[0].title).toBe('Movie 0')
        expect(storedMovies[1].title).toBe('Movie 1')
        expect(storedMovies[2].title).toBe('Movie 2')
    })
})