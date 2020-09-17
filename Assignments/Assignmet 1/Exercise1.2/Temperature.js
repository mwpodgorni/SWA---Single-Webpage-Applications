const WeatherData = require("./WeatherData");

module.exports = class Temperature extends WeatherData {
  constructor(time, place, type, unit, value) {
    super(time, place, type, unit, value);
  }
  convertToF() {
    if (this.unit() == "International") {
      this.value = (this.value * 9) / 5 + 32;
    }
  }
  convertToC() {
    if (this.unit() == "US") {
      this.value = ((this.value - 32) * 5) / 9;
    }
  }
};
