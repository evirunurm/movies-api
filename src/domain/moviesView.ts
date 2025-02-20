import Movie from "./movie";

export class MoviesView {

    constructor(movies: Movie[]) {
        this.results = movies;
    }

    public results: Movie[] = [];
}