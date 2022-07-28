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

const rangeDisplay = document.getElementById('range-display');
const range = document.getElementById('range');

const grid = document.getElementById('grid');
const root = document.documentElement;

const set = document.getElementById('set');

let container = document.createElement('div');

container.setAttribute('id', 'container');
container.append(...createGrid(size));

drawGrid();

rangeDisplay.textContent = size;

container.addEventListener('mouseover', changeColor);

range.addEventListener('change', event => {
    rangeDisplay.textContent = event.target.value;
});

set.addEventListener('click', event => {
    size = Number(range.value);

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
    // main.append(container);
    grid.append(container);
}

function changeColor(event) {
    if (event.target.id != 'container') {
        event.target.style.backgroundColor = color;
    }
}

function changeRandom(event) {
    // firfox complains hex number isn't long enough

    // if (event.target.id != 'container') {
    //     const randomColor = Math.floor(Math.random() * 16_777_216).toString(16);
    //     if (randomColor.length < 6) {
    //         console.log(randomColor);
    //     } else {
    //         event.target.style.backgroundColor = '#' + randomColor;
    //     }
    // }

    let hexNumbers = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
    ];

    if (event.target.id != 'container') {
        let hexColorCode = '';
        for (let i = 0; i < 6; i++) {
            let randomIndex = Math.floor(Math.random() * hexNumbers.length);
            hexColorCode += hexNumbers[randomIndex];
        }

        if (hexColorCode != 'ffffff') {
            event.target.style.backgroundColor = '#' + hexColorCode;
        }
    }
}
