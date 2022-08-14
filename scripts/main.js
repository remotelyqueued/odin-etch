// main.js
import { changeGradient } from './gradient.js';
import { generateRandomColor } from './randomColor.js';
import { createGrid } from './grid.js';

const colorSwitcher = document.getElementById('color-select');
const optionSwitcher = document.getElementById('option-select');
const rangeDisplay = document.getElementById('range-display');
const setButton = document.getElementById('setButton');
const range = document.getElementById('range');
const grid = document.getElementById('grid');
const root = document.documentElement;

let color = colorSwitcher.value;
let size = 16;

let container = document.createElement('div');
container.setAttribute('id', 'container');
container.style.touchAction = 'none';
container.append(...createGrid(size));

drawGrid();

rangeDisplay.textContent = size;

container.addEventListener('pointerover', changeColor);

range.addEventListener('change', event => {
    rangeDisplay.textContent = event.target.value;
});

setButton.addEventListener('click', event => {
    size = Number(range.value);

    container.remove();
    container = document.createElement('div');
    container.style.touchAction = 'none';
    container.setAttribute('id', 'container');

    if (optionSwitcher.value === 'gradient') {
        container.append(...createGrid(size, true));
        container.addEventListener('pointerover', changeGradient);
    } else if (optionSwitcher.value === 'colors') {
        container.append(...createGrid(size));
        container.addEventListener('pointerover', changeColor);
    } else {
        container.append(...createGrid(size));
        container.addEventListener('pointerover', changeRandom);
        colorSwitcher.setAttribute('disabled', true);
    }
    drawGrid();
});

colorSwitcher.addEventListener('change', event => {
    color = event.target.value;
});

optionSwitcher.addEventListener('change', event => {
    // id, name isn't unique
    // const clone = container.cloneNode(true);

    container.remove();
    container = document.createElement('div');
    container.style.touchAction = 'none';
    container.setAttribute('id', 'container');

    if (event.target.value == 'gradient') {
        container.append(...createGrid(size, true));
        container.addEventListener('pointerover', changeGradient);
        colorSwitcher.setAttribute('disabled', true);
    } else if (event.target.value == 'colors') {
        container.append(...createGrid(size));
        container.addEventListener('pointerover', changeColor);
        colorSwitcher.removeAttribute('disabled');
    } else {
        container.append(...createGrid(size));
        container.addEventListener('pointerover', changeRandom);
        colorSwitcher.setAttribute('disabled', true);
    }
    drawGrid();
});

function drawGrid() {
    root.style.setProperty('--grid', size);
    grid.append(container);
}

function changeColor(event) {
    event.preventDefault(); // touch drag
    event.target.style.backgroundColor = color;
}

function changeRandom(event) {
    event.preventDefault(); // touch drag
    event.target.style.backgroundColor = '#' + generateRandomColor();
}

document.addEventListener('DOMContentLoaded', () => {
    const navbarBurgers = document.querySelectorAll('.navbar-burger');

    navbarBurgers.forEach(element => {
        element.addEventListener('click', () => {
            const target = element.dataset.target;
            const temp = document.getElementById(target);
            element.classList.toggle('is-active');
            temp.classList.toggle('is-active');
        });
    });
});
