const Event = require("./Event");
const DataType = require("./DataType");

module.exports = function WeatherData(time, place, type, unit, value) {
  Event.call(this, time, place);
  DataType.call(this, type, unit);
  this.weatherDataValue = value;

  //mix Event prototype with DataType prototype
  WeatherData.prototype = Object.create(Event.prototype);
  Object.assign(WeatherData.prototype, DataType.prototype);
  //add value function to WeatherData prototype
  WeatherData.prototype.value = function () {
    return this.weatherDataValue;
  };
};
