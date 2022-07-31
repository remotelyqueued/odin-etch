/* const hexNumbers = [
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
]; */

/**
 * generateRandomColor() returns a random 6 digit hex color
 *
 * firefox complains if the hex number isn't 6 digits
 * couple different ways to do this: found online
 *
 * @returns {String} hexColorCode
 */
export function generateRandomColor() {
    // let hexColorCode = '';
    // for (let i = 0; i < 6; i++) {
    //     const randomIndex = Math.floor(Math.random() * hexNumbers.length);
    //     hexColorCode += hexNumbers[randomIndex];
    // }
    // return hexColorCode;

    return Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
}
