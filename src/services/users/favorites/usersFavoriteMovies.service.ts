import {FavoritesRepository} from "../../../db/repositories/favories/favories.repository";
import Movie from "../../../domain/movie";

type UserMovie = {
    userId: number,
    movieId: number
}

export class UsersFavoriteMoviesService {
    constructor(private favoritesRepository: FavoritesRepository) {}

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