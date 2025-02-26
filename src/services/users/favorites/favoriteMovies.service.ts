import Movie from "../../../domain/entity/movie";
import {FavoriteMoviesServiceDependencies, IFavoriteMoviesService, UserMovie} from "./favoriteMovies.service.types";

export class FavoriteMoviesService implements IFavoriteMoviesService {
    private readonly favoritesRepository

    constructor({favoritesRepository}: FavoriteMoviesServiceDependencies) {
        this.favoritesRepository = favoritesRepository
    }

    public async post({userId, movieId}: UserMovie): Promise<number> {
        return await this.favoritesRepository.insert({
            userId,
            movieId
        })
    }

    async delete({userId, movieId}: UserMovie) {
        await this.favoritesRepository.delete({
            userId,
            movieId
        })
    }

    async getAllForUser(userId: number): Promise<Movie[]> {
        return await this.favoritesRepository.getAllForUser(userId)
    }
}