/**
 * changeGradient() applies a gradient to the board
 *
 * @param {PointerEvent} event
 */
export function changeGradient(event) {
    // target: element that triggered event - div
    // currentTarget: element that has the event listener - container
    const start = event.target;
    let previousElem;
    let gradient;
    // console.log(event.pointerType); // mouse, touch, pen
    if (event.pointerType === 'mouse') {
        // if pointerType is mouse just set color
        gradient = Number(
            getComputedStyle(start).getPropertyValue('--gradient')
        );

        if (gradient < 1) {
            gradient = (gradient + 0.1).toFixed(1);
            start.style.setProperty(`--gradient`, `${gradient}`);
        }
    } else {
        // touch or pen
        start.onpointerdown = function (event) {
            // initial input set color of square
            gradient = Number(
                getComputedStyle(start).getPropertyValue('--gradient')
            );

            if (gradient < 1) {
                gradient = (gradient + 0.1).toFixed(1);
                start.style.setProperty(`--gradient`, `${gradient}`);
            }
            // if pointer moves
            start.onpointermove = function (event) {
                // may need to call prevent default
                let currentElem = document.elementFromPoint(
                    event.clientX,
                    event.clientY
                );
                // if dragging outside of window or onto unrelated element
                // return
                if (!currentElem || currentElem.parentNode !== container)
                    return;
                // if the color is already changed return
                if (previousElem === currentElem) return;

                previousElem = currentElem;

                gradient = Number(
                    getComputedStyle(currentElem).getPropertyValue('--gradient')
                );

                if (gradient < 1) {
                    gradient = (gradient + 0.1).toFixed(1);
                    currentElem.style.setProperty(`--gradient`, `${gradient}`);
                }
            };
            // remove eventlisteners
            start.onpointerup = function (event) {
                start.onpointermove = null;
                start.onpointerup = null;
            };
        };
    }
}
