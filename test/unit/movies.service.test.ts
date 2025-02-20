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

describe('Movies Service', () => {
    let moviesService: MoviesService
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        // Instead of an actual instance of database
        // We use a Dummy whose only purpose is to satisfy the dependency
        // It's never going to get called
        const db = jest.fn() as unknown as Database
        moviesRepository = new MoviesRepository(db)
        moviesService = new MoviesService(moviesRepository)
    })

    describe('when sorting by popularity', () => {
        it('should return a list of services, ordered by popularity', async () => {
            const movies = [
                new Movie('Movie 1', new Date('2021-07-04'), 5),
                new Movie('Movie 2', new Date('2015-05-05'), 10),
                new Movie('Movie 1', new Date('2021-07-04'), 1),
                new Movie('Movie 2', new Date('2015-05-05'), 30),
            ]
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)
            const popularMovies = (await moviesService.getPopularMovies()).results

            expect(popularMovies.length).toBe(movies.length)
            // Here we could make a custom matcher to compare the popularity of the movies
            expect(popularMovies[0].popularity)
                .toBeGreaterThanOrEqual(popularMovies[1].popularity)
        })
    })
})