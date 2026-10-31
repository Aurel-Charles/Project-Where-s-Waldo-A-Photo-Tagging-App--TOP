

import { HttpError } from "./HttpErrorHandler.js"
import { isFloat } from "./isFloat.js"

export function isPercentage(num){
    const percentage = isFloat(num)
    if (percentage < 0 || percentage > 100) {
        throw new HttpError("Bad request", 400)
    }
    return percentage
}