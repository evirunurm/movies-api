import {MoviesService} from "./movies.service";
import Movie from "../domain/movie";
import {MoviesRepository} from "../db/repositories/movies.repository";
import {Database} from "sqlite3";

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
        it('should get a list of movies, ordered by popularity', async () => {
            const movies = [
                new Movie('Random Movie', new Date('2021-07-04'), 5),
                new Movie('Random Movie 2', new Date('2015-05-05'), 10),
                new Movie('Unpopular Movie', new Date('2021-07-04'), 1),
                new Movie('Popular Movie', new Date('2015-05-05'), 30),
            ]
            moviesRepository.getPopularMovies = jest.fn().mockResolvedValue(movies)
            const popularMovies = (await moviesService.getPopularMovies()).results

            expect(popularMovies.length).toBe(movies.length)
            // Here we could make a custom matcher to compare the popularity of the movies
            expect(popularMovies[0].title).toBe('Popular Movie')
            expect(popularMovies[popularMovies.length - 1].title).toBe('Unpopular Movie')
        })

    })
})