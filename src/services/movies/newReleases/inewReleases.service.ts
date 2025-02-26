import {PaginatedMoviesView} from "../../../domain/view/paginatedMovies.view";
import {IMoviesRepository} from "../../../db/repositories/movies/imovies.repository";

export type NewReleasesGetConfiguration = {
    isAsc?: boolean,
    perPage?: number,
    page?: number
}

export type NewReleasesServiceDependencies = {
    moviesRepository: IMoviesRepository
}

export interface INewReleasesService {
     get({isAsc, perPage, page}: NewReleasesGetConfiguration): Promise<PaginatedMoviesView>
}
