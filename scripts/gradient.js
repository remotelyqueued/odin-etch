/**
 * changeGradient() applies a gradient to the board
 * similar to changeColor, changeRandom
 *
 * @param {PointerEvent} event
 */
export function changeGradient(event) {
    // target: element that triggered event - div
    // currentTarget: element that has the event listener - container
    const start = event.target;
    let previousElem;
    let gradient;
    if (event.pointerType === 'mouse') {
        gradient = Number(
            getComputedStyle(start).getPropertyValue('--gradient')
        );
        if (gradient < 1) {
            gradient = (gradient + 0.1).toFixed(1);
            start.style.setProperty(`--gradient`, `${gradient}`);
        }
    } else {
        start.onpointerdown = function (event) {
            gradient = Number(
                getComputedStyle(start).getPropertyValue('--gradient')
            );

            if (gradient < 1) {
                gradient = (gradient + 0.1).toFixed(1);
                start.style.setProperty(`--gradient`, `${gradient}`);
            }
            start.onpointermove = function (event) {
                let currentElem = document.elementFromPoint(
                    event.clientX,
                    event.clientY
                );
                if (!currentElem || currentElem.parentNode !== container)
                    return;

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
            start.onpointerup = function (event) {
                start.onpointermove = null;
                start.onpointerup = null;
            };
        };
    }
}
