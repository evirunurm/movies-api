import {MoviesService} from "../../src/services/movies.service";
import Movie from "../../src/domain/movie";
import {MoviesRepository} from "../../src/db/repositories/movies.repository";
import {Database} from "sqlite3";

// We mock the sqlite3 module to avoid using a real database
// This test is run in a memory database
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
        db = new Database("::memory:") as jest.Mocked<Database>
        moviesRepository = new MoviesRepository(db)
    })

    it('should get all the stored movies', async () => {
        const movies = [
            new Movie('Movie 1', new Date('2021-07-04'), 5),
            new Movie('Movie 2', new Date('2015-05-05'), 10),
            new Movie('Movie 1', new Date('2021-07-04'), 1),
            new Movie('Movie 2', new Date('2015-05-05'), 30),
        ]
        db.all = jest.fn().mockImplementation((_query, _params, callback) => {
            callback(null, movies)
        })

        const popularMovies = await moviesRepository.getMovies()

        expect(popularMovies.length).toBe(movies.length)
    })
})