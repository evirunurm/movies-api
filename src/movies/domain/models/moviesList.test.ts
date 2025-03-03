import MoviesList from "./moviesList";
import {MovieMother} from "../../../../test/builders/movieMother";
import {MoviesListMother} from "../../../../test/builders/moviesListMother";

describe('Movies List', () => {
    let moviesList: MoviesList

    it('should order by movie property in descending by default', () => {
        moviesList = new MoviesList([
            MovieMother.aMovie({title: 'Movie 1', rating: 1}),
            MovieMother.aMovie({title: 'Movie 2', rating: 2}),
            MovieMother.aMovie({title: 'Movie 3', rating: 3}),
            MovieMother.aMovie({title: 'Movie 4', rating: 4}),
            MovieMother.aMovie({title: 'Movie 5', rating: 5})
        ])

        moviesList.sortByProperty('rating')

        expect(moviesList.getMovies()[0].title).toBe('Movie 5')
    })

    it('should order by movie property in ascending', () => {
        moviesList = new MoviesList([
            MovieMother.aMovie({title: 'Movie 3', rating: 3}),
            MovieMother.aMovie({title: 'Movie 1', rating: 1}),
            MovieMother.aMovie({title: 'Movie 4', rating: 4}),
            MovieMother.aMovie({title: 'Movie 2', rating: 2}),
            MovieMother.aMovie({title: 'Movie 5', rating: 5})
        ])
        const isAsc = true
        moviesList.sortByProperty('rating', isAsc)

        expect(moviesList.getMovies()[0].title).toBe('Movie 1')
    })

    it('should limit movie list', () => {
        moviesList = new MoviesList(MoviesListMother.aListOfMovies({length: 5}))
        moviesList.limit(3)

        expect(moviesList.getMovies().length).toBe(3)
    })
})