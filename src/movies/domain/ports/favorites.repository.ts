import Movie from "../models/movie";
import FavoriteMovies from "../../../favorites/domain/models/favoriteMovies";

export interface FavoritesRepository {
    insert (favoriteMovies: FavoriteMovies): Promise<number>
    delete (favoriteMovies: FavoriteMovies): Promise<void>
    getAllForUser (userId: number): Promise<Movie[]>
}