export class ElementAlreadyExistsError extends Error {
    constructor(public message: string) {
        super(message)
    }
}