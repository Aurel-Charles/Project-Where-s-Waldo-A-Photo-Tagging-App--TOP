import { HttpError } from "./HttpErrorHandler.js"

export function isInteger(string){
    const num = Number(string)
    if (!Number.isInteger(num)) {
        throw new HttpError("Bad request", 400)
    }
    return num
}