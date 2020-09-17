module.exports = class DateInterval {
  constructor(from, to) {
    //required input date format: "yyyy-mm-dd"
    //create proper format
    from = from + "T00:00:00.000Z";
    to = to + "T00:00:00.000Z";
    //create date objects
    this.dateFrom = new Date(from);
    this.dateTo = new Date(to);
  }
  from() {
    //convert to more readable format before returning
    return this.dateFrom.toDateString();
  }
  to() {
    //convert to more readable format before returning
    return this.dateTo.toDateString();
  }
  contains(d) {
    return this.dateFrom < d && d < this.dateTo;
  }
};
