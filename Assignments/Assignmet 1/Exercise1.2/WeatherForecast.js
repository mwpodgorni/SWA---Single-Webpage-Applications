const WindPrediction = require("./WindPrediction");
const PrecipitationPrediction = require("./PrecipitationPrediction");
const TemperaturePrediction = require("./TemperaturePrediction");

module.exports = class WeatherForecast {
  constructor(data) {
    this.weatherPredictionData = data;
    this.currentPlace = null;
    this.currentType = null;
    this.currentPeriod = null;
  }
  getCurrentPlace() {
    return this.currentPlace;
  }
  setCurrentPlace(place) {
    this.currentPlace = place;
  }
  clearCurrentPlace() {
    this.currentPlace = null;
  }
  getCurrentType() {
    return this.currentType;
  }
  setCurrentType(type) {
    this.currentType = type;
  }
  clearCurrentType() {
    this.currentType = null;
  }
  getCurrentPeriod() {
    return this.currentPeriod;
  }
  setCurrentPeriod(period) {
    this.currentPeriod = period;
  }
  clearCurrentPeriod() {
    this.currentPeriod = null;
  }
  convertToUSUnits() {
    this.weatherPredictionData.forEach((element) => {
      if (element.unit() == "International") {
        if (element instanceof WindPrediction) {
          element.convertToMPH();
        } else if (element instanceof PrecipitationPrediction) {
          element.convertToInches();
        } else if (element instanceof TemperaturePrediction) {
          element.convertToF();
        }
      }
    });
  }
  convertToInternationalUnits() {
    this.weatherPredictionData.forEach((element) => {
      if (element.unit() == "US") {
        if (element instanceof WindPrediction) {
          element.convertToMS();
        } else if (element instanceof PrecipitationPrediction) {
          element.convertToMM();
        } else if (element instanceof TemperaturePrediction) {
          element.convertToC();
        }
      }
    });
  }
  add(data) {
    this.weatherPredictionData.concat(data);
  }
  checkCurrentPlaceFilter(data) {
    if (this.currentPlace != null) {
      let filteredData = [];
      data.forEach((element) => {
        if (element.place() == this.currentPlace) {
          filteredData.push(element);
        }
      });
      return filteredData;
    } else {
      return data;
    }
  }
  checkForCurrentTypeFilter(data) {
    if (this.currentType != null) {
      let filteredData = [];
      data.forEach((element) => {
        if (element.type() == this.currentType) {
          filteredData.push(element);
        }
      });
      return filteredData;
    } else {
      return data;
    }
  }
  checkForCurrentPeriodFilter(data) {
    if (this.currentPeriod != null) {
      let filteredData = [];
      data.forEach((element) => {
        if (this.currentPeriod.contains(element.time())) {
          filteredData.push(element);
        }
      });
      return filteredData;
    } else {
      return data;
    }
  }
  data() {
    let filterData = this.weatherPredictionData;
    filterData = this.checkCurrentPlaceFilter(filterData);
    filterData = this.checkForCurrentTypeFilter(filterData);
    filterData = this.checkForCurrentPeriodFilter(filterData);
    return filterData;
  }
};
