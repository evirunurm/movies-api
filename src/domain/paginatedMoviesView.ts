import Movie from "./movie";
import {PaginationView} from "./paginationView";
import {MoviesView} from "./moviesView";

export class PaginatedMoviesView extends MoviesView {
    constructor(
        data: Movie[],
        public pagination: PaginationView | null = null
    ) {
      super(data)
    }
}