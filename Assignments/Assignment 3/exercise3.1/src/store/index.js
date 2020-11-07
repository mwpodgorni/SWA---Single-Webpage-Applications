import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatusWeatherData: "notLoading",
    initialWeatherData: [],
    weatherData: [],
    weatherDataFilters: {
      cities: [],
      timeStart: [],
      timeEnd: [],
    },
    dataReportStatus: "empty",
    loadingStatusWeatherPredictions: "notLoading",
    initialWeatherPredictions: [],
    weatherPredictions: [],
    weatherPredictionsFilters: {
      cities: [],
      timeStart: [],
      timeEnd: [],
    },
  },
  mutations: {
    SET_LOADING_STATUS_WEATHER_DATA(state, status) {
      state.loadingStatusWeatherData = status;
    },
    SET_INITIAL_WEATHER_DATA(state, data) {
      state.initialWeatherData = data;
    },
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    SET_WEATHER_DATA_HEADERS(state, data) {
      var headers = [];
      var types = [];
      data.forEach((element) => {
        if (!types.includes(element.type)) {
          Object.keys(element).forEach((key) => {
            if (!headers.includes(key)) {
              headers.push(key);
            }
          });
          types.push(element.type);
        }
      });
      state.getWeatherDataHeaders = headers;
    },
    SET_WEATHER_DATA_FILTERS(state, data) {
      var cities = [{ text: "Choose...", value: null }];
      data.forEach((element) => {
        if (!cities.includes(element.place)) {
          cities.push(element.place);
        }
      });
      var dates = [{ text: "Choose...", value: null }];
      data.forEach((element) => {
        if (!dates.includes(element.time)) {
          dates.push(element.time);
        }
      });
      state.weatherDataFilters.cities = cities;
      state.weatherDataFilters.timeStart = dates;
      state.weatherDataFilters.timeEnd = dates;
    },
    FILTER_WEATHER_DATA(state, filters) {
      state.weatherData = state.initialWeatherData;
      if (filters.city) {
        state.weatherData = state.weatherData.filter(
          (element) => element.place == filters.city
        );
      }
      if (filters.timeStart) {
        state.weatherData = state.weatherData.filter(
          (element) => element.time >= filters.timeStart
        );
      }
      if (filters.timeEnd) {
        state.weatherData = state.weatherData.filter(
          (element) => element.time <= filters.timeEnd
        );
      }
    },
    SET_REPORT_DATA_STATUS(state, status) {
      state.dataReportStatus = status;
    },
    SET_LOADING_STATUS_WEATHER_PREDICTIONS(state, status) {
      state.loadingStatusWeatherPredictions = status;
    },
    SET_INITIAL_WEATHER_PREDICTIONS(state, data) {
      state.initialWeatherPredictions = data;
    },
    SET_WEATHER_PREDICTIONS(state, data) {
      state.weatherPredictions = data;
    },
    SET_WEATHER_PREDICTIONS_HEADERS(state, data) {
      var headers = [];
      var types = [];
      data.forEach((element) => {
        if (!types.includes(element.type)) {
          Object.keys(element).forEach((key) => {
            if (!headers.includes(key)) {
              headers.push(key);
            }
          });
          types.push(element.type);
        }
      });
      state.weatherPredictionsHeaders = headers;
    },
    SET_WEATHER_PREDICTIONS_FILTERS(state, data) {
      var cities = [{ text: "Choose...", value: null }];
      data.forEach((element) => {
        if (!cities.includes(element.place)) {
          cities.push(element.place);
        }
      });
      var dates = [{ text: "Choose...", value: null }];
      data.forEach((element) => {
        if (!dates.includes(element.time)) {
          dates.push(element.time);
        }
      });
      state.weatherPredictionsFilters.cities = cities;
      state.weatherPredictionsFilters.timeStart = dates;
      state.weatherPredictionsFilters.timeEnd = dates;
    },
    FILTER_WEATHER_PREDICTIONS(state, filters) {
      state.weatherPredictions = state.initialWeatherPredictions;
      if (filters.city) {
        state.weatherPredictions = state.weatherPredictions.filter(
          (element) => element.place == filters.city
        );
      }
      if (filters.timeStart) {
        state.weatherPredictions = state.weatherPredictions.filter(
          (element) => element.time >= filters.timeStart
        );
      }
      if (filters.timeEnd) {
        state.weatherPredictions = state.weatherPredictions.filter(
          (element) => element.time <= filters.timeEnd
        );
      }
    },
  },
  actions: {
    fetchWeatherData(context) {
      context.commit("SET_LOADING_STATUS_WEATHER_DATA", "loading");
      const request = new XMLHttpRequest();
      request.open("GET", "http://localhost:8080/data");
      request.onload = () => {
        var data = JSON.parse(request.responseText);
        context.commit("SET_INITIAL_WEATHER_DATA", data);
        context.commit("SET_WEATHER_DATA", data);
        context.commit("SET_WEATHER_DATA_HEADERS", data);
        context.commit("SET_WEATHER_DATA_FILTERS", data);
        context.commit("SET_LOADING_STATUS_WEATHER_DATA", "notLoading");
      };
      request.send(null);
    },
    fetchWeatherPredictions(context) {
      context.commit("SET_LOADING_STATUS_WEATHER_PREDICTIONS", "loading");
      const request = new XMLHttpRequest();
      request.open("GET", "http://localhost:8080/forecast");
      request.onload = () => {
        var data = JSON.parse(request.responseText);
        context.commit("SET_INITIAL_WEATHER_PREDICTIONS", data);
        context.commit("SET_WEATHER_PREDICTIONS", data);
        context.commit("SET_WEATHER_PREDICTIONS_HEADERS", data);
        context.commit("SET_WEATHER_PREDICTIONS_FILTERS", data);
        context.commit("SET_LOADING_STATUS_WEATHER_PREDICTIONS", "notLoading");
      };
      request.send(null);
    },
    filterWeatherData(context, filters) {
      context.commit("FILTER_WEATHER_DATA", filters);
    },
    filterWeatherPredictions(context, filters) {
      context.commit("FILTER_WEATHER_PREDICTIONS", filters);
    },
    sendDataReport(context, report) {
      context.commit("SET_REPORT_DATA_STATUS", "sending");
      const request = new XMLHttpRequest();
      request.open("POST", "http://localhost:8080/data", true);
      request.setRequestHeader("Content-type", "application/json");

      request.onload = function () {
        if (request.status == 201) {
          context.commit("SET_REPORT_DATA_STATUS", "sent");
        }
      };
      request.send(report);
    },
    clearReportStatus(context) {
      context.commit("SET_REPORT_DATA_STATUS", "empty");
    },
  },
  getters: {
    loadingStatusWeatherData(state) {
      return state.loadingStatusWeatherData;
    },
    getWeatherData(state) {
      return state.weatherData;
    },
    getWeatherDataHeaders(state) {
      return state.getWeatherDataHeaders;
    },
    getWeatherDataFilters(state) {
      return state.weatherDataFilters;
    },
    getDataReportStatus(state) {
      return state.dataReportStatus;
    },
    loadingStatusWeatherPredictions(state) {
      return state.loadingStatusWeatherPredictions;
    },
    getWeatherPredictions(state) {
      return state.weatherPredictions;
    },
    getWeatherPredictionsHeaders(state) {
      return state.weatherPredictionsHeaders;
    },
    getWeatherPredictionsFilters(state) {
      return state.weatherPredictionsFilters;
    },
  },
});
