import {MoviesService} from "../../src/services/movies.service";
import Movie from "../../src/domain/movie";
import {MoviesRepository} from "../../src/services/movies.repository";

describe('Movies Service', () => {
    let moviesService: MoviesService
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        moviesRepository = new MoviesRepository()
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
            const popularMovies = await moviesService.getPopularMovies()

            expect(popularMovies.length).toBe(movies.length)
            // TODO: Make a custom matcher to compare the popularity of the services
            expect(popularMovies[0].popularity)
                .toBeGreaterThan(popularMovies[1].popularity)
        })
    })
})