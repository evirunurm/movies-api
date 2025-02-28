import Movie from "./movie";

export default class MoviesList {
    constructor(private movies: Movie[]) {}

    getMovies = () => this.movies

    sortByProperty(property: string, isAsc = false): void {
        // @ts-ignore
        this.movies = this.movies.sort((first, second) => isAsc ? first[property] - second[property] : second[property] - first[property])
    }

    limit(limit: number): void {
        this.movies = this.movies.slice(0, limit)
    }
}