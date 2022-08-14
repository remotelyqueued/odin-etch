/**
 * changeGradient() applies a gradient to the board
 *
 * @param {PointerEvent} event
 */
export function changeGradient(event) {
    // target: element that triggered event - div gradient
    // currentTarget: element that has the event listener - div container
    
    // touch and drag on mobile
    event.preventDefault();

    let div = event.target;
    let gradient = Number(getComputedStyle(div).getPropertyValue('--gradient'));
    if (gradient < 1) {
        gradient = (gradient + 0.1).toFixed(1);
        div.style.setProperty(`--gradient`, `${gradient}`);
    }
}
