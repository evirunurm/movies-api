
import {Database} from "sqlite3";
import {FavoritesRepository} from "../../../db/repositories/favories/favories.repository";
import {UsersFavoriteMoviesService} from "./usersFavoriteMovies.service";
import FavoriteMovie from "../../../domain/entities/favoriteMovies";

describe('Users Favorite Movies Service', () => {
    let usersFavoriteMoviesService: UsersFavoriteMoviesService
    let favoritesRepository: FavoritesRepository

    beforeEach(() => {
        const db = jest.fn() as unknown as Database
        favoritesRepository = new FavoritesRepository(db)
        usersFavoriteMoviesService = new UsersFavoriteMoviesService(favoritesRepository)
    })

    it('should allow adding movies as favorites', async () => {
        favoritesRepository.insert = jest.fn().mockResolvedValue(1)

        await usersFavoriteMoviesService.post({
            userId: 1,
            movieId: 5
        })

        expect(favoritesRepository.insert).toHaveBeenCalledWith({
            userId: 1,
            movieId: 5
        })
    })

    it('should allow deleting favorite movies', async () => {
        favoritesRepository.delete = jest.fn()

        await usersFavoriteMoviesService.delete({
            userId: 1,
            movieId: 5
        })

        expect(favoritesRepository.delete).toHaveBeenCalledWith({
            userId: 1,
            movieId: 5
        })
    })

    it('should allow getting all favorite movies for a user', async () => {
        favoritesRepository.getAllForUser = jest.fn().mockResolvedValue([
            new FavoriteMovie(1, 5)
        ])

        await usersFavoriteMoviesService.getAllForUser(1)

        expect(favoritesRepository.getAllForUser).toHaveBeenCalledWith(1)
    })
})