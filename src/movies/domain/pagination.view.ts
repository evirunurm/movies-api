export class PaginationView {
    public total: number;
    public page: number;
    public perPage: number;

    constructor(total: number, page: number, perPage: number) {
        this.total = total;
        this.page = page;
        this.perPage = perPage;
    }
}