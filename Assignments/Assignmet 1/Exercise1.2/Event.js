module.exports = function Event(time, place) {
  //required input time format: "yyyy-mm-ddThh:mm:ss"
  time = time + ".000Z";
  this.timeValue = new Date(time);
  this.placeValue = place;
  Event.prototype = {
    time: function () {
      return this.timeValue;
    },
    place: function () {
      return this.placeValue;
    },
  };
};
