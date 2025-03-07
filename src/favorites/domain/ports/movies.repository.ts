import Movie from "../../../movies/domain/models/movie";

export type NewReleasesQuery = {
    offset?: number
    perPage?: number
    isAsc?: boolean
}

export interface MoviesRepository {
    getAll (): Promise<Movie[]>
    getNewReleasesPaginated (newReleasesQuery: NewReleasesQuery): Promise<Movie[]>
    getCountNewReleases (): Promise<number>
    getCountMovies(): Promise<number>;
}