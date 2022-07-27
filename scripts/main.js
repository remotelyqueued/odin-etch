// main.js
import { changeGradient } from './gradient.js';
import { createGrid } from './grid.js';

// https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

// max input 100

// TODO: design (bulma)

let size = 16;
let color = 'palegreen';

const colorSwitcher = document.getElementById('color-select');
const optionSwitcher = document.getElementById('option-select');
const main = document.body.querySelector('main');
const rangeDisplay = document.getElementById('range-display');
const range = document.getElementById('range');
const root = document.documentElement;

let container = document.createElement('div');

container.setAttribute('id', 'container');
container.append(...createGrid(size));

drawGrid();

rangeDisplay.textContent = size;

container.addEventListener('mouseover', changeColor);

range.addEventListener('change', event => {
    size = Number(event.target.value);
    rangeDisplay.textContent = size;

    container.remove();
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    if (optionSwitcher.value === 'gradient') {
        container.append(...createGrid(size, true));
        container.addEventListener('mouseover', changeGradient);
    } else if (optionSwitcher.value === 'colors') {
        container.append(...createGrid(size));
        container.addEventListener('mouseover', changeColor);
    } else {
        container.append(...createGrid(size));
        container.addEventListener('mouseover', changeRandom);
        colorSwitcher.setAttribute('disabled', true);
    }
    drawGrid();
});

colorSwitcher.addEventListener('change', event => {
    color = event.target.value;
});

optionSwitcher.addEventListener('change', event => {
    // ...
    // how to know which event listeners are on element?
    // container.removeEventListener('mouseover', changeColor);

    // id, name isn't unique
    // const clone = container.cloneNode(true);

    container.remove();
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    if (event.target.value == 'gradient') {
        container.append(...createGrid(size, true));
        container.addEventListener('mouseover', changeGradient);
        colorSwitcher.setAttribute('disabled', true);
    } else if (event.target.value == 'colors') {
        container.append(...createGrid(size));
        container.addEventListener('mouseover', changeColor);
        colorSwitcher.removeAttribute('disabled');
    } else {
        container.append(...createGrid(size));
        container.addEventListener('mouseover', changeRandom);
        colorSwitcher.setAttribute('disabled', true);
    }
    drawGrid();
});

function drawGrid() {
    root.style.setProperty('--grid', size);
    main.append(container);
}

function changeColor(event) {
    if (event.target.id != 'container') {
        event.target.style.backgroundColor = color;
    }
}

function changeRandom(event) {
    if (event.target.id != 'container') {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        event.target.style.backgroundColor = '#' + randomColor;
    }
}
