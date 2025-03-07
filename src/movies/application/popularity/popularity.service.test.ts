import {PopularityService} from "./popularity.service";
import {MoviesRepository} from "../../../favorites/domain/ports/movies.repository";
import {MoviesListMother} from "../../../../test/builders/moviesListMother";

describe('Popular Movies Service', () => {
    let popularMoviesService: PopularityService
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        moviesRepository = {} as MoviesRepository
        popularMoviesService = new PopularityService({moviesRepository})
    })
    
    it('should get a list of movies, ordered by popularity', async () => {
        const movies = MoviesListMother.aListOfMoviesWithDifferentPopularity({length: 5})
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)
        moviesRepository.getCountMovies = jest.fn().mockResolvedValue(5)
    
        const popularMovies = (await popularMoviesService.get()).data
    
        expect(popularMovies.length).toBe(movies.length)
        expect(popularMovies[0].title).toBe('Movie 4')
        expect(popularMovies[popularMovies.length - 1].title).toBe('Movie 0')
    })
    
    it('should get a default maximum amount of 10 most popular movies', async () => {
        const movies = MoviesListMother.aListOfMoviesWithDifferentPopularity({length: 20})
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)
        moviesRepository.getCountMovies = jest.fn().mockResolvedValue(20)

        const popularMovies = (await popularMoviesService.get()).data
    
        expect(popularMovies.length).toBe(10)
        expect(popularMovies[0].title).toBe('Movie 19')
        expect(popularMovies[popularMovies.length - 1].title).toBe('Movie 10')
    })
    
    it('should get the amount of most popular movies, if specified', async () => {
        const movies = MoviesListMother.aListOfMoviesWithDifferentPopularity({length: 20})
        moviesRepository.getAll = jest.fn().mockResolvedValue(movies)
        moviesRepository.getCountMovies = jest.fn().mockResolvedValue(20)

        const popularMovies = (await popularMoviesService.get(5)).data
    
        expect(popularMovies.length).toBe(5)
        expect(popularMovies[0].title).toBe('Movie 19')
        expect(popularMovies[popularMovies.length - 1].title).toBe('Movie 15')
    })
})