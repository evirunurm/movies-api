import {FavoritesRepository} from "../../../db/repositories/favories/favories.repository";
import Movie from "../../../domain/entity/movie";

type UserMovie = {
    userId: number,
    movieId: number
}

type FavoriteMoviesServiceDependencies = {
    favoritesRepository: FavoritesRepository
}

export class FavoriteMoviesService {
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