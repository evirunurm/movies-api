export class ElementNotFoundError extends Error {
    constructor(public message: string) {
        super(message)
    }
}