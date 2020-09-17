const WeatherData = require("./WeatherData");

module.exports = function Precipitation(
  time,
  place,
  type,
  unit,
  value,
  precipitationType
) {
  WeatherData.call(this, time, place, type, unit, value);
  this.precipitationTypeValue = precipitationType;

  Precipitation.prototype = Object.create(WeatherData.prototype);
  Precipitation.prototype.precipitationType = function () {
    return this.precipitationTypeValue;
  };
  Precipitation.prototype.convertToInches = function () {
    if (this.unit() == "International") {
      this.value /= 25.4;
    }
  };
  Precipitation.prototype.convertToMM = function () {
    if (this.unit() == "US") {
      this.value *= 25.4;
    }
  };
};
