# simple-hex-to-rgb

Provides a function that converts hex colors to RGB and vice versa

## Usage

First, install the package using npm:

    npm install simple-hex-to-rgb --save

Then, require the package and use it like so:

    const convert = require('simple-hex-to-rgb');

    console.log(convert("#2f27ab")); // rgb(47, 39, 171)
    console.log(convert("rgb(47, 39, 171)")); // #2f27ab

## License

MIT