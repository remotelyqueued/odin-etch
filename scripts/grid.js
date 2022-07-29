/**
 * createGrid() creates a grid of size * size
 *
 * @param {Number} size
 * @param {Boolean} gradient
 * @returns {Array}
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