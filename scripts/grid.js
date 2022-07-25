export function createGrid(size) {
    let grid = [];
    const totalSquares = size * size;
    for (let i = 0; i < totalSquares; i++) {
        let div = document.createElement('div');
        grid.push(div);
    }
    return grid;
}
