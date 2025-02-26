import {FavoriteMoviesService} from "./favoriteMovies.service";
import FavoriteMovie from "../../../domain/entity/favoriteMovies";
import {IFavoritesRepository} from "../../../db/repositories/favories/ifavories.repository";

describe('Favorite Movies Service', () => {
    let usersFavoriteMoviesService: FavoriteMoviesService
    let favoritesRepository: IFavoritesRepository

    beforeEach(() => {
        favoritesRepository = {} as IFavoritesRepository
        usersFavoriteMoviesService = new FavoriteMoviesService({favoritesRepository})
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