// main.js
import { changeGradient } from './gradient.js';
import { createGrid } from './grid.js';

// https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

// max input 100
let size = 16;
const container = document.createElement('div');

container.setAttribute('id', 'container');

container.append(...createGrid(size));


const root = document.documentElement;

createGrid(size);
drawGrid();

container.addEventListener('mouseover', changeGradient);

function drawGrid() {
    root.style.setProperty('--grid', size);
    document.body.append(container);
}

function changeColor(event) {}

// const switcher = document.getElementById('switcher');

// switcher.addEventListener('change', function (evt) {
//     root.style.setProperty('--var-repeat', evt.target.value);
// });
