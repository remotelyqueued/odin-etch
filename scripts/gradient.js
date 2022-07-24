export function changeGradient(event) {
    let div = event.target;
    let gradient = Number(getComputedStyle(div).getPropertyValue('--gradient'));

    if (!(gradient >= 1)) {
        gradient = (gradient + 0.1).toFixed(1);
        div.style.setProperty(`--gradient`, `${gradient}`);
    }
}
