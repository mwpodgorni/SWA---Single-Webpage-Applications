const WeatherData = require("./WeatherData");

module.exports = function Wind(time, place, type, unit, value, direction) {
  WeatherData.call(this, time, place, type, unit, value);
  this.directionValue = direction;

  Wind.prototype = Object.create(WeatherData.prototype);
  Wind.prototype.direction = function () {
    return this.directionValue;
  };
  Wind.prototype.convertToMPH = function () {
    if (this.unit() == "International") {
      this.weatherDataValue *= 2237;
    }
  };
  Wind.prototype.convertToMS = function () {
    if (this.unit() == "US") {
      this.weatherDataValue /= 2237;
    }
  };
};
