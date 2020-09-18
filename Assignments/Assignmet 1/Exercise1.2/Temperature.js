const WeatherData = require("./WeatherData");

module.exports = function Temperature(time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);

  Temperature.prototype = Object.create(WeatherData.prototype);
  Temperature.prototype.convertToF = function () {
    if (this.unit() == "International") {
      this.value = (this.value * 9) / 5 + 32;
    }
  };
  Temperature.prototype.convertToC = function () {
    if (this.unit() == "US") {
      this.value = ((this.value - 32) * 5) / 9;
    }
  };
};
