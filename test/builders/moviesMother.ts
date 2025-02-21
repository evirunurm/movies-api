import Movie from "../../src/domain/movie";

export class MovieMother {

    public static aMovie = (index: number | null = null): Movie =>
        new Movie(this.buildMovieName(index), new Date(), 10, 5)

    public static aMovieWithRating = (rating: number, index: number | null = null): Movie =>
        new Movie(this.buildMovieName(index), new Date(), 10, rating)

    public static aMovieWithTitle = (title: string): Movie =>
        new Movie(title, new Date(), 10, 5)

    public static aMovieWithPopularity = (popularity: number, index: number | null = null): Movie  =>
         new Movie(this.buildMovieName(index), new Date(), popularity, 5)

    private static buildMovieName = (index: number | null = null): string =>
        index !== null ? `Movie ${index}` : 'Default Movie'
}