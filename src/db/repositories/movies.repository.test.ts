import {MoviesService} from "../../services/movies.service";
import Movie from "../../domain/movie";
import {MoviesRepository} from "./movies.repository";
import {Database} from "sqlite3";

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
        db = new Database("::memory::") as jest.Mocked<Database>
        moviesRepository = new MoviesRepository(db)
    })

    it('should get the stored movies', async () => {
        const movies = [
            new Movie('Movie 1', new Date('2021-07-04'), 5),
            new Movie('Movie 2', new Date('2015-05-05'), 10),
            new Movie('Movie 1', new Date('2021-07-04'), 1),
            new Movie('Movie 2', new Date('2015-05-05'), 30),
        ]
        db.all = jest.fn().mockImplementation((_query, _params, callback) => {
            callback(null, movies)
        })

        const popularMovies = await moviesRepository.getPopularMovies()

        expect(popularMovies.length).toBe(movies.length)
    })

    it('should get a maximum amount of 10 movies if not specified the limit', async () => {
       const movies = Array.from({length: 20}, (_, i) => new Movie(`Movie ${i}`, new Date(), i))
        db.all = jest.fn().mockImplementation((_query, _params, callback) => {
            callback(null, movies)
        })

        const popularMovies = await moviesRepository.getPopularMovies()

        expect(popularMovies.length).toBe(movies.length)
    })
})