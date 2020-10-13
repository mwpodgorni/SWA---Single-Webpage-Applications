//GENERAL
//DateInterval
class DateInterval {
  constructor(from, to) {
    //required input date format: "yyyy-mm-dd"
    //create proper format
    from = from + "T00:00:00.000Z";
    to = to + "T00:00:00.000Z";
    //create date objects
    this.dateFrom = new Date(from);
    this.dateTo = new Date(to);
  }
  from() {
    //convert to more readable format before returning
    return this.dateFrom.toDateString();
  }
  to() {
    //convert to more readable format before returning
    return this.dateTo.toDateString();
  }
  contains(d) {
    return this.dateFrom < d && d < this.dateTo;
  }
}

//DataType
function DataType(type, unit) {
  this.typeValue = type;
  this.unitValue = unit;
}

DataType.prototype = {
  type: function () {
    return this.typeValue;
  },
  unit: function () {
    return this.unitValue;
  },
  setUnit: function (unit) {
    this.unitValue = unit;
  },
};

//Event
function Event(time, place) {
  //required input time format: "yyyy-mm-ddThh:mm:ss"
  time = time + ".000Z";
  this.timeValue = new Date(time);
  this.placeValue = place;
}
Event.prototype = {
  time: function () {
    return this.timeValue;
  },
  place: function () {
    return this.placeValue;
  },
};

//PREDICTIONS

//WeatherPrediction
function WeatherPrediction(time, place, type, unit, numberTo, numberFrom) {
  Event.call(this, time, place);
  DataType.call(this, type, unit);
  this.numberTo = numberTo;
  this.numberFrom = numberFrom;
}

//mix Event prototype with DataType prototype
WeatherPrediction.prototype = Object.create(Event.prototype);
Object.assign(WeatherPrediction.prototype, DataType.prototype);


//add  function to WeatherData prototype
WeatherPrediction.prototype.match = function (data) {
  if (data.value() <= this.to() && data.value() >= this.from()) {
    return true;
  } else {
    return false;
  }
};
WeatherPrediction.prototype.to = function () {
  return this.numberTo;
};
WeatherPrediction.prototype.setTo = function (n) {
  this.numberTo = n;
};
WeatherPrediction.prototype.from = function () {
  return this.numberFrom;
};
WeatherPrediction.prototype.setFrom = function (n) {
  this.numberFrom = n;
};

//TemperaturePrediction
function TemperaturePrediction(time, place, type, unit, numberTo, numberFrom) {
  WeatherPrediction.call(this, time, place, type, unit, numberTo, numberFrom);
}
TemperaturePrediction.prototype = Object.create(WeatherPrediction.prototype);
TemperaturePrediction.prototype.matches = function (data) {
  return this.match(data);
}
TemperaturePrediction.prototype.convertToF = function () {
  if (this.unit() == "International") {
    return new TemperaturePrediction (this.time(), this.place(), this.type(), this.unit(), ((this.from() * 9) / 5 + 32 ) , ((this.to() * 9) / 5 + 32 )   )
  }
  else {
    return new TemperaturePrediction (this.time(), this.place(), this.type(), this.unit(), this.from() , this.to()  );
  }


};
TemperaturePrediction.prototype.convertToC = function () {
  if (this.unit() == "US") {
    return new TemperaturePrediction (this.time(), this.place(), this.type(), this.unit(), (((this.from() - 32) * 5) / 9) , (((this.to() - 32) * 5) / 9)   )
  }
  else {
    return new TemperaturePrediction (this.time(), this.place(), this.type(), this.unit(), this.from() , this.to()  );
  }
};

//PrecipitationPrediction class
function PrecipitationPrediction(
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
}
PrecipitationPrediction.prototype = Object.create(WeatherPrediction.prototype);
PrecipitationPrediction.prototype.types = function () {
  return this.types;
};
PrecipitationPrediction.prototype.matches = function (data) {
  if (data instanceof Precipitation) {
    if (
      this.typesValue.indexOf(data.precipitationType()) > -1 &&
      this.match(data) &&
      String(weatherData.time()) == String(this.time()) &&
      data.place() == this.place() &&
      data.type() == this.type() &&
      data.unit() == this.unit()
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
PrecipitationPrediction.prototype.convertToInches = function () {
  if (this.unit() == "International") {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), (this.to() / 25.4), (this.from() / 25.4), this.types() );
  }
  else {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.types());
  }
};
PrecipitationPrediction.prototype.convertToMM = function () {
  if (this.unit() == "US") {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), (this.to() * 25.4), (this.from() * 25.4), this.types() );
  }
  else {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.types());
  }

};

//WindPrediction
function WindPrediction(
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
}
WindPrediction.prototype = Object.create(WeatherPrediction.prototype);
WindPrediction.prototype.directions = function () {
  return this.directionsValue;
};
WindPrediction.prototype.matches = function (data) {
  if (data instanceof Wind) {
    if (
      this.directionsValue.indexOf(data.direction()) > -1 &&
      this.match(data) &&
      data.place() == this.place() &&
      data.type() == this.type() &&
      data.unit() == this.unit() &&
      String(data.time()) == String(this.time())
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
WindPrediction.prototype.convertToMPH = function () {
  if (this.unit() == "International") {
    return new WindPrediction(this.time(), this.place(), this.type(), this.unit(), (this.to()/ 2.237) , (this.from()/ 2.237) , this.directions());
  }
  else {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.directions());
  }
};
WindPrediction.prototype.convertToMS = function () {
  if (this.unit() == "US") {
    return new WindPrediction(this.time(), this.place(), this.type(), this.unit(), (this.to() * 2.237) , (this.from() * 2.237) , this.directions());
  }
  else {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.directions());
  }
};
//CloudCoveragePrediciton
function CloudCoveragePrediction(
  time,
  place,
  type,
  unit,
  numberTo,
  numberFrom
) {
  WeatherPrediction.call(this, time, place, type, unit, numberTo, numberFrom);
}

class WeatherForecast {
  constructor(data) {
    this.weatherPredictionData = data;
    // this.currentPlace = null;
    // this.currentType = null;
    // this.currentPeriod = null;
  }
 
  forPlace (place) {
    return this.weatherPredictionData.filter (element => element.place() == place)      
  }

  forType (type) {
    return this.weatherPredictionData.filter (element => element.type() == type)      
  }

  forPeriod (period) {
    return this.weatherPredictionData.filter (element => period.contains(element.time()))    
  }

  convertToUSUnits() {
    return this.weatherPredictionData.map(element => {
      var temp = Object.assign({}, element);
            if (element instanceof WindPrediction) {
                    temp = element.convertToMPH();
            } else if (element instanceof PrecipitationPrediction) {
                    temp = element.convertToInches();
            } else if (element instanceof TemperaturePrediction) {
                    temp = element.convertToF();
            }
            temp.setUnit("US");
      return temp;
  });

  }


  convertToInternationalUnits() {

    return this.weatherPredictionData.map(element => {
      var temp = Object.assign({}, element);
            if (element instanceof WindPrediction) {
                    temp = element.convertToMS();
            } else if (element instanceof PrecipitationPrediction) {
                    temp = element.convertToMM();
            } else if (element instanceof TemperaturePrediction) {
                    temp = element.convertToC();
            }
            temp.setUnit("International");
      return temp;
  });
  }
 
  averageFromValue() {
     let valuesArr = this.weatherPredictionData.map(item => item.from())
     return valuesArr.reduce((a, b) => (a + b)) / valuesArr.length;
  }

  averageToValue() {
    let valuesArr = this.weatherPredictionData.map(item => item.to())
    return valuesArr.reduce((a, b) => (a + b)) / valuesArr.length;
 }

  including(data) {
    // this.weatherPredictionData.concat(data);
    return new WeatherForecast(this.weatherPredictionData.concat(data));
  }
  
  data() {
    return this.weatherPredictionData;
  }
}

//WEATHER DATA
//WeatherData
function WeatherData(time, place, type, unit, value) {
  Event.call(this, time, place);
  DataType.call(this, type, unit);
  this.weatherDataValue = value;
}

//mix Event prototype with DataType prototype
WeatherData.prototype = Object.create(Event.prototype);
Object.assign(WeatherData.prototype, DataType.prototype);
//add value function to WeatherData prototype
WeatherData.prototype.value = function () {
  return this.weatherDataValue;
};
WeatherData.prototype.setValue = function (v) {
  this.weatherDataValue = v;
};

//Temperature
function Temperature(time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);
}
Temperature.prototype = Object.create(WeatherData.prototype);
Temperature.prototype.convertToF = function () {
  if (this.unit() == "International") {
    return new Temperature (this.time(), this.place(), this.type(), this.unit(), ((this.value() * 9) / 5 + 32 ))
  }
  else {
    return new Temperature (this.time(), this.place(), this.type(), this.unit(), this.value()  );
  }



};
Temperature.prototype.convertToC = function () {
  if (this.unit() == "US") {
    return new Temperature (this.time(), this.place(), this.type(), this.unit(), (((this.velue() - 32) * 5) / 9) )
  }
  else {
    return new Temperature (this.time(), this.place(), this.type(), this.unit(), this.value()  );
  }
};

//Precipitation
function Precipitation(time, place, type, unit, value, precipitationType) {
  WeatherData.call(this, time, place, type, unit, value);
  this.precipitationTypeValue = precipitationType;
}
Precipitation.prototype = Object.create(WeatherData.prototype);
Precipitation.prototype.precipitationType = function () {
  return this.precipitationTypeValue;
};
Precipitation.prototype.convertToInches = function () {
  if (this.unit() == "International") {
    return new Precipitation(this.time(), this.place(), this.type(), this.unit(), (this.value() / 25.4), this.precipitationType() );
  }
  else {
    return new Precipitation(this.time(), this.place(), this.type(), this.unit(), this.value(),  this.precipitationType() );
  }
};
Precipitation.prototype.convertToMM = function () {
  if (this.unit() == "US") {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), (this.value() * 25.4), this.precipitationType()  );
  }
  else {
    return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(),this.precipitationType() );
  }
};

//Wind
function Wind(time, place, type, unit, value, direction) {
  WeatherData.call(this, time, place, type, unit, value);
  this.directionValue = direction;
}
Wind.prototype = Object.create(WeatherData.prototype);
Wind.prototype.direction = function () {
  return this.directionValue;
};
Wind.prototype.convertToMPH = function () {
  if (this.unit() == "International") {
    this.setValue(this.value() * 2.237);
  }
};
Wind.prototype.convertToMS = function () {
  if (this.unit() == "US") {
    this.setValue(this.value() / 2.237);
  }
};

//CloudCoverage
function CloudCoverage(time, time, place, type, unit, value) {
  WeatherData.call(this, time, place, type, unit, value);
}
CloudCoverage.prototype = Object.create(WeatherData.prototype);




//WeatherHistory
class WeatherHistory {
  constructor(data) {
    this.weatherData = data;
  }

  forPlace (place) {
    return this.weatherData.filter (element => element.place() == place)      
  }

  forType (type) {
    return this.weatherData.filter (element => element.type() == type)      
  }

  forPeriod (period) {
    return this.weatherData.filter (element => period.contains(element.time()))    
  }

 
  convertToUSUnits() {
    return this.weatherData.map(element => {
      var temp = Object.assign({}, element);
            if (element instanceof WindPrediction) {
                    temp = element.convertToMPH();
            } else if (element instanceof PrecipitationPrediction) {
                    temp = element.convertToInches();
            } else if (element instanceof TemperaturePrediction) {
                    temp = element.convertToF();
            }
            temp.setUnit("US");
      return temp;
  });
  }
  convertToInternationalUnits() {
    return this.weatherData.map(element => {
      var temp = Object.assign({}, element);
            if (element instanceof WindPrediction) {
                    temp = element.convertToMS();
            } else if (element instanceof PrecipitationPrediction) {
                    temp = element.convertToMM();
            } else if (element instanceof TemperaturePrediction) {
                    temp = element.convertToC();
            }
            temp.setUnit("International");
      return temp;
  });
  }

  including(data) {
    return new WeatherHistory(this.weatherData.concat(data));
  }

  lowestValue() {
    let valuesArr = this.weatherData.map(item => ({value: item.value() , type: item.type()} ));
    if (! valuesArr.every( (val, i, arr) => val.type === arr[0].type ) ) {
      console.log ('value below is intentional ');
      return undefined;
    }
    else {
      return valuesArr.reduce((a,b) => (a.value > b.value ? b.value : a.value ));
    }
  }

  data() {
    return this.weatherData;
  }
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
  new Temperature("2000-01-01T02:00:00", "Horsens", "type1", "US", 200),
  new Temperature("2000-01-02T02:00:00", "Vejle", "type1", "US", 150),
  new Precipitation(
    "2000-01-03T02:00:00",
    "Arhus",
    "type3",
    "US",
    500,
    "precipitationType1"
  ),
  new Precipitation(
    "2000-01-04T02:00:00",
    "Alborg",
    "type4",
    "US",
    600,
    "precipitationType2"
  ),
  new Wind("2000-01-05T02:00:00", "Kolding", "type5", "US", 300, "East"),
  new Wind("2000-01-06T02:00:00", "Billund", "type6", "US", 350, "West"),
];

let weatherPrediction = [
  new TemperaturePrediction(
    "2000-01-01T02:00:00",
    "Horsens",
    "type1",
    "International",
    1000,
    100
  ),
  new TemperaturePrediction(
    "2000-01-02T02:00:00",
    "Vejle",
    "type2",
    "International",
    600,
    300
  ),
  new PrecipitationPrediction(
    "2000-01-03T02:00:00",
    "Arhus",
    "type3",
    "US",
    700,
    400,
    ["precipitationType1", "precipitationType5"]
  ),
  new PrecipitationPrediction(
    "2000-01-04T02:00:00",
    "Alborg",
    "type4",
    "US",
    800,
    400,
    ["precipitationType2", "precipitationType7"]
  ),
  new WindPrediction(
    "2000-01-05T02:00:00",
    "Kolding",
    "type5",
    "US",
    500,
    300,
    ["East", "South"]
  ),
  new WindPrediction(
    "2000-01-06T02:00:00",
    "Billund",
    "type6",
    "US",
    600,
    250,
    ["West", "North"]
  ),
];
let weatherHistory = new WeatherHistory(weatherData);
let weatherForecast = new WeatherForecast(weatherPrediction);

console.log ("convertToInternationalUnits ", weatherForecast.convertToInternationalUnits());

console.log ("Lowest value  ", weatherHistory.lowestValue());
console.log ("including", weatherHistory.including(weatherData));



//Display weather forecast data with 3 filters
// weatherForecast.setCurrentPlace("Horsens");
// weatherForecast.setCurrentType("type1");
//Date Interval input: yyyy-mm-dd
// weatherForecast.setCurrentPeriod(new DateInterval("1990-02-01", "2010-02-01"));



// check matches methods
// console.log(
//   "Matching 1st elemet of weather forecast with 1st element of weather history:"
// );
// console.log(
//   "match:" + weatherForecast.data()[0].matches(weatherHistory.data()[0])
// );
// console.log(
//   "Matching 2nd elemet of weather forecast with 1st element of weather history:"
// );
// console.log(
//   "match:" + weatherForecast.data()[1].matches(weatherHistory.data()[0])
// );
// console.log(
//   "Matching 5th elemet of weather forecast with 5th element of weather history:"
// );
// console.log(
//   "match:" + weatherForecast.data()[4].matches(weatherHistory.data()[4])
// );
// console.log(
//   "Matching 3rd elemet of weather forecast with element 5th of weather history:"
// );
// console.log(
//   "match:" + weatherForecast.data()[2].matches(weatherHistory.data()[4])
// );




//
//converstion method:
// console.log(
//   "\nunit of the first element of weather history: " +
//     weatherHistory.data()[0].unit()
// );

// //converting
// weatherHistory.convertToInternationalUnits();

// console.log(
//   "\nunit of the first element of weather history after conversion: " +
//     weatherHistory.data()[0].unit()
// );
