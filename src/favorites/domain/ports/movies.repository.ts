import Movie from "../../../movies/domain/models/movie";

export type NewReleasesQuery = {
    offset?: number
    perPage?: number
    isAsc?: boolean
}

export interface MoviesRepository {
    getAll (): Promise<Movie[]>
    getNewReleasesPaginated ({offset, perPage, isAsc}: NewReleasesQuery): Promise<Movie[]>
    getCountNewReleases (): Promise<number>
}