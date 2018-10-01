const helperHex = (number) => {
    let hex = parseInt(number).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

const RGBToHex = (RGBColor) => {
    // Same as hex color
    // won't capture the possible whitespace surrounding the different numbers
    let hex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(RGBColor)

    let [_, r, g, b] = hex
    return "#" + helperHex(r) + helperHex(g) + helperHex(b);
}

const helperRGB = (number) => parseInt(number, 16);

const HexToRGB = (hexColor) => {
    // Get corresponding red, green and blue color
    // Returns an array whose first parameter is the hex string
    // The three following parameters are the red, green, and blue hex codes.
    let rgb = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hexColor);

    // Use array destructuring to get them from the array
    let [_, r, g, b] = rgb

    return `rgb(${helperRGB(r)}, ${helperRGB(g)}, ${helperRGB(b)})`;
}

const convert = (color) => {
    let isHex = color.startsWith('#');
    let isRGB = color.startsWith('rgb');

    if (isHex) {
        return HexToRGB(color);
    }

    if (isRGB) {
        return RGBToHex(color);
    }
}

module.exports = convert