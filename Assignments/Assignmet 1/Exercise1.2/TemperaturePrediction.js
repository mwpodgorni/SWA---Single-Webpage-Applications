const WeatherPrediction = require("./WeatherPrediction");

module.exports = function TemperaturePrediction(
  time,
  place,
  type,
  unit,
  numberTo,
  numberFrom
) {
  WeatherPrediction.call(this, time, place, type, unit, numberTo, numberFrom);

  TemperaturePrediction.prototype = Object.create(WeatherPrediction.prototype);
  TemperaturePrediction.prototype.convertToF = function () {
    if (this.unit() == "International") {
      this.numberFrom = (this.numberFrom * 9) / 5 + 32;
      this.numberTo = (this.numberTo * 9) / 5 + 32;
    }
  };
  TemperaturePrediction.prototype.convertToC = function () {
    if (this.unit() == "US") {
      this.numberFrom = ((this.numberFrom - 32) * 5) / 9;
      this.numberTo *= ((this.numberTo - 32) * 5) / 9;
    }
  };
  TemperaturePrediction.prototype.test = function () {
    this.to();
  };
};
