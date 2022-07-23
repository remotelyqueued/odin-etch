// main.js

const container = document.createElement('div');
container.setAttribute('id', 'container');
container.classList.add('container');

for (let i = 0; i < 256; i++) {
    let div = document.createElement('div');
    container.append(div);
}

document.body.append(container);

function createGrid(size) {}

function clearGrid() {}

container.addEventListener('mouseover', event => {
    console.log(event.target);
    event.target.classList.add('color');
    event.target.style.backgroundColor = 'blue';
});
