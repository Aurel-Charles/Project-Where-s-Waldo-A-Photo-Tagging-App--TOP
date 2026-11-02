export function getXYCoor(rect, clientX, clientY) {
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return {x,y}
}