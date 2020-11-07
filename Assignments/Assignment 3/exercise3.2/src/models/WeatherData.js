export default class WeatherData {
  type;
  time;
  place;
  value;
  unit;
  precipitation_type;
  direction;

  constructor(data) {
    this.type = data.type;
    this.time = data.time;
    this.place = data.place;
    this.value = data.value;
    this.unit = data.unit;
    if (data.precipitation_type) {
      this.precipitation_type = data.precipitation_type;
    }
    if (data.direction) {
      this.direction = data.direction;
    }
  }
  get_type() {
    return this.type;
  }
  set_type(type) {
    this.type = type;
  }
  get_time() {
    return this.time;
  }
  set_time(time) {
    this.time = time;
  }
  get_place() {
    return this.place;
  }
  set_place(place) {
    this.place = place;
  }
  get_value() {
    return this.value;
  }
  set_value(value) {
    this.value = value;
  }
  get_unit() {
    return this.unit;
  }
  set_unit(unit) {
    this.unit = unit;
  }
  get_precipitation_type() {
    return this.precipitation_type;
  }
  set_precipitation_type(precipitation_type) {
    this.precipitation_type = precipitation_type;
  }
  get_direction() {
    return this.direction;
  }
  set_direction(direction) {
    this.direction = direction;
  }
}
