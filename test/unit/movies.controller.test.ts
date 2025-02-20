import {MoviesController} from "../../src/core/movies/movies.controller";
import Movie from "../../src/domain/movie";
import {MoviesRepository} from "../../src/core/movies/movies.repository";

describe('Movies Controller', () => {
    let moviesController: MoviesController
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        moviesRepository = new MoviesRepository()
        moviesController = new MoviesController(moviesRepository)
    })

    describe('when sorting by popularity', () => {
        it('should return a list of movies, ordered by popularity', async () => {
            const movies = [
                new Movie('Movie 1', new Date('2021-07-04'), 5),
                new Movie('Movie 2', new Date('2015-05-05'), 10),
                new Movie('Movie 1', new Date('2021-07-04'), 1),
                new Movie('Movie 2', new Date('2015-05-05'), 30),
            ]
            moviesRepository.getMovies = jest.fn().mockResolvedValue(movies)
            const popularMovies = await moviesController.getPopularMovies()

            expect(popularMovies.length).toBe(movies.length)
            // TODO: Make a custom matcher to compare the popularity of the movies
            expect(popularMovies[0].popularity)
                .toBeGreaterThan(popularMovies[1].popularity)
        })
    })
})