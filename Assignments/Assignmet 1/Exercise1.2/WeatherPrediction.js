const Event = require("./Event");
const DataType = require("./DataType");

module.exports = function WeatherPrediction(
  time,
  place,
  type,
  unit,
  numberTo,
  numberFrom
) {
  Event.call(this, time, place);
  DataType.call(this, type, unit);
  this.numberTo = numberTo;
  this.numberFrom = numberFrom;

  //mix Event prototype with DataType prototype
  WeatherPrediction.prototype = Object.create(Event.prototype);
  Object.assign(WeatherPrediction.prototype, DataType.prototype);
  //add function to WeatherData prototype
  WeatherPrediction.prototype.matches = function (data) {
    if (data.value() < this.to() && data.value() > this.from()) {
      return true;
    } else {
      return false;
    }
  };
  WeatherPrediction.prototype.to = function () {
    return this.numberTo;
  };
  WeatherPrediction.prototype.from = function () {
    return this.numberFrom;
  };
};
