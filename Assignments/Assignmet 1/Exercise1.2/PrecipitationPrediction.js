const WeatherPrediction = require("./WeatherPrediction");

module.exports = function PrecipitationPrediction(
  time,
  place,
  type,
  unit,
  numberTo,
  numberFrom,
  types
) {
  WeatherPrediction.call(this, time, place, type, unit, numberTo, numberFrom);
  this.typesValue = types;

  PrecipitationPrediction.prototype = Object.create(
    WeatherPrediction.prototype
  );
  PrecipitationPrediction.prototype.types = function () {
    return this.types;
  };
  PrecipitationPrediction.prototype.matches = function (data) {
    if (this.typesValue.indexOf(data.precipitationType()) > -1) {
      return true;
    } else {
      return false;
    }
  };
  PrecipitationPrediction.prototype.convertToInches = function () {
    if (this.unit() == "International") {
      this.numberFrom /= 25.4;
      this.numberTo /= 25.4;
    }
  };
  PrecipitationPrediction.prototype.convertToMM = function () {
    if (this.unit() == "US") {
      this.numberFrom *= 25.4;
      this.numberTo *= 25.4;
    }
  };
};
