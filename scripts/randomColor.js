const hexNumbers = [
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

/**
 * generateRandomColor() returns a random 6 digit hex color
 *
 * @returns {String} hexColorCode
 */
export function generateRandomColor() {
    let hexColorCode = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexNumbers.length);
        hexColorCode += hexNumbers[randomIndex];
    }
    return hexColorCode;
}
