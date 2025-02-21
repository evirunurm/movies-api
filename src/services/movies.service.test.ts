import {MoviesService} from "./movies.service";
import Movie from "../domain/movie";
import {MoviesRepository} from "../db/repositories/movies.repository";
import {Database} from "sqlite3";
import {MovieMother} from "../../test/builders/moviesMother";

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
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)
            const popularMovies = (await moviesService.getPopular()).results

            expect(popularMovies.length).toBe(movies.length)
            // Here we could make a custom matcher to compare the popularity of the movies
            expect(popularMovies[0].title).toBe('Popular Movie')
            expect(popularMovies[popularMovies.length - 1].title).toBe('Unpopular Movie')
        })

        it('should get a default maximum amount of 10 most popular movies', async () => {
            const movies = Array.from({length: 20}, (_, i) => new Movie(`Movie ${i}`, new Date(), i))
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)
            const popularMovies = (await moviesService.getPopular()).results

            expect(popularMovies.length).toBe(10)
            expect(popularMovies[0].title).toBe('Movie 19')
            expect(popularMovies[popularMovies.length - 1].title).toBe('Movie 10')
        })

        it('should get the amount of most popular movies, if specified', async () => {
            const movies = Array.from({length: 20}, (_, i) => new Movie(`Movie ${i}`, new Date(), i))
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)
            const popularMovies = (await moviesService.getPopular(5)).results

            expect(popularMovies.length).toBe(5)
            expect(popularMovies[0].title).toBe('Movie 19')
            expect(popularMovies[popularMovies.length - 1].title).toBe('Movie 15')
        })
    })

    describe('when sorting by top rated', () => {
        it('should get a list of movies, ordered by top-rated', async () => {
            const movies = Array.from({length: 5}, (_, i) =>
                MovieMother.aMovieWithRating(i, i))
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)

            const topRatedMovies = (await moviesService.getTopRated()).results

            expect(topRatedMovies.length).toBe(movies.length)
            expect(topRatedMovies[0].title).toBe('Movie 4')
            expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 0')
        })

        it('should get a default maximum amount of 10 top rated movies', async () => {
            const movies = Array.from({length: 15}, (_, i) =>
                MovieMother.aMovieWithRating(i, i))
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)

            const topRatedMovies = (await moviesService.getTopRated()).results

            expect(topRatedMovies.length).toBe(10)
            expect(topRatedMovies[0].title).toBe('Movie 14')
            expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 5')
        })

        it('should get the amount of top rated movies, if specified', async () => {
            const movies = Array.from({length: 10}, (_, i) =>
                MovieMother.aMovieWithRating(i, i))
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)

            const topRatedMovies = (await moviesService.getTopRated(5)).results

            expect(topRatedMovies.length).toBe(5)
            expect(topRatedMovies[0].title).toBe('Movie 9')
            expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 5')
        })
    })
})