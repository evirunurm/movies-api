import {RatingService} from "./rating.service";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {IMoviesRepository} from "../../../db/repositories/movies/movies.repository.types";

describe('Top-Rated Movies Service', () => {
    let topRatedMoviesService: RatingService
    let moviesRepository: IMoviesRepository

    beforeEach(() => {
        moviesRepository = {} as IMoviesRepository
        topRatedMoviesService = new RatingService({moviesRepository})
    })

    it('should get a list of movies, ordered by top-rated', async () => {
        const movies = Array.from({length: 5}, (_, index) =>
            MovieMother.aMovie({
                nameIdentifier: index,
                rating: index}
            ))
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)

        const topRatedMovies = (await topRatedMoviesService.get()).data

        expect(topRatedMovies.length).toBe(movies.length)
        expect(topRatedMovies[0].title).toBe('Movie 4')
        expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 0')
    })

    it('should get a default maximum amount of 10 top rated movies', async () => {
        const movies = Array.from({length: 15}, (_, index) =>
            MovieMother.aMovie({
                nameIdentifier: index,
                rating: index
            }))
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)

        const topRatedMovies = (await topRatedMoviesService.get()).data

        expect(topRatedMovies.length).toBe(10)
        expect(topRatedMovies[0].title).toBe('Movie 14')
        expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 5')
    })

    it('should get the amount of top rated movies, if specified', async () => {
        const movies = Array.from({length: 10}, (_, i) =>
            MovieMother.aMovie({
                nameIdentifier: i,
                rating: i
            }))
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)

        const topRatedMovies = (await topRatedMoviesService.get(5)).data

        expect(topRatedMovies.length).toBe(5)
        expect(topRatedMovies[0].title).toBe('Movie 9')
        expect(topRatedMovies[topRatedMovies.length - 1].title).toBe('Movie 5')
    })
})