import Movie from "./models/movie";
import {PaginationView} from "./pagination.view";
import {MoviesView} from "./movies.view";

export class PaginatedMoviesView extends MoviesView {
    constructor(
        data: Movie[],
        public pagination: PaginationView
    ) {
      super(data)
    }
}