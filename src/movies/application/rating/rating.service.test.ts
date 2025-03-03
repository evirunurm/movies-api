import {RatingService} from "./rating.service";
import {MoviesRepository} from "../../../favorites/domain/ports/movies.repository";
import {MoviesListMother} from "../../../../test/builders/moviesListMother";

describe('Top-Rated Movies Service', () => {
    let topRatedMoviesService: RatingService
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        moviesRepository = {} as MoviesRepository
        topRatedMoviesService = new RatingService({moviesRepository})
    })

    it('should get a list of movies, ordered by top-rated', async () => {
        const movies = MoviesListMother.aListOfMoviesWithDifferentRatings({length: 5})
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)

        const topRatedMovies = (await topRatedMoviesService.get()).data

        expect(topRatedMovies.length).toBe(movies.length)
        expect(topRatedMovies[0].title).toBe('Movie 4')
        expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 0')
    })

    it('should get a default maximum amount of 10 top rated movies', async () => {
        const movies = MoviesListMother.aListOfMoviesWithDifferentRatings({length: 15})
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)

        const topRatedMovies = (await topRatedMoviesService.get()).data

        expect(topRatedMovies.length).toBe(10)
        expect(topRatedMovies[0].title).toBe('Movie 14')
        expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 5')
    })

    it('should get the amount of top rated movies, if specified', async () => {
        const movies = MoviesListMother.aListOfMoviesWithDifferentRatings({length: 10})
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)

        const topRatedMovies = (await topRatedMoviesService.get(5)).data

        expect(topRatedMovies.length).toBe(5)
        expect(topRatedMovies[0].title).toBe('Movie 9')
        expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 5')
    })
})