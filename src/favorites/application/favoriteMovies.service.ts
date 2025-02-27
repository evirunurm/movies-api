import Movie from "../../movies/domain/models/movie";
import FavoriteMovies from "../domain/models/favoriteMovies";
import {FavoritesRepository} from "../../movies/domain/ports/favorites.repository";

type FavoriteMoviesServiceDependencies = {
    favoritesRepository: FavoritesRepository
}

export class FavoriteMoviesService {
    private readonly favoritesRepository

    constructor({favoritesRepository}: FavoriteMoviesServiceDependencies) {
        this.favoritesRepository = favoritesRepository
    }

    public async post({userId, movieId}: FavoriteMovies): Promise<number> {
        return await this.favoritesRepository.insert({
            userId,
            movieId
        })
    }

    async delete({userId, movieId}: FavoriteMovies): Promise<void> {
        await this.favoritesRepository.delete({
            userId,
            movieId
        })
    }

    async getAllForUser(userId: number): Promise<Movie[]> {
        return await this.favoritesRepository.getAllForUser(userId)
    }
}