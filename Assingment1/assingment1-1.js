//GENERAL
//DateInterval
function DateInterval(from, to) {
  return {
    fromValue: from,
    toValue: to,

    from() {
      return this.fromValue;
    },
    to() {
      return this.toValue;
    },
    contains(date) {
      if (date > this.fromValue && date < this.toValue) {
        return true;
      } else {
        return false;
      }
    },
  };
}

//DataType
function DataType(options) {
  return {
    typeValue: options.type,
    unitValue: options.unit,
    type() {
      return this.typeValue;
    },
    unit() {
      return this.unitValue;
    },
    setUnit(unit) {
      this.unitValue = unit;
    },
  };
}

//Event
function Event(options) {
  return {
    timeValue: options.time,
    placeValue: options.place,
    time() {
      return this.timeValue;
    },
    place() {
      return this.placeValue;
    },
  };
}

// PREDICTIONS

//WeatherPrediction
function WeatherPrediction(options) {
  return {
    ...Event(options),
    ...DataType(options),
    fromValue: options.from,
    toValue: options.to,

    matches(weatherData) {
      if (
        weatherData.value() < this.to() &&
        weatherData.value() > this.from()
      ) {
        return true;
      } else {
        return false;
      }
    },
    to() {
      return this.toValue;
    },
    setTo(n) {
      this.toValue = n;
    },
    from() {
      return this.fromValue;
    },
    setFrom(n) {
      this.fromValue = n;
    },
  };
}

//TemperaturePrediction
function TemperaturePrediction(time, place, type, unit, to, from) {
  const options = { time, place, type, unit, from, to };

  return {
    ...WeatherPrediction(options),

    convertToUSUnits() {
      this.convertToF();
    },
    convertToF() {
      if (this.unit() == "EU") {
        this.setFrom((this.from() * 9) / 5 + 32);
        this.setTo((this.to() * 9) / 5 + 32);
      }
    },
    convertToInternationalUnits() {
      this.convertToC();
    },
    convertToC() {
      if (this.unit() == "US") {
        this.setFrom(((this.from() - 32) * 5) / 9);
        this.setTo(((this.to() - 32) * 5) / 9);
      }
    },
  };
}

//PrecipitationPrediction
function PrecipitationPrediction(time, place, type, unit, to, from, types) {
  const options = { time, place, type, unit, to, from, types };

  return {
    ...WeatherPrediction(options),
    typesValue: types,

    types() {
      return this.typesValue;
    },
    matches(weatherData) {
      if (typeof weatherData.precipitationType == "function") {
        if (this.typesValue.indexOf(weatherData.precipitationType()) > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    convertToUSUnits() {
      this.convertToInches();
    },
    convertToInches() {
      if (this.unit() == "EU") {
        this.setFrom(this.from() / 25.4);
        this.setTo(this.to() / 25.4);
      }
    },
    convertToInternationalUnits() {
      this.convertToMM();
    },
    convertToMM() {
      if (this.unit() == "US") {
        this.setFrom(this.from() * 25.4);
        this.setTo(this.to() * 25.4);
      }
    },
  };
}

function WindPrediction(time, place, type, unit, to, from, directions) {
  const options = { time, place, type, unit, to, from };

  return {
    ...WeatherPrediction(options),
    directionsValue: directions,

    directions() {
      return this.directionsValue;
    },
    matches(weatherData) {
      if (this.directionsValue.indexOf(weatherData.direction()) > -1) {
        return true;
      } else {
        return false;
      }
    },
    convertToUSUnits() {
      this.convertToMPH();
    },
    convertToMPH() {
      if (this.unit() == "EU") {
        this.setFrom(this.from() / 2.237);
        this.setTo(this.to() / 2.237);
      }
    },
    convertToInternationalUnits() {
      this.convertToMS();
    },
    convertToMS() {
      if (this.unit() == "US") {
        this.setFrom(this.from() * 2.237);
        this.setTo(this.to() * 2.237);
      }
    },
  };
}

//CloudCoveragePrediction
function CloudCoveragePrediction(time, place, type, unit, to, from) {
  const options = { time, place, type, unit, to, from };

  return {
    ...WeatherPrediction(options),
  };
}

//WeatherForecast
function WeatherForecast(data) {
  return {
    dataValue: data,
    currentPlace: null,
    currentType: null,
    currentPeriod: null,

    setCurrentPlace(currentPlaceName) {
      this.currentPlace = currentPlaceName;
    },
    getCurrentPlace() {
      return this.currentPlace;
    },
    clearCurrentPlace() {
      this.currentPlace = null;
    },
    setCurrentType(currentTypeName) {
      this.currentType = currentTypeName;
    },
    getCurrentType() {
      return this.currentType;
    },
    clearCurrentType() {
      this.currentType = null;
    },
    setCurrentPeriod(currentPeriod) {
      this.currentPeriod = currentPeriod;
    },
    getCurrentPeriod() {
      return this.currentPeriod;
    },
    clearCurrentPeriod() {
      this.currentPeriod = null;
    },
    convertToUSUnits() {
      if (this.dataValue != null) {
        this.dataValue.forEach((element) => {
          if (element.unit() == "EU") {
            element.convertToUSUnits();
            element.setUnit("US");
          }
        });
      }
    },
    convertToInternationalUnits() {
      if (this.dataValue != null) {
        this.dataValue.forEach((element) => {
          if (element.unit() == "US") {
            element.convertToInternationalUnits();
            element.setUnit("EU");
          }
        });
      }
    },
    displayDataWithSpecificPlace(array) {
      let filteredArray = [];
      array.forEach((element) => {
        if (element.place() == this.currentPlace) {
          filteredArray.push(element);
        }
      });
      return filteredArray;
    },
    displayDataWithSpecificType(array) {
      let filteredArray = [];
      array.forEach((element) => {
        if (element.type() == this.currentType) {
          filteredArray.push(element);
        }
      });
      return filteredArray;
    },
    displayDataWithSpecificPeriod(array) {
      let filteredArray = [];
      array.forEach((element) => {
        if (this.currentPeriod.contains(element.time())) {
          filteredArray.push(element);
        }
      });
      return filteredArray;
    },
    add(data) {
      this.dataValue.concat(data);
    },
    data() {
      filterArray = this.dataValue;

      if (this.currentPlace != null) {
        filterArray = this.displayDataWithSpecificPlace(filterArray);
      }
      if (this.currentType != null) {
        filterArray = this.displayDataWithSpecificType(filterArray);
      }
      if (this.currentPeriod != null) {
        filterArray = this.displayDataWithSpecificPeriod(filterArray);
      }
      return filterArray;
    },
  };
}

// WEATHER DATA
//WeatherData
function WeatherData(options) {
  return {
    ...Event(options),
    ...DataType(options),
    weatherDataValue: options.value,

    value() {
      return this.weatherDataValue;
    },
    setValue(v) {
      this.weatherDataValue = v;
    },
  };
}

//Temperature
function Temperature(time, place, type, unit, value) {
  const options = { value, type, unit, time, place };

  return {
    ...WeatherData(options),

    convertToUSUnits() {
      this.convertToF();
    },
    convertToF() {
      if (this.unit() == "EU") {
        this.setValue((this.value() * 9) / 5 + 32);
      }
    },
    convertToInternationalUnits() {
      this.convertToC();
    },
    convertToC() {
      if (this.unit() == "US") {
        this.setValue(((this.value() - 32) * 5) / 9);
      }
    },
  };
}

//Precipitation
function Precipitation(time, place, type, unit, value, precipitationType) {
  const options = { precipitationType, type, unit, time, place };

  return {
    ...WeatherData(options),
    precipitationTypeValue: precipitationType,

    precipitationType() {
      return this.precipitationTypeValue;
    },
    convertToUSUnits() {
      this.convertToInches();
    },
    convertToInches() {
      if (this.unit() == "EU") {
        this.setValue(this.value() / 25.4);
      }
    },
    convertToInternationalUnits() {
      this.convertToMM();
    },
    convertToMM() {
      if (this.unit() == "US") {
        this.setValue(this.value() * 25.4);
      }
    },
  };
}

//Wind
function Wind(time, place, type, unit, value, direction) {
  const options = { time, place, type, unit, value, direction };

  return {
    ...WeatherData(options),
    directionValue: direction,

    direction() {
      return this.directionValue;
    },
    convertToUSUnits() {
      this.convertToMPH();
    },
    convertToMPH() {
      if (this.unit() == "EU") {
        this.setValue(this.value() * 2.237);
      }
    },
    convertToInternationalUnits() {
      this.convertToMS();
    },
    convertToMS() {
      if (this.unit() == "US") {
        this.setValue(this.value() / 2.237);
      }
    },
  };
}

//CloudCoverage
function CloudCoveragePrediction(time, place, type, unit, value) {
  const options = { time, place, type, unit, value };

  return {
    ...WeatherData(options),
  };
}

//WeatherHistory
function WeatherHistory(weatherData) {
  return {
    weatherDataValue: weatherData,
    currentPlace: null,
    currentType: null,
    currentPeriod: null,

    setCurrentPlace(currentPlaceName) {
      this.currentPlace = currentPlaceName;
    },
    getCurrentPlace() {
      return this.currentPlace;
    },
    clearCurrentPlace() {
      this.currentPlace = null;
    },
    setCurrentType(currentTypeName) {
      this.currentType = currentTypeName;
    },
    getCurrentType() {
      return this.currentType;
    },
    clearCurrentType() {
      this.currentType = null;
    },
    setCurrentPeriod(currentPeriod) {
      this.currentPeriod = currentPeriod;
    },
    getCurrentPeriod() {
      return this.currentPeriod;
    },
    clearCurrentPeriod() {
      this.currentPeriod = null;
    },
    convertToUSUnits() {
      if (weatherDataValue != null) {
        this.weatherDataValue.forEach((element) => {
          if (element.unit() == "EU") {
            element.convertToUSUnits();
            element.setUnit("US");
          }
        });
      }
    },
    convertToInternationalUnits() {
      if (this.weatherDataValue != null) {
        this.weatherDataValue.forEach((element) => {
          if (element.unit() == "US") {
            element.convertToInternationalUnits();
            element.setUnit("EU");
          }
        });
      }
    },
    displayDataWithSpecificPlace(array) {
      let filteredArray = [];
      array.forEach((element) => {
        if (element.place() == this.currentPlace) {
          filteredArray.push(element);
        }
      });
      return filteredArray;
    },
    displayDataWithSpecificType(array) {
      let filteredArray = [];
      array.forEach((element) => {
        if (element.type() == this.currentType) {
          filteredArray.push(element);
        }
      });
      return filteredArray;
    },
    displayDataWithSpecificPeriod(array) {
      let filteredArray = [];
      array.forEach((element) => {
        if (this.currentPeriod.contains(element.time())) {
          filteredArray.push(element);
        }
      });
      return filteredArray;
    },
    add(weatherData) {
      this.weatherDataValue.concat(weatherData);
    },
    data() {
      filterArray = this.weatherDataValue;

      if (this.currentPlace != null) {
        filterArray = this.displayDataWithSpecificPlace(filterArray);
      }
      if (this.currentType != null) {
        filterArray = this.displayDataWithSpecificType(filterArray);
      }
      if (this.currentPeriod != null) {
        filterArray = this.displayDataWithSpecificPeriod(filterArray);
      }

      return filterArray;
    },
  };
}

//
//
//
//
//
//
//
//Program Test
//create dummy data
let weatherData = [
  new Temperature(
    new Date("2000-01-01T02:00:00"),
    "Horsens",
    "type1",
    "US",
    200
  ),
  new Temperature(new Date("2000-01-02T02:00:00"), "Vejle", "type2", "US", 150),
  new Precipitation(
    new Date("2000-01-03T02:00:00"),
    "Arhus",
    "type3",
    "US",
    500,
    "precipitationType1"
  ),
  new Precipitation(
    new Date("2000-01-04T02:00:00"),
    "Alborg",
    "type4",
    "US",
    600,
    "precipitationType2"
  ),
  new Wind(
    new Date("2000-01-05T02:00:00"),
    "Kolding",
    "type5",
    "US",
    300,
    "East"
  ),
  new Wind(
    new Date("2000-01-06T02:00:00"),
    "Billund",
    "type6",
    "US",
    350,
    "West"
  ),
];

let weatherPrediction = [
  new TemperaturePrediction(
    new Date("2000-01-01T02:00:00"),
    "Horsens",
    "type1",
    "US",
    1000,
    100
  ),
  new TemperaturePrediction(
    new Date("2000-01-02T02:00:00"),
    "Vejle",
    "type2",
    "US",
    600,
    300
  ),
  new PrecipitationPrediction(
    new Date("2000-01-03T02:00:00"),
    "Arhus",
    "type3",
    "US",
    700,
    400,
    ["precipitationType1", "precipitationType5"]
  ),
  new PrecipitationPrediction(
    new Date("2000-01-04T02:00:00"),
    "Alborg",
    "type4",
    "US",
    800,
    400,
    ["precipitationType2", "precipitationType7"]
  ),
  new WindPrediction(
    new Date("2000-01-05T02:00:00"),
    "Kolding",
    "type5",
    "US",
    500,
    300,
    ["East", "South"]
  ),
  new WindPrediction(
    new Date("2000-01-06T02:00:00"),
    "Billund",
    "type6",
    "US",
    600,
    250,
    ["West", "North"]
  ),
];
let weatherForecast = new WeatherForecast(weatherPrediction);
let weatherHistory = new WeatherHistory(weatherData);

//Display weather history data with 3 filters
weatherHistory.setCurrentPlace("Alborg");
weatherHistory.setCurrentType("type4");
weatherHistory.setCurrentPeriod(
  new DateInterval(
    new Date("1990-02-01T02:00:00"),
    new Date("2010-02-01T02:00:00")
  )
);
//display filtered data
console.log(
  "\nweather history data with filters: place - " +
    weatherHistory.getCurrentPlace() +
    ", type - " +
    weatherHistory.getCurrentType() +
    ", period - " +
    weatherHistory.getCurrentPeriod().from() +
    " : " +
    weatherHistory.getCurrentPeriod().to()
);
console.log(weatherHistory.data());

//Display weather forecast data with 3 filters
weatherForecast.setCurrentPlace("Horsens");
weatherForecast.setCurrentType("type1");
//Date Interval input: yyyy-mm-dd
weatherForecast.setCurrentPeriod(
  new DateInterval(
    new Date("1990-02-01T02:00:00"),
    new Date("2010-02-01T02:00:00")
  )
);

//display filtered data
console.log(
  "\nweather forecast data with filters: place - " +
    weatherForecast.getCurrentPlace() +
    ", type - " +
    weatherForecast.getCurrentType() +
    ", period - " +
    weatherForecast.getCurrentPeriod().from() +
    " : " +
    weatherForecast.getCurrentPeriod().to()
);
console.log(weatherForecast.data());

weatherHistory.clearCurrentPlace();
weatherHistory.clearCurrentType();
weatherHistory.clearCurrentPeriod();

weatherForecast.clearCurrentPlace();
weatherForecast.clearCurrentType();
weatherForecast.clearCurrentPeriod();

// check matches methods
console.log(
  "Matching 1st elemet of weather forecast with 1st element of weather history:"
);
console.log(
  "match:" + weatherForecast.data()[0].matches(weatherHistory.data()[0])
);
console.log(
  "Matching 2nd elemet of weather forecast with 1st element of weather history:"
);
console.log(
  "match:" + weatherForecast.data()[1].matches(weatherHistory.data()[0])
);
console.log(
  "Matching 5th elemet of weather forecast with 5th element of weather history:"
);
console.log(
  "match:" + weatherForecast.data()[4].matches(weatherHistory.data()[4])
);
console.log(
  "Matching 3rd elemet of weather forecast with element 5th of weather history:"
);
console.log(
  "match:" + weatherForecast.data()[2].matches(weatherHistory.data()[4])
);

//converstion method:
console.log(
  "\nunit of the first element of weather history: " +
    weatherHistory.data()[0].unit()
);

//converting
weatherHistory.convertToInternationalUnits();

console.log(
  "\nunit of the first element of weather history after conversion: " +
    weatherHistory.data()[0].unit()
);
