import { HttpError } from "./HttpErrorHandler.js"

export function isFloat(string){
    const num = Number(string)
    if (Number.isFinite(num)) {
        return num
    }
    throw new HttpError("Bad request", 400)
}