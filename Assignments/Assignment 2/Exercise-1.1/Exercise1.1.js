// //GENERAL
// //DateInterval
function DateInterval(_from, _to) {

      const from = () => _from
      
      const to = () => _to

      const contains = (date) => { 
        (date > _from && date < _to) ? true : false
      }

      return {from, to, contains}
}



//DataType
function DataType(options) {
    const _type = options.type;
    const _unit = options.unit;

      const type = () => _type

      const unit = () => _unit
      
      const setUnit = (unit) =>   DataType ({type: _type, unit: unit})

      return {type, unit, setUnit}
}

var dt = DataType({type: 'piska', unit: 'cm'});
console.log ('dt1: ', dt.unit());
dt = dt.setUnit('mm');
console.log ('dt2: ', dt.unit());



//Event
function Event(options) {

    const _time = options.time;
    const _place = options.place;

      const time = () => _time

      const place = () => _place

      return {time, place}
}

ev = Event({time: '12:45', place: 'Horsens'});

// PREDICTIONS

//WeatherPrediction
function WeatherPrediction(options) {
  
  const _from = options.from;
  const _to = options.to;

  

    const matchesValue = weatherData => (weatherData.value() <= this.to() &&
                                        weatherData.value() >= this.from() ) ? true : false
    
    const to = () => _to
    
    const setTo = (n) => WeatherPrediction({from: _from, to: n})

    const from = () => _from

    const setFrom = (n) => WeatherPrediction({from: n, to: _to})

    return {...Event(options), ...DataType(options), matchesValue, to, setTo, from, setFrom} 

}


// weatherPr1 = WeatherPrediction ({from: 1, to: 5, time: '12:45', place: 'Horsens', type: 'piska', unit: 'cm' });
// console.log ('weatherPr1  ', weatherPr1.setTo('5'));

// wdata1 = WeatherData ({value: 3});
// tempPr1 = TemperaturePrediction ({time: '12:45', place: 'Horsens', type: 'piska', unit: 'cm' ,  to: '20', from: '10' });
// console.log ('====, ' ,tempPr1.from());


// console.log ('matches ', weatherPr1.matchesValue (wdata1) );




TemperaturePrediction
function TemperaturePrediction(time, place, type, unit, to, from) {
  const options = { time, place, type, unit, from, to };

  const matches = () => (this.matchesValue(weatherData) &&
                         String(weatherData.time()) == String(this.time()) &&
                         weatherData.place() == this.place() &&
                         weatherData.type() == this.type() &&
                         weatherData.unit() == this.unit() 
                         ) 
                         ? true : false
                         
  const convertToUSUnits = () => convertToF()   

  const convertToF = () => 
      (unit == "EU") ? 
                            TemperaturePrediction(time, place, type, unit, 
                                                    this.setTo( (to * 9) / 5 + 32), 
                                                    his.setFrom( (from * 9) / 5 + 32))
                           
                            : 

                            TemperaturePrediction(time, place, type, unit, to, from)


  const convertToInternationalUnits = () =>  convertToC()
  
  const convertToC = () => 
  (unit() == "US") ? 
                        TemperaturePrediction(time, place, type, unit, 
                                                this.setTo( ((to - 32) * 5) / 9 ) , 
                                                his.setFrom( ((from - 32) * 5) / 9 ) )
                       
                        : 

                        TemperaturePrediction(time, place, type, unit, to, from)
                            


  return {...WeatherPrediction(options), matches, convertToUSUnits, convertToF, convertToInternationalUnits, convertToC}
  
  }

  tempPr1 = TemperaturePrediction ({time: '12:45', place: 'Horsens', type: 'piska', unit: 'cm' ,  to: '20', from: '10' });
  // tempPr1 = tempPr1.convertToUSUnits();
  // console.log (tempPr1);




// //PrecipitationPrediction
// function PrecipitationPrediction(time, place, type, unit, to, from, types) {
//   const options = { time, place, type, unit, to, from, types };

//   return {
//     ...WeatherPrediction(options),
//     typesValue: types,

//     types() {
//       return this.typesValue;
//     },
//     matches(weatherData) {
//       if (typeof weatherData.precipitationType == "function") {
//         if (
//           this.typesValue.indexOf(weatherData.precipitationType()) > -1 &&
//           this.matchesValue(weatherData) &&
//           String(weatherData.time()) == String(this.time()) &&
//           weatherData.place() == this.place() &&
//           weatherData.type() == this.type() &&
//           weatherData.unit() == this.unit()
//         ) {
//           return true;
//         } else {
//           return false;
//         }
//       } else {
//         return false;
//       }
//     },
//     convertToUSUnits() {
//       this.convertToInches();
//     },
//     convertToInches() {
//       if (this.unit() == "EU") {
//         this.setFrom(this.from() / 25.4);
//         this.setTo(this.to() / 25.4);
//       }
//     },
//     convertToInternationalUnits() {
//       this.convertToMM();
//     },
//     convertToMM() {
//       if (this.unit() == "US") {
//         this.setFrom(this.from() * 25.4);
//         this.setTo(this.to() * 25.4);
//       }
//     },
//   };
// }

// function WindPrediction(time, place, type, unit, to, from, directions) {
//   const options = { time, place, type, unit, to, from };

//   return {
//     ...WeatherPrediction(options),
//     directionsValue: directions,

//     directions() {
//       return this.directionsValue;
//     },
//     matches(weatherData) {
//       if (
//         this.directionsValue.indexOf(weatherData.direction()) > -1 &&
//         this.matchesValue(weatherData) &&
//         weatherData.place() == this.place() &&
//         weatherData.type() == this.type() &&
//         weatherData.unit() == this.unit() &&
//         String(weatherData.time()) == String(this.time())
//       ) {
//         return true;
//       } else {
//         return false;
//       }
//     },
//     convertToUSUnits() {
//       this.convertToMPH();
//     },
//     convertToMPH() {
//       if (this.unit() == "EU") {
//         this.setFrom(this.from() / 2.237);
//         this.setTo(this.to() / 2.237);
//       }
//     },
//     convertToInternationalUnits() {
//       this.convertToMS();
//     },
//     convertToMS() {
//       if (this.unit() == "US") {
//         this.setFrom(this.from() * 2.237);
//         this.setTo(this.to() * 2.237);
//       }
//     },
//   };
// }

// //CloudCoveragePrediction
// function CloudCoveragePrediction(time, place, type, unit, to, from) {
//   const options = { time, place, type, unit, to, from };

//   return {
//     ...WeatherPrediction(options),
//   };
// }

// //WeatherForecast
// function WeatherForecast(data) {
//   return {
//     dataValue: data,
//     currentPlace: null,
//     currentType: null,
//     currentPeriod: null,

//     setCurrentPlace(currentPlaceName) {
//       this.currentPlace = currentPlaceName;
//     },
//     getCurrentPlace() {
//       return this.currentPlace;
//     },
//     clearCurrentPlace() {
//       this.currentPlace = null;
//     },
//     setCurrentType(currentTypeName) {
//       this.currentType = currentTypeName;
//     },
//     getCurrentType() {
//       return this.currentType;
//     },
//     clearCurrentType() {
//       this.currentType = null;
//     },
//     setCurrentPeriod(currentPeriod) {
//       this.currentPeriod = currentPeriod;
//     },
//     getCurrentPeriod() {
//       return this.currentPeriod;
//     },
//     clearCurrentPeriod() {
//       this.currentPeriod = null;
//     },
//     convertToUSUnits() {
//       if (this.dataValue != null) {
//         this.dataValue.forEach((element) => {
//           if (element.unit() == "EU") {
//             element.convertToUSUnits();
//             element.setUnit("US");
//           }
//         });
//       }
//     },
//     convertToInternationalUnits() {
//       if (this.dataValue != null) {
//         this.dataValue.forEach((element) => {
//           if (element.unit() == "US") {
//             element.convertToInternationalUnits();
//             element.setUnit("EU");
//           }
//         });
//       }
//     },
//     displayDataWithSpecificPlace(array) {
//       let filteredArray = [];
//       array.forEach((element) => {
//         if (element.place() == this.currentPlace) {
//           filteredArray.push(element);
//         }
//       });
//       return filteredArray;
//     },
//     displayDataWithSpecificType(array) {
//       let filteredArray = [];
//       array.forEach((element) => {
//         if (element.type() == this.currentType) {
//           filteredArray.push(element);
//         }
//       });
//       return filteredArray;
//     },
//     displayDataWithSpecificPeriod(array) {
//       let filteredArray = [];
//       array.forEach((element) => {
//         if (this.currentPeriod.contains(element.time())) {
//           filteredArray.push(element);
//         }
//       });
//       return filteredArray;
//     },
//     add(data) {
//       this.dataValue.concat(data);
//     },
//     data() {
//       filterArray = this.dataValue;

//       if (this.currentPlace != null) {
//         filterArray = this.displayDataWithSpecificPlace(filterArray);
//       }
//       if (this.currentType != null) {
//         filterArray = this.displayDataWithSpecificType(filterArray);
//       }
//       if (this.currentPeriod != null) {
//         filterArray = this.displayDataWithSpecificPeriod(filterArray);
//       }
//       return filterArray;
//     },
//   };
// }

// // WEATHER DATA
WeatherData
function WeatherData(options) {
  const _value = options.value;

  const value = () => _value

  const setValue = (v) => WeatherData({value: v})

  return {...Event(options), ...DataType(options), value, setValue}
  // return {
  //   ...Event(options),
  //   ...DataType(options),
  //   weatherDataValue: options.value,

  //   value() {
  //     return this.weatherDataValue;
  //   },
  //   setValue(v) {
  //     this.weatherDataValue = v;
  //   },
  // };
}

// //Temperature
// function Temperature(time, place, type, unit, value) {
//   const options = { value, type, unit, time, place };

//   return {
//     ...WeatherData(options),

//     convertToUSUnits() {
//       this.convertToF();
//     },
//     convertToF() {
//       if (this.unit() == "EU") {
//         this.setValue((this.value() * 9) / 5 + 32);
//       }
//     },
//     convertToInternationalUnits() {
//       this.convertToC();
//     },
//     convertToC() {
//       if (this.unit() == "US") {
//         this.setValue(((this.value() - 32) * 5) / 9);
//       }
//     },
//   };
// }

// //Precipitation
// function Precipitation(time, place, type, unit, value, precipitationType) {
//   const options = { value, precipitationType, type, unit, time, place };

//   return {
//     ...WeatherData(options),
//     precipitationTypeValue: precipitationType,

//     precipitationType() {
//       return this.precipitationTypeValue;
//     },
//     convertToUSUnits() {
//       this.convertToInches();
//     },
//     convertToInches() {
//       if (this.unit() == "EU") {
//         this.setValue(this.value() / 25.4);
//       }
//     },
//     convertToInternationalUnits() {
//       this.convertToMM();
//     },
//     convertToMM() {
//       if (this.unit() == "US") {
//         this.setValue(this.value() * 25.4);
//       }
//     },
//   };
// }

// //Wind
// function Wind(time, place, type, unit, value, direction) {
//   const options = { time, place, type, unit, value, direction };

//   return {
//     ...WeatherData(options),
//     directionValue: direction,

//     direction() {
//       return this.directionValue;
//     },
//     convertToUSUnits() {
//       this.convertToMPH();
//     },
//     convertToMPH() {
//       if (this.unit() == "EU") {
//         this.setValue(this.value() * 2.237);
//       }
//     },
//     convertToInternationalUnits() {
//       this.convertToMS();
//     },
//     convertToMS() {
//       if (this.unit() == "US") {
//         this.setValue(this.value() / 2.237);
//       }
//     },
//   };
// }

// //CloudCoverage
// function CloudCoveragePrediction(time, place, type, unit, value) {
//   const options = { time, place, type, unit, value };

//   return {
//     ...WeatherData(options),
//   };
// }

// //WeatherHistory
// function WeatherHistory(weatherData) {
//   return {
//     weatherDataValue: weatherData,
//     currentPlace: null,
//     currentType: null,
//     currentPeriod: null,

//     setCurrentPlace(currentPlaceName) {
//       this.currentPlace = currentPlaceName;
//     },
//     getCurrentPlace() {
//       return this.currentPlace;
//     },
//     clearCurrentPlace() {
//       this.currentPlace = null;
//     },
//     setCurrentType(currentTypeName) {
//       this.currentType = currentTypeName;
//     },
//     getCurrentType() {
//       return this.currentType;
//     },
//     clearCurrentType() {
//       this.currentType = null;
//     },
//     setCurrentPeriod(currentPeriod) {
//       this.currentPeriod = currentPeriod;
//     },
//     getCurrentPeriod() {
//       return this.currentPeriod;
//     },
//     clearCurrentPeriod() {
//       this.currentPeriod = null;
//     },
//     convertToUSUnits() {
//       if (weatherDataValue != null) {
//         this.weatherDataValue.forEach((element) => {
//           if (element.unit() == "EU") {
//             element.convertToUSUnits();
//             element.setUnit("US");
//           }
//         });
//       }
//     },
//     convertToInternationalUnits() {
//       if (this.weatherDataValue != null) {
//         this.weatherDataValue.forEach((element) => {
//           if (element.unit() == "US") {
//             element.convertToInternationalUnits();
//             element.setUnit("EU");
//           }
//         });
//       }
//     },
//     displayDataWithSpecificPlace(array) {
//       let filteredArray = [];
//       array.forEach((element) => {
//         if (element.place() == this.currentPlace) {
//           filteredArray.push(element);
//         }
//       });
//       return filteredArray;
//     },
//     displayDataWithSpecificType(array) {
//       let filteredArray = [];
//       array.forEach((element) => {
//         if (element.type() == this.currentType) {
//           filteredArray.push(element);
//         }
//       });
//       return filteredArray;
//     },
//     displayDataWithSpecificPeriod(array) {
//       let filteredArray = [];
//       array.forEach((element) => {
//         if (this.currentPeriod.contains(element.time())) {
//           filteredArray.push(element);
//         }
//       });
//       return filteredArray;
//     },
//     add(weatherData) {
//       this.weatherDataValue.concat(weatherData);
//     },
//     data() {
//       filterArray = this.weatherDataValue;

//       if (this.currentPlace != null) {
//         filterArray = this.displayDataWithSpecificPlace(filterArray);
//       }
//       if (this.currentType != null) {
//         filterArray = this.displayDataWithSpecificType(filterArray);
//       }
//       if (this.currentPeriod != null) {
//         filterArray = this.displayDataWithSpecificPeriod(filterArray);
//       }

//       return filterArray;
//     },
//   };
// }

// //
// //
// //
// //
// //
// //
// //
// //Program Test
// //create dummy data
// let weatherData = [
//   new Temperature(
//     new Date("2000-01-01T02:00:00"),
//     "Horsens",
//     "type1",
//     "US",
//     200
//   ),
//   new Temperature(new Date("2000-01-02T02:00:00"), "Vejle", "type2", "US", 150),

//   new Precipitation(
//     new Date("2000-01-03T02:00:00"),
//     "Arhus",
//     "type3",
//     "US",
//     500,
//     "precipitationType1"
//   ),
//   new Precipitation(
//     new Date("2000-01-04T02:00:00"),
//     "Alborg",
//     "type4",
//     "US",
//     600,
//     "precipitationType2"
//   ),
//   new Wind(
//     new Date("2000-01-05T02:00:00"),
//     "Kolding",
//     "type5",
//     "US",
//     300,
//     "East"
//   ),
//   new Wind(
//     new Date("2000-01-06T02:00:00"),
//     "Billund",
//     "type6",
//     "US",
//     350,
//     "West"
//   ),
// ];

// let weatherPrediction = [
//   new TemperaturePrediction(
//     new Date("2000-01-01T02:00:00"),
//     "Horsens",
//     "type1",
//     "US",
//     1000,
//     100
//   ),
//   new TemperaturePrediction(
//     new Date("2000-01-02T02:00:00"),
//     "Vejle",
//     "type2",
//     "US",
//     600,
//     300
//   ),
//   new PrecipitationPrediction(
//     // new Date("2000-01-03T02:00:00"),
//     // "Arhus",
//     // "type3",
//     // "US",
//     // 700,
//     // 400,
//     // ["precipitationType1", "precipitationType5"]
//     new Date("2000-01-03T02:00:00"),
//     "Arhus",
//     "type3",
//     "US",
//     600,
//     400,
//     ["precipitationType1", "precipitationType7"]
//   ),
//   new PrecipitationPrediction(
//     new Date("2000-01-04T02:00:00"),
//     "Alborg",
//     "type4",
//     "US",
//     800,
//     400,
//     ["precipitationType2", "precipitationType7"]
//   ),
//   new WindPrediction(
//     new Date("2000-01-05T02:00:00"),
//     "Kolding",
//     "type5",
//     "US",
//     500,
//     300,
//     ["East", "South"]
//   ),
//   new WindPrediction(
//     new Date("2000-01-06T02:00:00"),
//     "Billund",
//     "type6",
//     "US",
//     600,
//     250,
//     ["West", "North"]
//   ),
// ];
// let weatherForecast = new WeatherForecast(weatherPrediction);
// let weatherHistory = new WeatherHistory(weatherData);

// //Display weather history data with 3 filters
// weatherHistory.setCurrentPlace("Alborg");
// weatherHistory.setCurrentType("type4");
// weatherHistory.setCurrentPeriod(
//   new DateInterval(
//     new Date("1990-02-01T02:00:00"),
//     new Date("2010-02-01T02:00:00")
//   )
// );
// //display filtered data
// console.log(
//   "\nweather history data with filters: place - " +
//     weatherHistory.getCurrentPlace() +
//     ", type - " +
//     weatherHistory.getCurrentType() +
//     ", period - " +
//     weatherHistory.getCurrentPeriod().from() +
//     " : " +
//     weatherHistory.getCurrentPeriod().to()
// );
// console.log(weatherHistory.data());

// //Display weather forecast data with 3 filters
// weatherForecast.setCurrentPlace("Horsens");
// weatherForecast.setCurrentType("type1");
// //Date Interval input: yyyy-mm-dd
// weatherForecast.setCurrentPeriod(
//   new DateInterval(
//     new Date("1990-02-01T02:00:00"),
//     new Date("2010-02-01T02:00:00")
//   )
// );

// //display filtered data
// console.log(
//   "\nweather forecast data with filters: place - " +
//     weatherForecast.getCurrentPlace() +
//     ", type - " +
//     weatherForecast.getCurrentType() +
//     ", period - " +
//     weatherForecast.getCurrentPeriod().from() +
//     " : " +
//     weatherForecast.getCurrentPeriod().to()
// );
// console.log(weatherForecast.data());

// weatherHistory.clearCurrentPlace();
// weatherHistory.clearCurrentType();
// weatherHistory.clearCurrentPeriod();

// weatherForecast.clearCurrentPlace();
// weatherForecast.clearCurrentType();
// weatherForecast.clearCurrentPeriod();

// // // check matches methods
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

// //converstion method:
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
