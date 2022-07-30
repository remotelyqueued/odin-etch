/**
 * createGrid() creates a grid of size * size with an option
 * for a gradient shifting ability
 *
 * @param {Number} size
 * @param {Boolean} gradient
 * @returns {Array} grid
 */
export function createGrid(size, gradient) {
    let grid = [];
    const totalSquares = size * size;
    if (gradient) {
        for (let i = 0; i < totalSquares; i++) {
            let div = document.createElement('div');
            div.classList.add('gradient');
            grid.push(div);
        }
    } else {
        for (let i = 0; i < totalSquares; i++) {
            let div = document.createElement('div');
            grid.push(div);
        }
    }
    return grid;
}