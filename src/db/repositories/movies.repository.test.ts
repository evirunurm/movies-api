import {MoviesRepository} from "./movies.repository";
import {Database} from "sqlite3";
import {MovieMother} from "../../../test/builders/moviesMother";

// We mock the sqlite3 module to avoid using a real database
// This test suite is run in a memory database
jest.mock("sqlite3", () => {
    return {
        Database: jest.fn().mockImplementation(() => ({
            all: jest.fn(),
            run: jest.fn(),
            close: jest.fn(),
        })),
    };
})

describe('Movies Repository', () => {
    let moviesRepository: MoviesRepository
    let db: Database

    beforeEach(() => {
        db = new Database(":memory:") as jest.Mocked<Database>
        moviesRepository = new MoviesRepository(db)
    })

    it('should get the stored movies', async () => {
        const movies = Array.from({length: 20}, (_, i) =>
            MovieMother.aMovieWithPopularity(i, i))
        db.all = jest.fn().mockImplementation((_query, callback) => {
            callback(null, movies)
        })

        const popularMovies = await moviesRepository.getMovies()

        expect(popularMovies.length).toBe(movies.length)
    })
})