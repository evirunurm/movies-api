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
        dbClient = new DBClient({dbFile: ':memory:'})
        await dbClient.createTables()
        db = dbClient.getDB()
        moviesRepository = new MoviesRepository({dbClient})
    })

    afterEach(() => {
        db.close()
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

    it('should only get new-releases movies, in descending order by default', async  () => {
        const movies = Array.from({length: 4}, (_, nameIdentifier) =>{
            const today = new Date()
            return MovieMother.aMovie({
                nameIdentifier,
                releaseDate: new Date(
                    today.getFullYear() + nameIdentifier,
                    today.getMonth(),
                    today.getDate())
            })
        })
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({})
        // 'Movie 0' is released today
        expect(storedMovies.length).toBe(3)
        expect(storedMovies[0].title).toBe('Movie 3')
        expect(storedMovies[1].title).toBe('Movie 2')
        expect(storedMovies[2].title).toBe('Movie 1')
    })

    it('should only get new-releases, in ascending order', async  () => {
        const movies = Array.from({length: 4}, (_, nameIdentifier) =>{
            const today = new Date()
            return MovieMother.aMovie({
                nameIdentifier,
                releaseDate: new Date(
                    today.getFullYear() + nameIdentifier,
                    today.getMonth(),
                    today.getDate())
            })
        })
        await DBSeeder.seedMovies(db, movies)

        const storedMovies = await moviesRepository.getNewReleasesPaginated({isAsc: true})
        // 'Movie 0' is released today
        expect(storedMovies.length).toBe(3)
        expect(storedMovies[0].title).toBe('Movie 1')
        expect(storedMovies[1].title).toBe('Movie 2')
        expect(storedMovies[2].title).toBe('Movie 3')
    })
})