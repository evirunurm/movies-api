import Movie from "./movie";

export class MoviesView {

    constructor(movies: Movie[]) {
        this.data = movies;
    }

    public data: Movie[] = [];
}