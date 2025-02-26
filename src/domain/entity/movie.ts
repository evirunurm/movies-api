export default class Movie {
    constructor(
        public title: string,
        public releaseDate: Date,
        public popularity: number,
        public rating: number = 0,
        public id?: number) {}
}