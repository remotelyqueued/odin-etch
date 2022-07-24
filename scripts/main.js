// main.js
import { changeGradient } from "./gradient.js";


// https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

// max input 100
const container = document.createElement('div');
container.setAttribute('id', 'container');

let size = 16;

createGrid(size);
drawGrid();

container.addEventListener('mouseover', changeGradient);

function createGrid(size) {
    const totalSquares = size * size;
    for (let i = 0; i < totalSquares; i++) {
        let div = document.createElement('div');
        container.append(div);
    }
}

function drawGrid() {
    let root = document.querySelector(':root');
    root.style.setProperty('--grid', size);
    document.body.append(container);
}


function changeColor(event) {}


