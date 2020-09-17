module.exports = function DataType(type, unit) {
  this.typeValue = type;
  this.unitValue = unit;
  DataType.prototype = {
    type: function () {
      return this.typeValue;
    },
    unit: function () {
      return this.unitValue;
    },
  };
};
