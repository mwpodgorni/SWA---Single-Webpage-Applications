module.exports = class WeatherHistory {
  constructor(data) {
    this.weatherData = data;
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
    this.weatherData.forEach((element) => {
      if (element.unit() == "International") {
        if (element instanceof Wind) {
          element.convertToMPH();
        } else if (element instanceof Precipitation) {
          element.convertToInches();
        } else if (element instanceof Temperature) {
          element.convertToF();
        }
      }
    });
  }
  convertToInternationalUnits() {
    this.weatherData.forEach((element) => {
      if (element.unit() == "US") {
        if (element instanceof Wind) {
          element.convertToMS();
        } else if (element instanceof Precipitation) {
          element.convertToMM();
        } else if (element instanceof Temperature) {
          element.convertToC();
        }
      }
    });
  }
  add(data) {
    this.weatherData.concat(data);
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
    let filterData = this.weatherData;
    filterData = this.checkCurrentPlaceFilter(filterData);
    filterData = this.checkForCurrentTypeFilter(filterData);
    filterData = this.checkForCurrentPeriodFilter(filterData);
    return filterData;
  }
};
