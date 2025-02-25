
import {Database} from "sqlite3";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {FavoritesRepository} from "../../../db/repositories/favories/favories.repository";
import {UsersFavoriteMoviesService} from "./usersFavoriteMovies.service";

describe('Users Favorite Movies Service', () => {
    let usersFavoriteMoviesService: UsersFavoriteMoviesService
    let favoritesRepository: FavoritesRepository

    beforeEach(() => {
        const db = jest.fn() as unknown as Database
        favoritesRepository = new FavoritesRepository(db)
        usersFavoriteMoviesService = new UsersFavoriteMoviesService(favoritesRepository)
    })

    it('should allow adding movies as favorites', async () => {
        const movie = MovieMother.aMovie({name: 'Favorite Movie'})
        movie.id = 1
        favoritesRepository.insert = jest.fn().mockResolvedValue(movie)

        await usersFavoriteMoviesService.post({
            userId: 1,
            movieId: movie.id
        })

        expect(favoritesRepository.insert).toHaveBeenCalled()
    })
})