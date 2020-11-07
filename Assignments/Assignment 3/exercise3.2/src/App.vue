<template>
  <div id="app">
    <div class="container" id="weather-data">
      <h1>Weather Data</h1>
      <b-spinner
        class="my-5"
        variant="primary"
        v-if="loadingStatusWeatherData == 'loading'"
        label="Spinning"
      ></b-spinner>
      <div v-if="loadingStatusWeatherData != 'loading'">
        <b-form inline class="my-2 mx-auto">
          <label class="mx-2" for="cities">Cities</label>
          <b-form-select
            @change="applyDataFilters()"
            class="mx-2"
            id="cities"
            v-model="weatherDataAppliedFilters.city"
            :options="weatherDataFilters.cities"
          >
          </b-form-select>
          <label class="mx-2" for="time-interval">Date From</label>
          <b-form-select
            @change="applyDataFilters()"
            class="mx-2"
            id="time-interval"
            v-model="weatherDataAppliedFilters.timeStart"
            :options="weatherDataFilters.timeStart"
          ></b-form-select>
          <label class="mx-2" for="time-interval">Date To</label>
          <b-form-select
            @change="applyDataFilters()"
            class="mx-2"
            id="time-interval"
            v-model="weatherDataAppliedFilters.timeEnd"
            :options="weatherDataFilters.timeEnd"
          ></b-form-select>
          <b-button v-on:click="loadWeatherData" variant="primary">
            <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon
          ></b-button>
        </b-form>
        <b-table
          outlined
          sticky-header
          id="weather-data-table"
          :items="weatherData"
          :fields="weatherDataHeaders"
          responsive="sm"
        >
        </b-table>
      </div>
    </div>
    <hr />

    <div class="container mt-2" id="weather-predictions">
      <h1>Weather Predicitions</h1>
      <b-spinner
        class="my-5"
        variant="primary"
        v-if="loadingStatusWeatherPredictions == 'loading'"
        label="Spinning"
      ></b-spinner>
      <div v-if="loadingStatusWeatherPredictions != 'loading'">
        <b-form inline class="my-2 mx-auto">
          <label class="mx-2" for="cities">Cities</label>
          <b-form-select
            @change="applyPredictionsFilters()"
            class="mx-2"
            id="cities"
            v-model="weatherPredictionsAppliedFilters.city"
            :options="weatherPredictionsFilters.cities"
          >
          </b-form-select>

          <label class="mx-2" for="time-interval">Date From</label>
          <b-form-select
            @change="applyPredictionsFilters()"
            class="mx-2"
            id="time-interval"
            v-model="weatherPredictionsAppliedFilters.timeStart"
            :options="weatherPredictionsFilters.timeStart"
          ></b-form-select>
          <label class="mx-2" for="time-interval">Date To</label>
          <b-form-select
            @change="applyPredictionsFilters()"
            class="mx-2"
            id="time-interval"
            v-model="weatherPredictionsAppliedFilters.timeEnd"
            :options="weatherPredictionsFilters.timeEnd"
          ></b-form-select>

          <b-button v-on:click="loadPredictionsData" variant="primary">
            <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon
          ></b-button>
        </b-form>

        <b-table
          outlined
          sticky-header
          id="predictions-data-table"
          :items="weatherPredictions"
          :fields="weatherPredictionsHeaders"
          responsive="sm"
        >
        </b-table>
      </div>
    </div>
    <hr />
    <div class="container">
      <b-card no-body class="mb-1">
        <b-card-header>
          <h1 class="my-auto">Report Data</h1>
        </b-card-header>
        <b-alert
          class="mb-1"
          :show="dismissCountDownSuccess"
          variant="success"
          @dismissed="dismissCountDownSuccess = 0"
        >
          {{ success }}
        </b-alert>
        <b-alert
          class="mb-1"
          :show="dismissCountDownError"
          variant="danger"
          @dismissed="dismissCountDownError = 0"
        >
          {{ error }}
        </b-alert>
        <b-card-body id="form">
          <b-card-text>
            <b-form inline class="my-2">
              <label for="type" class="mr-2">Type</label>
              <b-form-select
                id="type"
                class="mr-1"
                :options="form.types"
                v-model="form.type"
              ></b-form-select>
            </b-form>
            <b-form inline class="my-2">
              <label for="date" class="mr-2">Date</label>
              <b-form-datepicker
                class="mr-4"
                id="date"
                v-model="form.date"
              ></b-form-datepicker>
              <label for="time" class="mr-1">Time</label>
              <b-form-timepicker
                class="mr-1"
                id="time"
                v-model="form.time"
                locale="en"
              ></b-form-timepicker>
            </b-form>
            <b-form inline class="my-2">
              <label for="place" class="mr-1">Place</label>
              <b-form-input
                class="mr-1"
                id="place"
                v-model="form.place"
                placeholder="Enter city"
              ></b-form-input>
            </b-form>
            <b-form inline class="my-2">
              <label for="value" class="mr-1">Value</label>
              <b-form-input
                class="mr-2"
                id="value"
                v-model="form.value"
                placeholder="Enter value"
              ></b-form-input>
              <label for="unit" class="mr-1">Unit</label>
              <b-form-input
                class="mr-2"
                id="unit"
                v-model="form.unit"
                placeholder="Enter unit"
              ></b-form-input>
              <label
                for="precipitation-type"
                class="mr-1"
                v-if="form.type == 'precipitation'"
                >Precipitation Type</label
              >
              <b-form-select
                id="precipitation-type"
                class="mr-1"
                :options="form.precipitationTypes"
                v-model="form.precipitationType"
                v-if="form.type == 'precipitation'"
              ></b-form-select>
              <label
                for="wind-direction"
                class="mr-1"
                v-if="form.type == 'wind speed'"
                >Wind Direction</label
              >
              <b-form-select
                id="wind-direction"
                class="mr-1"
                :options="form.windDirections"
                v-model="form.windDirection"
                v-if="form.type == 'wind speed'"
              ></b-form-select>
            </b-form>
            <b-button block variant="success" v-on:click="reportData"
              >Report Data</b-button
            >
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  data() {
    return {
      weatherDataAppliedFilters: {
        city: null,
        timeStart: null,
        timeEnd: null,
      },
      weatherPredictionsAppliedFilters: {
        city: null,
        timeStart: null,
        timeEnd: null,
      },
      form: {
        precipitationTypes: ["rain", "sleet", "hail", "snow"],
        types: ["temperature", "precipitation", "wind speed", "cloud coverage"],
        windDirections: [
          "North",
          "Northeast",
          "East",
          "Southeast",
          "South",
          "Southwest",
          "West",
          "Northwest",
        ],
        type: null,
        date: null,
        time: null,
        place: null,
        value: null,
        unit: null,
        precipitationType: null,
        windDirection: null,
      },
      error: null,
      success: null,
      dismissSecs: 5,
      dismissCountDownSuccess: 0,
      dismissCountDownError: 0,
    };
  },
  beforeCreate() {
    this.$store.dispatch("fetchWeatherData");
    this.$store.dispatch("fetchWeatherPredictions");
  },
  watch: {
    dataReportStatus(newValue, oldValue) {
      if (newValue == "sent") {
        this.showSuccessAlert();
        this.$store.dispatch("clearReportStatus");
      }
    },
  },
  computed: {
    ...mapGetters({
      loadingStatusWeatherData: "loadingStatusWeatherData",
      weatherData: "getWeatherData",
      weatherDataHeaders: "getWeatherDataHeaders",
      weatherDataFilters: "getWeatherDataFilters",
      dataReportStatus: "getDataReportStatus",
      loadingStatusWeatherPredictions: "loadingStatusWeatherPredictions",
      weatherPredictions: "getWeatherPredictions",
      weatherPredictionsHeaders: "getWeatherPredictionsHeaders",
      weatherPredictionsFilters: "getWeatherPredictionsFilters",
    }),
  },
  methods: {
    loadWeatherData() {
      this.weatherDataAppliedFilters.city = null;
      this.weatherDataAppliedFilters.timeStart = null;
      this.weatherDataAppliedFilters.timeEnd = null;
      this.$store.dispatch("fetchWeatherData");
    },
    loadPredictionsData() {
      this.weatherPredictionsAppliedFilters.city = null;
      this.weatherPredictionsAppliedFilters.timeStart = null;
      this.weatherPredictionsAppliedFilters.timeEnd = null;
      this.$store.dispatch("fetchWeatherPredictions");
    },
    applyDataFilters() {
      this.$store.dispatch("filterWeatherData", this.weatherDataAppliedFilters);
    },
    applyPredictionsFilters() {
      this.$store.dispatch(
        "filterWeatherPredictions",
        this.weatherPredictionsAppliedFilters
      );
    },
    reportData() {
      if (
        this.form.type &&
        this.form.date &&
        this.form.time &&
        this.form.place &&
        this.form.value &&
        this.form.unit
      ) {
        var report = {
          value: parseInt(this.form.value),
          type: this.form.type,
          unit: this.form.unit,
          time: new Date(this.form.date + "T" + this.form.time + ".000Z"),
          place: this.form.place,
        };
        if (this.form.type == "precipitation") {
          if (this.form.precipitationType) {
            report.precipitation_type = this.form.precipitationType;
          } else {
            this.showErrorAlert();
          }
        }
        if (this.form.type == "wind speed") {
          if (this.form.windDirection) {
            report.direction = this.form.windDirection;
          } else {
            this.showErrorAlert();
          }
        }
        this.$store.dispatch("sendDataReport", JSON.stringify(report));
      } else {
        this.showErrorAlert();
      }
    },
    showErrorAlert() {
      this.dismissCountDownError = this.dismissSecs;
      this.error = "All fields must be filled!";
    },
    showSuccessAlert() {
      this.dismissCountDownSuccess = this.dismissSecs;
      this.success = "Data has been saved.";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  margin-top: 20px;
}
</style>
