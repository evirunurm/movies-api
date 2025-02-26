import {MoviesView} from "../../../domain/view/movies.view";
import Movie from "../../../domain/entity/movie";
import {IRatingService, RatingServiceDependencies} from "./rating.service.types";

export class RatingService implements IRatingService {
    private readonly defaultLimit: number = 10
    private readonly moviesRepository

    constructor ( {
        moviesRepository
    }: RatingServiceDependencies) {
        this.moviesRepository = moviesRepository
    }

    async get(limit: number | undefined = undefined): Promise<MoviesView> {
        const movies = await this.moviesRepository.getAll()
        const sortedMovies = this.sortByProperty(movies, 'rating')
        return new MoviesView(
            sortedMovies.slice(0, limit || this.defaultLimit)
        )
    }

    // TODO: Separate this method into a separate utility class
    private sortByProperty(movies: Movie[], property: string, isAsc = false): Movie[] {
        // @ts-ignore
        return movies.sort((first, second) => isAsc ? first[property] - second[property] : second[property] - first[property])
    }
}
