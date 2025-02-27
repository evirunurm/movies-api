import Movie from "../models/movie";
import FavoriteMovies from "../../../favorites/domain/models/favoriteMovies";

export interface FavoritesRepository {
    insert ({movieId, userId}: FavoriteMovies): Promise<number>
    delete ({movieId, userId}: FavoriteMovies): Promise<void>
    getAllForUser (userId: number): Promise<Movie[]>
}