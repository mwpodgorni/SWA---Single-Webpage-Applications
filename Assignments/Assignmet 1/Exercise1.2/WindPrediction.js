const WeatherPrediction = require("./WeatherPrediction");

module.exports = function WindPrediction(
  time,
  place,
  type,
  unit,
  numberTo,
  numberFrom,
  directions
) {
  WeatherPrediction.call(this, time, place, type, unit, numberTo, numberFrom);
  this.directionsValue = directions;

  WindPrediction.prototype = Object.create(WeatherPrediction.prototype);
  WindPrediction.prototype.directions = function () {
    return this.directionsValue;
  };
  WindPrediction.prototype.matches = function (data) {
    console.log("wind prediciton matches");
    if (this.directionsValue.indexOf(data.direction()) > -1) {
      return true;
    } else {
      return false;
    }
  };
  WindPrediction.prototype.convertToMPH = function () {
    if (this.unit() == "International") {
      this.numberFrom /= 2237;
      this.numberTo /= 2237;
    }
  };
  WindPrediction.prototype.convertToMS = function () {
    if (this.unit() == "US") {
      this.numberFrom *= 2237;
      this.numberTo *= 2237;
    }
  };
};
