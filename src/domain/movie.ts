export default class Movie {
    constructor(
        public id: number,
        public title: string,
        public releaseDate: Date,
        public popularity: number,
        public rating: number = 0
    ) {}
}