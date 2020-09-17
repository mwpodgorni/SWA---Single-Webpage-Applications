const Temperature = require("./Temperature");
const Precipitation = require("./Precipitation");
const Wind = require("./Wind");
const WeatherHistory = require("./WeatherHistory");
const TemperaturePrediction = require("./TemperaturePrediction");
const PrecipitationPrediction = require("./PrecipitationPrediction");
const WindPrediction = require("./WindPrediction");
const WeatherForecast = require("./WeatherForecast");
const WeatherData = require("./WeatherData");

// let weatherData = [
//   new Temperature("2000-01-01T02:00:00", "Horsens", "type1", "US", 200),
//   new Temperature("2000-01-02T02:00:00", "Vejle", "type2", "US", 150),
//   new Precipitation(
//     "2000-01-03T02:00:00",
//     "Arhus",
//     "type3",
//     "US",
//     500,
//     "precipitationType1"
//   ),
//   new Precipitation(
//     "2000-01-04T02:00:00",
//     "Alborg",
//     "type4",
//     "US",
//     600,
//     "precipitationType2"
//   ),
//   new Wind("2000-01-05T02:00:00", "Kolding", "type5", "US", 300, "East"),
//   new Wind("2000-01-06T02:00:00", "Billund", "type6", "US", 350, "West"),
// ];
// let weatherHistory = new WeatherHistory(weatherData);

// let weatherPrediction = [
//   new TemperaturePrediction(
//     "2000-01-01T02:00:00",
//     "Horsens",
//     "type1",
//     "US",
//     1000,
//     100
//   ),
//   new TemperaturePrediction(
//     "2000-01-02T02:00:00",
//     "Vejle",
//     "type2",
//     "US",
//     600,
//     300
//   ),
//   new PrecipitationPrediction(
//     "2000-01-03T02:00:00",
//     "Arhus",
//     "type3",
//     "US",
//     700,
//     400,
//     ["precipitationType1", "precipitationType5"]
//   ),
//   new PrecipitationPrediction(
//     "2000-01-04T02:00:00",
//     "Alborg",
//     "type4",
//     "US",
//     800,
//     400,
//     ["precipitationType2", "precipitationType7"]
//   ),
//   new WindPrediction(
//     "2000-01-05T02:00:00",
//     "Kolding",
//     "type5",
//     "US",
//     500,
//     300,
//     ["East", "South"]
//   ),
//   new WindPrediction(
//     "2000-01-06T02:00:00",
//     "Billund",
//     "type6",
//     "US",
//     600,
//     250,
//     ["West", "North"]
//   ),
// ];
// let weatherForecast = new WeatherForecast(weatherPrediction);
let weatherData = [];
weatherData[0] = new Temperature(
  "2000-01-01T02:00:00",
  "Horsens",
  "type1",
  "US",
  200
);
console.log("1");
console.log(weatherData[0]);
weatherData[0] = new Temperature(
  "2000-01-01T02:00:00",
  "Horsens",
  "type1",
  "US",
  200
);
console.log("2");
console.log(weatherData[0]);

// let test = new Temperature("time", "place", "type", "unit", "value");
// console.log(test.unit());
// predictionArray = [];
// predictionArray.push(
//   new WeatherPrediction("2000-01-01T02:00:00", "place1", "type1", "unit1", 5, 1)
// );
// predictionArray.push(
//   new WeatherPrediction("2010-01-02T02:00:00", "place2", "type2", "unit2", 5, 1)
// );
// predictionArray.push(
//   new WeatherPrediction("2000-01-03T02:00:00", "place3", "type3", "unit3", 5, 1)
// );
// predictionArray.push(
//   new WeatherPrediction("2000-01-04T02:00:00", "place4", "type4", "unit4", 5, 1)
// );
// test = new WeatherForecast(predictionArray);

// test.setCurrentPeriod(new DateInterval("1999-01-01", "2020-01-01"));
// console.log(test.getCurrentPeriod().contains(predictionArray[1].time()));

// a = new DateInterval("1990-01-01", "2020-01-01");
// console.log(predictionArray[1].time());
// console.log(a);
// console.log(a.contains(new Date("2010-01-02T00:00:00.000Z")));

// test.setCurrentPlace("place2");
// test.setCurrentType("type2");
// test.setCurrentPeriod(new DateInterval("2000-01-01", "2020-01-01"));
// console.log(predictionArray[1].time());
// test2 = new DateInterval("1999-01-01", "2020-01-01");
// console.log(test.getCurrentPeriod());
// console.log(test.data());
// console.log(test2.contains("2010-01-02"));

// arr = [
//   new WeatherPrediction(
//     "time",
//     "place",
//     "type",
//     "unit",
//     "numberTo",
//     "numbeFrom"
//   ),
//   new WeatherPrediction(
//     "time",
//     "place",
//     "type",
//     "unit",
//     "numberTo",
//     "numbeFrom"
//   ),
// ];

// test = new WeatherForecast(arr);
// console.log(test.getCurrentPlace());

// test = new Date(2020, 11, 17);
// console.log(test);
