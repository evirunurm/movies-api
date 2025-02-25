import {MoviesView} from "../../../domain/view/movies.view";
import {IMoviesRepository} from "../../../db/repositories/movies/movies.repository.types";

export type RatingServiceDependencies = {
    moviesRepository: IMoviesRepository
}

export interface IRatingService {
    get(limit: number | undefined): Promise<MoviesView>
}
