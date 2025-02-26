import Movie from "../../../domain/entity/movie";
import {IDBClient} from "../../idbClient";

export type InsertQuery = {
    movieId: number
    userId: number
}

export type FavoritesRepositoryDependencies = {
    dbClient: IDBClient
}

export interface IFavoritesRepository {
    insert ({movieId, userId}: InsertQuery): Promise<number>
    delete ({movieId, userId}: InsertQuery): Promise<void>
    getAllForUser (userId: number): Promise<Movie[]>
}