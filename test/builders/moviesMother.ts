import Movie from "../../src/movies/domain/models/movie";

type MovieConfiguration = {
    title?: string
    rating?: number
    popularity?: number
    nameIdentifier?: number
    releaseDate?: Date
}

export class MovieMother {

    public static aMovie({
        title,
        popularity,
        rating,
        nameIdentifier,
        releaseDate
    }: MovieConfiguration): Movie {
        return new Movie(
            title ?? this.buildMovieName(nameIdentifier),
            releaseDate ?? new Date(),
            popularity ?? 10,
            rating ?? 5
        )
    }

    public static aMovieReleasedNextYear = (identifier: number | undefined = undefined): Movie => {
        const releaseDate = new Date();
        releaseDate.setFullYear(releaseDate.getFullYear() + 1);
        return new Movie(
            this.buildMovieName(identifier),
            releaseDate,
            10,
            5
        )
    }

    private static buildMovieName = (identifier: number | undefined = undefined): string =>
        identifier !== undefined ? `Movie ${identifier}` : 'Default Movie'
}