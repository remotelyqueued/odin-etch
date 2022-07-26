// main.js
import { changeGradient } from './gradient.js';
import { createGrid } from './grid.js';

// https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

// max input 100
let size = 16;
let color = 'palegreen';

const colorSwitcher = document.getElementById('color-select');
const optionSwitcher = document.getElementById('option-select');
const root = document.documentElement;

let container = document.createElement('div');

container.setAttribute('id', 'container');
container.append(...createGrid(size));

drawGrid();

container.addEventListener('mouseover', changeColor);

colorSwitcher.addEventListener('change', event => {
    color = event.target.value;
});

optionSwitcher.addEventListener('change', event => {
    // ...
    // how to know which event listeners are on element?
    // container.removeEventListener('mouseover', changeColor);
    container.remove();

    container = document.createElement('div');
    container.setAttribute('id', 'container');

    if (event.target.value == 'gradient') {
        container.append(...createGrid(size, true));
        container.addEventListener('mouseover', changeGradient);
        // disable color choice
        drawGrid();
    } else if (event.target.value == 'colors') {
        container.append(...createGrid(size));
        container.addEventListener('mouseover', changeColor);
        // enable color choice
        drawGrid();
    } else {
        container.append(...createGrid(size));
        container.addEventListener('mouseover', changeRandom);
        drawGrid();
    }
});

function drawGrid() {
    root.style.setProperty('--grid', size);
    document.body.append(container);
}

function changeColor(event) {
    if (event.target.id != 'container') {
        event.target.style.backgroundColor = color;
    }
}

function changeRandom() {}
