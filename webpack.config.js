// импортируем стандартный модуль node js
const path = require("path"); // !

module.exports = {
  entry: [
    "./js/service.js",
    "./js/request.js",
    "./js/handlers.js",
    "./js/avatar.js",
    "./js/card.js",
    "./js/filter.js",
    "./js/pin.js",
    "./js/pinMove.js",
    "./js/validation.js",
    "./js/debounce.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
};
