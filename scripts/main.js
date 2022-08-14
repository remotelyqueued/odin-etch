// main.js
import { changeGradient } from './gradient.js';
import { generateRandomRGB } from './randomColor.js';
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

// multiple events firing
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

// implement in handlers changeColor, changeRandom, changeGradient
function changeColor(event) {
    const start = event.target;
    let previousElem;
    // console.log(event.pointerType); // mouse, touch, pen
    if (event.pointerType === 'mouse') {
        // if pointerType is mouse just set color
        start.style.backgroundColor = color;
    } else {
        // touch or pen
        start.onpointerdown = function (event) {
            // initial input set color of square
            start.style.backgroundColor = color;
            // if pointer moves
            start.onpointermove = function (event) {
                // may need to call prevent default
                let currentElem = document.elementFromPoint(
                    event.clientX,
                    event.clientY
                );
                // if dragging outside of window or onto unrelated element
                // return
                if (!currentElem || currentElem.parentNode !== container) return;
                // if the color is already changed return
                if (previousElem === currentElem) return;

                previousElem = currentElem;

                currentElem.style.backgroundColor = color;
            };
            // remove eventlisteners
            start.onpointerup = function (event) {
                start.onpointermove = null;
                start.onpointerup = null;
            };
        };
    }
}

function changeRandom(event) {
    const start = event.target;
    let previousElem;
    // console.log(event.pointerType); // mouse, touch, pen
    if (event.pointerType === 'mouse') {
        // if pointerType is mouse just set color
        start.style.backgroundColor = generateRandomRGB();
    } else {
        // touch or pen
        start.onpointerdown = function (event) {
            // initial input set color of square
            start.style.backgroundColor = generateRandomRGB();
            // if pointer moves
            start.onpointermove = function (event) {
                // may need to call prevent default
                let currentElem = document.elementFromPoint(
                    event.clientX,
                    event.clientY
                );
                // if dragging outside of window or onto unrelated element
                // return
                if (!currentElem || currentElem.parentNode !== container) return;
                // if the color is already changed return
                if (previousElem === currentElem) return;

                previousElem = currentElem;
                currentElem.style.backgroundColor = generateRandomRGB();
            };
            // remove eventlisteners
            start.onpointerup = function (event) {
                start.onpointermove = null;
                start.onpointerup = null;
            };
        };
    }
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
