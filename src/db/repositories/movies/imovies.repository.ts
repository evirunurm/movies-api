import Movie from "../../../domain/entity/movie";
import {IDBClient} from "../../idbClient";

export type MoviesRepositoryDependencies = {
    dbClient: IDBClient
}

export type NewReleasesQuery = {
    offset?: number
    perPage?: number
    isAsc?: boolean
}

export interface IMoviesRepository {
    getAll (): Promise<Movie[]>
    getNewReleasesPaginated ({offset, perPage, isAsc}: NewReleasesQuery): Promise<Movie[]>
    getCountNewReleases (): Promise<number>
}