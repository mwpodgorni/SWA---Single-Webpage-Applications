export default class WeatherPredictions {
  type;
  time;
  place;
  from;
  to;
  unit;
  precipitation_types;
  directions;
  constructor(data) {
    this.type = data.type;
    this.time = data.time;
    this.place = data.place;
    this.from = data.from;
    this.to = data.to;
    this.unit = data.unit;
    if (data.precipitation_types) {
      this.precipitation_types = data.precipitation_types;
    }
    if (data.directions) {
      this.directions = data.directions;
    }
  }
  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getTime() {
    return this.time;
  }

  setTime(time) {
    this.time = time;
  }

  getPlace() {
    return this.place;
  }

  setPlace(place) {
    this.place = place;
  }

  getFrom() {
    return this.from;
  }

  setFrom(from) {
    this.from = from;
  }

  getTo() {
    return this.to;
  }

  setTo(to) {
    this.to = to;
  }

  getUnit() {
    return this.unit;
  }

  setUnit(unit) {
    this.unit = unit;
  }

  getPrecipitation_types() {
    return this.precipitation_types;
  }

  setPrecipitation_types(precipitation_types) {
    this.precipitation_types = precipitation_types;
  }

  getDirections() {
    return this.directions;
  }

  setDirections(directions) {
    this.directions = directions;
  }
}
