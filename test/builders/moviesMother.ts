import Movie from "../../src/domain/movie";

export class MovieMother {
    public static aMovieWithRating = (rating: number, index: number | null = null): Movie =>
        new Movie(this.buildMovieName(index), new Date(), 10, rating)

    public static aMovieWithTitle = (title: string): Movie =>
        new Movie(title, new Date(), 10, 5)

    public static aMovieWithPopularity = (popularity: number, index: number | null = null): Movie =>
         new Movie(this.buildMovieName(index), new Date(), popularity, 5)

    private static buildMovieName = (index: number | null = null): string =>
        index !== null ? `Movie ${index}` : 'Default Movie'

    public static aMovieReleasedNextYear = (index: number | null = null): Movie => {
        const releaseDate = new Date();
        releaseDate.setFullYear(releaseDate.getFullYear() + 1);
        return new Movie(this.buildMovieName(index), releaseDate, 10, 5)
    }

    public static aMovieWithReleaseDate = (releaseDate: Date, index: number | null = null): Movie =>
        new Movie(this.buildMovieName(index), releaseDate, 10, 5)
}