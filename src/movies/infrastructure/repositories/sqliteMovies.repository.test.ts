import {SqliteMoviesRepository} from "./sqliteMovies.repository";
import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/movieMother";
import {DBSeeder} from "../../../app/infrastructure/sqlite/dbSeeder";
import {SqliteDBClient} from "../../../app/infrastructure/sqlite/sqliteDBClient";
import {MoviesListMother} from "../../../../test/builders/moviesListMother";

describe('Movies Repository', () => {
    let moviesRepository: SqliteMoviesRepository
    let db: Database
    let dbClient: SqliteDBClient

    beforeEach(async () => {
        dbClient = new SqliteDBClient({dbFile: ':memory:'})
        await dbClient.init()
        db = dbClient.getDB()
        moviesRepository = new SqliteMoviesRepository({dbClient})
    })

    it('should get the stored movies', async () => {
        const movies = MoviesListMother.aListOfMovies({length: 20})
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

    it('should only get new-releases movies, in descending order by default', async  () => {
        const movies = MoviesListMother.aListOfNotReleasedMoviesWithDifferentYears({length: 4})
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({})
        // 'Movie 0' is released today
        expect(storedMovies.length).toBe(3)
        expect(storedMovies[0].title).toBe('Movie 3')
        expect(storedMovies[1].title).toBe('Movie 2')
        expect(storedMovies[2].title).toBe('Movie 1')
    })

    it('should only get new-releases, in ascending order', async  () => {
        const movies = MoviesListMother.aListOfNotReleasedMoviesWithDifferentYears({length: 4})
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({isAsc: true})
        // 'Movie 0' is released today
        expect(storedMovies.length).toBe(3)
        expect(storedMovies[0].title).toBe('Movie 1')
        expect(storedMovies[1].title).toBe('Movie 2')
        expect(storedMovies[2].title).toBe('Movie 3')
    })

    it('should get the count of all movies', async  () => {
        const movies = MoviesListMother.aListOfMovies({length: 20})
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getCountMovies()
        expect(storedMovies).toBe(20)
    })
})