
export function isGuessesCorrect(userCoor, validCoor){
    let xIsValid = false
    let yIsValid = false
    
    if (validCoor.x - 2 <= userCoor.x && userCoor.x <= validCoor.x + 2) {
        xIsValid = true
    }
    if (validCoor.y - 2 <= userCoor.y && userCoor.y <= validCoor.y + 2) {
        yIsValid = true    
    }
    
    if (!xIsValid || !yIsValid) {
        return false
    }
    return true
}