import Movie from "../../../domain/entity/movie";
import {IFavoritesRepository} from "../../../db/repositories/favories/ifavories.repository";

export type UserMovie = {
    userId: number,
    movieId: number
}

export type FavoriteMoviesServiceDependencies = {
    favoritesRepository: IFavoritesRepository
}

export interface IFavoriteMoviesService {
    post({userId, movieId}: UserMovie): Promise<number>

    delete({userId, movieId}: UserMovie): Promise<void>

    getAllForUser(userId: number): Promise<Movie[]>
}