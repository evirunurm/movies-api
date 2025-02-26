import {MoviesRepository} from "../../../db/repositories/movies/movies.repository";
import {MoviesView} from "../../../domain/view/movies.view";
import Movie from "../../../domain/entity/movie";

type RatingServiceDependencies = {
    moviesRepository: MoviesRepository
}

export class RatingService {
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

    private sortByProperty(movies: Movie[], property: string, isAsc = false): Movie[] {
        // @ts-ignore
        return movies.sort((first, second) => isAsc ? first[property] - second[property] : second[property] - first[property])
    }
}
