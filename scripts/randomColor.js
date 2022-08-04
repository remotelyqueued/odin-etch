/**
 * generateRandomColor() returns a random 6 digit hex color
 *
 * firefox complains if the hex number isn't 6 digits
 * couple different ways to do this: found online
 *
 * @returns {String} hexColorCode
 */
export function generateRandomColor() {
    return Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
}
