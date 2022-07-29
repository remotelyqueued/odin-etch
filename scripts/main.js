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

const setButton = document.getElementById('setButton');

let container = document.createElement('div');

container.setAttribute('id', 'container');

container.append(...createGrid(size));
drawGrid();

// createRandomGrid(size);

rangeDisplay.textContent = size;

container.addEventListener('pointerover', changeColor);

range.addEventListener('change', event => {
    rangeDisplay.textContent = event.target.value;
});

setButton.addEventListener('click', event => {
    size = Number(range.value);

    container.remove();
    container = document.createElement('div');
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
    // ...
    // how to know which event listeners are on element?
    // container.removeEventListener('pointerover', changeColor);

    // id, name isn't unique
    // const clone = container.cloneNode(true);

    container.remove();
    container = document.createElement('div');
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

export function createRandomGrid(size) {
    let grid = [];

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

    const totalSquares = size * size;

    for (let i = 0; i < totalSquares; i++) {
        let div = document.createElement('div');
        let hexColorCode = '';
        for (let i = 0; i < 6; i++) {
            let randomIndex = Math.floor(Math.random() * hexNumbers.length);
            hexColorCode += hexNumbers[randomIndex];
        }
        div.style.backgroundColor = '#' + hexColorCode;
        grid.push(div);
    }

    container.append(...grid);
    drawGrid();
}

document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll('.navbar-burger'),
        0
    );

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });
});
