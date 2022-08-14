/**
 * generateRandomHEX() returns a random 6 digit hex color
 *
 * firefox complains if the hex number isn't 6 digits
 *
 * @returns {String} 6 digit HEX
 */
export function generateRandomHEX() {
    return Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
}

/**
 * generateRandomRGB() returns a random 3 digit rgb color between
 * 0 - 255 inclusive
 *
 * Chrome auto converts HEX to RGB
 *
 * used equation in MDN random section
 *
 * @returns {String} RGB
 */
export function generateRandomRGB() {
    const randomBetween = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min);
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgb(${r},${g},${b})`;
}
