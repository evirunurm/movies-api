import {MoviesView} from "../../../domain/view/movies.view";
import {IMoviesRepository} from "../../../db/repositories/movies/movies.repository.types";

export type PopularityServiceDependencies = {
    moviesRepository: IMoviesRepository
}

export interface IPopularityService {
    get(limit: number | undefined): Promise<MoviesView>
}
