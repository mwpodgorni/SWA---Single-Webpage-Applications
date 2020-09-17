const WeatherData = require("./WeatherData");

module.exports = function CloudCoverage(time, time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);
  CloudCoverage.prototype = Object.create(WeatherData.prototype);
};
