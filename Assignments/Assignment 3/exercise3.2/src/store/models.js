export default class weatherData {
    constructor(time, place, type, unit, value)
     {
         this._time = time;
         this._place = place;
         this._type = type;
         this._unit = unit;
         this._value = value;
    }


    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get place() {
        return this._place;
    }

    set place(value) {
        this._place = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get unit() {
        return this._unit;
    }

    set unit(value) {
        this._unit = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }
}

export default class weatherDatas {
    constructor() {
        this.wDatas = []
    }
    newData(data) {
        var p = new weatherData(data)
        wDatas.push(p)

    }

    getAllData() {
        return this.wDatas
    }
}