
const TextValue = (value) => {
    const textValue = {};
    textValue.value = value;

    value = function () {
        return textValue.center;
    }

}

const NumericValue = (value) => {
    const numericValue = {};
    numericValue.value = value;

    value = function () {
        return textValue.center;
    }

}
