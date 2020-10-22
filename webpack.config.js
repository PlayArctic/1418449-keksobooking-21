// импортируем стандартный модуль node js
const path = require("path"); // !что за конструкция

module.exports = {
  entry: [
    "./js/card.js",
    "./js/filter.js",
    "./js/listeners.js",
    "./js/loadData.js",
    "./js/main.js",
    "./js/pin.js",
    "./js/pinMove.js",
    "./js/uploadData.js",
    "./js/validation.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
};
