import {FavoritesRepository} from "../../../db/repositories/favories/favories.repository";

type PostUsersFavoriteMovie = {
    userId: number,
    movieId: number
}

export class UsersFavoriteMoviesService {
    constructor(private favoritesRepository: FavoritesRepository) {}

    public async post({userId, movieId}: PostUsersFavoriteMovie): Promise<void> {
        // Add movie to user's favorites
    }
}