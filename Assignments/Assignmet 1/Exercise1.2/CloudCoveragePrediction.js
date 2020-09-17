const WeatherPrediction = require("./WeatherPrediction");

module.exports = function CloudCoveragePrediction(
  time,
  place,
  type,
  unit,
  numberTo,
  numberFrom
) {
  WeatherPrediction.call(this, time, place, type, unit, numberTo, numberFrom);
};
