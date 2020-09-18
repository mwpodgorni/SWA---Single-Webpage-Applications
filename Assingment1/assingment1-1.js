// 1PREDICTIONS

function DateInterval (from, to) {

    return {
        from () {
            return from;
        } ,

        to () {
            return to;
        },

        contains(date) {
            if (date > from && date < to) {
                console.log ('it is in the range');
                return true;
            }
        }
    }
}


from = new Date (2020, 08, 15);
to = new Date (2020, 09, 25);

myDateInterval = new DateInterval(from, to);
// console.log (myDateInterval.contains(new Date()));



function Event(options) {

    function time() {return options.time}
    return {
        timevalue: options.time,  
        time
    }
}

function DataType(options) {
    return {
        typeValue: options.type,
        unitValue: options.unit,
        type() {return options.type},
        unit() { return options.unit},
        setUnit(unit) {
            this.unitValue = unit;
        }
    }
}




function WeatherPrediction(options) {

    return {

        ...Event(options),

        ...DataType(options),  

        from : options.from,
        to : options.to,

        to () { return options.to; },

        from () { return options.from; },


    }
}


// ev1 = new Event('11:30', 'Horsens');
// dt1= new DataType('type', 'europeUnit');

wp1 = WeatherPrediction(from, to, 'type', 'europeUnit', '11:30', 'Horsens');




function TemperaturePrediction (time, place, type, unit, from, to) {
    const options = {time, place, type, unit, from, to};
    
    return {

        ...WeatherPrediction(options),

        matches(weatherData) {
            if ( 
                // weatherData.value() == value  &&
                 weatherData.value() > from &&
                 weatherData.value() < to &&
                 weatherData.time() == time &&  
                 weatherData.place() == place &&
                 weatherData.type() == type &&
                 weatherData.unit() == unit ) 
            {
                return true
            } else {
                return false
            }
        
        },
       
        convertToF() {
            if (unit != 'US') {
                from = (from * 9/5 + 32);
                to = (to * 9/5 + 32);
                type = 'US';

            } 
        },

        convertToInternationalUnits() {
            this.convertToC();
        },

        convertToC() {
            if (unit != 'EU') {
                from  = (from - 32) / (9/5);
                to = (to - 32) / (9/5);
                type = 'EU';
            } 
        }
    }
}


//'types' - is array
function PrecipitationPrediction (time, place, type, unit, from, to, types) {

    
    const options = {time, place, type, unit, from, to, types};

    return {

        ...WeatherPrediction(options),

        types() {
            return types;
        },

        matches (weatherData) {
            if ( 
                 types.includes(weatherData.value) &&
                 weatherData.value() > from &&
                 weatherData.value() < to &&
                 weatherData.time() == time &&
                 weatherData.place() == place &&
                 weatherData.type() == type &&
                 weatherData.unit() == unit &&
                 types.includes(weatherData.precipitationType) ) 
            {
                return true
            } else {
                return false
            }
        
        },


        convertToInches() {
            if (unit != 'US') {
                from = (from * 25.4);
                to = (to * 25.4);
                type = 'US';
            }
        },

        convertToInternationalUnits() {
        
            this.convertToMM();
        },

        convertToMM() {
            if (unit != 'EU') {
                from  = (from / 25.4);
                to = (to / 25.4 );
                type = 'EU'
            } 
        }
    }
}

//'directions' - is array
function WindPrediction (time ,place, type, unit, from, to, directions) {
    const options = {time ,place, type, unit, from, to};

    return {
        ...WeatherPrediction(options),

        directions() {
            return directions
        },

        matches(weatherData) {
            if (
                 weatherData.value() > from &&
                 weatherData.value() < to &&
                 weatherData.time() == time &&
                 weatherData.place() == place &&
                 weatherData.type() == type &&
                 weatherData.unit() == unit &&
                 directions.includes(weatherData.direction)  ) 
            {
                return true
            } else {
                return false
            }
        
        },

        convertToUSUnits() {
            this.convertToMPH();
        },

        convertToMPH() {
            if (unit != 'US') {
                to = (to  * 2.23694);
                from = (from * 2.23694);
            
            }
        },

        convertToInternationalUnits() {
            this.convertToMS();
        },

        convertToMS() {
            if (unit != 'EU') {
                from = (from * 2.23694);
                to = (to * 2.23694);
                type = 'EU'

            } 
        }
    }
}


tp = TemperaturePrediction('25', from, to, 'type', 'EU', '11:30', 'Horsens');


    

function WeatherForecast (data) {

    const displayDataWithSpecificPlace = (array) => {

        let filteredArray = [];
        array.forEach(element => {
            if (element.place() == this.currentPlace ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificType = (array) => {
        let filteredArray = [];
        array.forEach(element => {
            if (element.type() == this.currentType ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificPeriod = (array) => {
        let filteredArray = [];
        array.forEach(element => {
            if (currentPeriod.contains( element.time() ) ) {
                filteredArray.push (element);
            }

        });
        return filteredArray;
    }

    return {
        data: data,

        //Place
        setCurrentPlace(currentPlaceName) {
            currentPlace = currentPlaceName;
        },

        getCurrentPlace() {
           if  (currentPlace != null ) {
                return currentPlace
           }
        },
        
        clearCurrentPlace() {
            currentPlace = null;
        },


        // Type
        setCurrentType(currentTypeName) {
            currentType = currentTypeName;
        },

        getCurrentType() {
            if (currentType != null) {
                return currentType;
            }
        },
        
        clearCurrentType() {
            currentType = null;
        },


        //Period
        setCurrentPeriod(currentPeriod) {
            currentPeriod = currentPeriod;
        },

        getCurrentPeriod() {
            if (currentPeriod != null) {
                return (currentPeriod);
            } 
        },
        
        clearCurrentPeriod() {
            currentPeriod = null;
        },

        
        convertToUSUnits() {
            //use weatherPredictions-> temp predictions convert to F()
            if (data != null){
                data.forEach(element => {
                    element.convertToUSUnits()
                    if (element.unit() == 'EU') {
                        element.setUnit('US');
                    }
                   
                });
            }
        },
        
        convertToInternationalUnits() {
            console.log("it comes")
            if (this.data != null){
                this.data.forEach(element => {
                    element.convertToInternationalUnits();
                    if (element.unit() == 'US') {
                        element.setUnit('EU');
                    }
                });
            }
        },

        add(data) {
            data = data
        },

        data() {

            filteredArray = data;
            
            if (this.currentPlace != null) { displayDataWithSpecificPlace(filteredArray) } 
            if (this.currentType != null) { displayDataWithSpecificType(filteredArray) }
            if (this.currentPeriod != null) { displayDataWithSpecificPeriod(filteredArray) }
            
            return filteredArray;
        }

    }
}






arr = []
wf = WeatherForecast(arr);
wf.setCurrentPlace('Alabama');
// console.log('sweet home - ' ,wf. getCurrentPlace());



// 1DATA


function WeatherData(options) {

    return { 
        ...Event(options),

        ...DataType(options),  

        value() {
            return options.value;
        }    

    }
}



function Temperature (time, place, type, unit, value) {
    const options = {value, type, unit, time, place};

    return {
        valueValue: value,

        value() { return value},
        ...WeatherData(options),
       
        convertToUSUnits () {
            this.convertToF();
        },

        convertToF() {
            if (unit != 'US') {
                this.valueValue = (this.valueValue * 9/5 + 32);
    
            } 
        },
        
        convertToInternationalUnits () {
            this.convertToC();
        },

        convertToC() {
            if (unit != 'EU') {
                this.valueValue = (this.valueValue - 32) / (9/5);
            } 
        
        }
    }
}


function Precipitation (time, place, type, unit, value, precipitationType) {
    
    const options = { precipitationType, type, unit, time, place};

    return {

        valueValue: value,
        
        value() { return value},

        
        ...WeatherPrediction(options),

        precipitationType() {
            return precipitationType;
        },


        convertToUSUnits() {
            this.convertToInches();
        },
        
        convertToInches() {
            if (unit != 'US') {
                this.valueValue = (this.valueValue * 25.4);
            }
        },

        convertToInternationalUnits() {
            this.convertToMM();
        },

        convertToMM() {
            if (unit != 'EU') {
                this.valueValue = (this.valueValue / 25.4);
            } 
        }
    }
}



function Wind (time, place, type, unit, value, direction) {
    
    const options = {time, place, type, unit, value, direction};

    return {

        valueValue: value,

        value() { return value},

        ...WeatherPrediction(options),

        direction() {
            return direction;
        },

        convertToUSUnits() {
            this.convertToMPH();
        },

        convertToMPH() {
            if (unit != 'US') {
                this.valueValue = (this.valueValue  * 2.23694);
            }
        },

        convertToInternationalUnits(){
            this.convertToMS();
        },

        convertToMS() {
            if (unit != 'EU') {
                this.valueValue  = (this.valueValue  / 2.23694);
            } 
        }
    }
}

prec = new Precipitation (2, 'precipitationType1', 'data-type', 'EU', new Date(), 'Horsens' );
// console.log ('prec.value ', prec.value());



function WeatherHistory(weatherData) {

    const displayDataWithSpecificPlace = (array) => {

        let filteredArray = [];
        array.forEach(element => {
            if (element.place() == this.currentPlace ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificType = (array) => {
        let filteredArray = [];
        array.forEach(element => {
            if (element.type() == this.currentType ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificPeriod = (array) => {
        let filteredArray = [];
        array.forEach(element => {
            if (currentPeriod.contains( element.time() ) ) {
                filteredArray.push (element);
            }

        });
        return filteredArray;
    }


    return {
        weatherData: weatherData,

        //Place
        setCurrentPlace(currentPlaceName) {
            currentPlace = currentPlaceName;
        },

        getCurrentPlace() {
            if (currentPlace != null) {
                return (currentPlace);
            } 
        },
        
        clearCurrentPlace() {
            currentPlace = null;
        },


        // Type
        setCurrentType(currentTypeName) {
            currentType = currentTypeName;
        },

        getCurrentType() {
            if (currentType != null) {
               return (currentType);
            } 
        },
        
        clearCurrentType() {
            currentType = null;
        },
       
        //Period
        setCurrentPeriod(currentPeriod) {
            currentPeriod = currentPeriod;
        },

        getCurrentPeriod() {
            if (currentPeriod != null) {
                return (currentPeriod);
            }
        },
        
        clearCurrentPeriod() {
            currentPeriod = null;
        },

        
        convertToUSUnits() {
        console.log("call");
            if (weatherData != null){
                weatherData.forEach(element => {
                    console.log('comes here2');

                    element.convertToUSUnits();

                    if (element.unit() == 'EU') {
                        element.setUnit('US');
                    }

                });
            }
        },
        
        convertToInternationalUnits() {
            console.log('graraa');
            if (this.weatherData != null){
               
                this.weatherData.forEach(element => {
                   
                        element.convertToInternationalUnits();

                        if (element.unit() == 'US') {
                            element.setUnit('EU');
                        }
                   
                });
            }
        },

        add(weatherData) {
            weatherData = weatherData;
        },

        data () {

            filteredArray = weatherData;
            
            if (this.currentPlace != null) { filterArray = displayDataWithSpecificPlace(filteredArray) } 
            if (this.currentType != null) { filterArray = displayDataWithSpecificType(filteredArray) }
            if (this.currentPeriod != null) { filterArray = displayDataWithSpecificPeriod(filteredArray) }
            
            return filteredArray;
        }

    }
}

value = new Date()
// console.log (value);


val = new Date(2020, 10, 1, 12, 0, 0, 0)
// console.log (val.getMonth());



// tempt = new Temperature("2000-01-01T02:00:00", "Horsens", "type1", "US", 200);
// console.log ("", tempt );



// function test(val) {

//     return {
//         val: val,
//     }
// }

// temp = new test ("aaa");
// console.log (temp);



//Program Test
let weatherData = [
    new Temperature("2000-01-01T02:00:00", "Horsens", "type1", "US", 200),
    new Temperature("2000-01-02T02:00:00", "Vejle", "type2", "US", 150),
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

  
  

//   function TemperaturePrediction (time, place, type, unit, from, to) {
  let weatherPrediction = [
    new TemperaturePrediction(
      "2000-01-01T02:00:00",
      "Horsens",
      "type1",
      "US",
      1000,
      100
    ),
    new TemperaturePrediction(
      "2000-01-02T02:00:00",
      "Vejle",
      "type2",
      "US",
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

//   let weatherForecast = new WeatherForecast(weatherPrediction);
  let weatherHistory = new WeatherHistory(weatherData);
  weatherHistory.convertToInternationalUnits();
  console.log ( "!!", weatherHistory.data());

//   console.log ("aa", weatherHistory.data()[0].value;
//   console.log(weatherPrediction)