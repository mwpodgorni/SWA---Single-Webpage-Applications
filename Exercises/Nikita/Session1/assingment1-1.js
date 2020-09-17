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
console.log (myDateInterval.contains(new Date()));



function Event(options) {
    return {
        time() {return options.time},
        place() {return options.place},
    }
}

function DataType(options) {
    return {
        type() {return options.type},
        unit() { return options.unit},
    }
}




function WeatherPrediction(options) {

    return { 
        ...Event(options),

        ...DataType(options),  

        to () { return options.to; },

        from () { return options.from; },

        //matches is in children

    }
}


// ev1 = new Event('11:30', 'Horsens');
// dt1= new DataType('type', 'europeUnit');

wp1 = WeatherPrediction(from, to, 'type', 'europeUnit', '11:30', 'Horsens');




function TemperaturePrediction (value, from, to, type, unit, time, place) {
    const options = {from, to, type, unit, time, place};
    
    return {
        value() { return value},

        ...WeatherPrediction(options),

        matches(weatherData) {
            if ( weatherData.value() == value  &&
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
                value = (value * 9/5 + 32);
            } 
        },

        convertToC() {
            if (unit != 'EU') {
                value = (value - 32) / (9/5);
            } 
        }
    }
}


//'types' - is array
function PrecipitationPrediction (value, types, from, to, type, unit, time, place) {
    
    const options = {from, to, type, unit, time, place};

    return {
        value() { return value},

        ...WeatherPrediction(options),

        types() {
            return types;
        },

        matches(weatherData) {
            if ( weatherData.value() == value  &&
                 weatherData.time() == time &&
                 weatherData.place() == place &&
                 weatherData.type() == type &&
                 weatherData.unit() == unit &&
                 weatherData.types().equals(types()) ) 
            {
                return true
            } else {
                return false
            }
        
        },

        convertToInches() {
            if (unit != 'US') {
                value = (value * 9/5 + 32);
            }
        },

        convertToMM() {
            if (unit != 'EU') {
                value = (value - 32) / (9/5);
            } 
        }
    }
}

//'directions' - is array
function WindPrediction (value, directions, from, to, type, unit, time, place) {
    const options = {from, to, type, unit, time, place};

    return {
        ...WeatherPrediction(options),

        value() { 
            return value
        },

        directions() {
            return directions
        },

        matches(weatherData) {
            if ( weatherData.value() == value  &&
                 weatherData.time() == time &&
                 weatherData.place() == place &&
                 weatherData.type() == type &&
                 weatherData.unit() == unit &&
                 weatherData.directions().equals(directions() ) ) 
            {
                return true
            } else {
                return false
            }
        
        },

        convertToMPH() {
            if (unit != 'US') {
                value = (value * 2.23694);
            }
        },

        convertToMS() {
            if (unit != 'EU') {
                value = (value / 2.23694);
            } 
        }
    }
}


tp = TemperaturePrediction('25', from, to, 'type', 'EU', '11:30', 'Horsens');
// console.log ('tpvalue: ', tp);




function WeatherForecast (data) {

    const displayDataWithSpecificPlace = (currentPlace) => {
        // console.log ('this function filters data by the specific place only');
        let filteredArray = [];
        data.forEach(element => {
            if (element.place() == currentPlace ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificType = (currentType) => {
        let filteredArray = [];
        data.forEach(element => {
            if (element.type() == currentType ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificPeriod = (currentPeriod) => {
        let filteredArray = [];
        data.forEach(element => {
            if (currentPeriod.contains( element.time() ) ) {
                filteredArray.push (element);
            }

        });
        return filteredArray;
    }

    return {
        data = data,

        //Place
        setCurrentPlace(currentPlaceName) {
            currentPlace = currentPlaceName;
        },

        getCurrentPlace() {
            if (currentPlace != null) {
                displayDataWithSpecificPlace(currentPlace);
            } else {
                return data;
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
                displayDataWithSpecificType(currentType);
            } else {
                return data;
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
                displayDataWithSpecificPeriod(currentPeriod);
            } else {
                return data;
            }   
        },
        
        clearCurrentPeriod() {
            currentPeriod = null;
        },

        
        convertToUSUnits() {
            //use weatherPredictions-> temp predictions convert to F()
            if (data != null){
                data.forEach(element => {
                    if (element instanceof TemperaturePrediction) {
                         element.convertToF();   
                    }
                    if (element instanceof PrecipitationPrediction) {
                        element.convertToInches();   
                    }
                    if (element instanceof WindPrediction) {
                        element.convertToMPH();
                    } 
                });
            }
        },
        
        convertToInternationalUnits() {
            if (data != null){
                data.forEach(element => {
                    if (element instanceof TemperaturePrediction) {
                         element.convertToC();   
                    }
                    if (element instanceof PrecipitationPrediction) {
                        element.convertToMM();   
                    }
                    if (element instanceof WindPrediction) {
                        element.convertToMS();
                    } 
                });
            }
        },

        add(data) {
            data = data
        },

        data() {
            return data;
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


function Temperature (value, type, unit, time, place) {
    const options = {value, type, unit, time, place};
    
    return {
        value() { return value},

        ...WeatherData(options),
       
        convertToF() {
            if (unit != 'US') {
                value = (value * 9/5 + 32);
            } 
        },

        convertToC() {
            if (unit != 'EU') {
                value = (value - 32) / (9/5);
            } 
        }
    }
}


function Precipitation (value, precipitationType, type, unit, time, place) {
    
    const options = {value, precipitationType, type, unit, time, place};

    return {
        value() { return value},

        ...WeatherPrediction(options),

        precipitationType() {
            return precipitationType;
        },

        convertToInches() {
            if (unit != 'US') {
                value = (value * 9/5 + 32);
            }
        },

        convertToMM() {
            if (unit != 'EU') {
                value = (value - 32) / (9/5);
            } 
        }
    }
}

function Wind (value, direction, type, unit, time, place) {
    
    const options = {value, direction, type, unit, time, place};

    return {
        value() { return value},

        ...WeatherPrediction(options),

        precipitationType() {
            return precipitationType;
        },

        convertToMPH() {
            if (unit != 'US') {
                value = (value * 2.23694);
            }
        },

        convertToMS() {
            if (unit != 'EU') {
                value = (value / 2.23694);
            } 
        }
    }
}

prec = new Precipitation (2, 'precipitationType1', 'data-type', 'EU', new Date(), 'Horsens' );
console.log ('prec.value ', prec.value());





function WeatherHistory(data) {

    const displayDataWithSpecificPlace = (currentPlace) => {
        let filteredArray = [];
        data.forEach(element => {
            if (element.place() == currentPlace ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificType = (currentType) => {
        let filteredArray = [];
        data.forEach(element => {
            if (element.type() == currentType ) {
                filteredArray.push (element);
            }

        });
        return filteredArray
    }

    const displayDataWithSpecificPeriod = (currentPeriod) => {
        let filteredArray = [];
        data.forEach(element => {
            if (currentPeriod.contains( element.time() ) ) {
                filteredArray.push (element);
            }

        });
        return filteredArray;
    }

    return {
        data = data,

        //Place
        setCurrentPlace(currentPlaceName) {
            currentPlace = currentPlaceName;
        },

        getCurrentPlace() {
            if (currentPlace != null) {
                displayDataWithSpecificPlace(currentPlace);
            } else {
                return data;
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
                displayDataWithSpecificType(currentType);
            } else {
                return data;
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
                displayDataWithSpecificPeriod(currentPeriod);
            } else {
                return data;
            }   
        },
        
        clearCurrentPeriod() {
            currentPeriod = null;
        },

        
        convertToUSUnits() {
            //use weatherPredictions-> temp predictions convert to F()
            if (data != null){
                data.forEach(element => {
                    if (element instanceof TemperaturePrediction) {
                         element.convertToF();   
                    }
                    if (element instanceof PrecipitationPrediction) {
                        element.convertToInches();   
                    }
                    if (element instanceof WindPrediction) {
                        element.convertToMPH();
                    } 
                });
            }
        },
        
        convertToInternationalUnits() {
            if (data != null){
                data.forEach(element => {
                    if (element instanceof TemperaturePrediction) {
                         element.convertToC();   
                    }
                    if (element instanceof PrecipitationPrediction) {
                        element.convertToMM();   
                    }
                    if (element instanceof WindPrediction) {
                        element.convertToMS();
                    } 
                });
            }
        },

        add(data) {
            data = data
        },

        data() {
            return data;
        }

    }
}
