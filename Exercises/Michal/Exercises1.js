/*-------------------------------------------------------------------------------------------------------------------------------------------*/
// Exercise 1.1 – Installation
// a) Install node.js from https://nodejs.org/en/
// b) Run the program below. What does it do?

console.log("\nExercise 1.1\n");

const chars = {
  1: "e",
  8: "r",
  11: "!",
  4: "o",
  0: "H",
  10: "d",
  6: "W",
  9: "l",
  2: "l",
  7: "o",
  3: "l",
  length: 12,
};
let msg = "";
for (let i = 0; i < chars.length; i++) {
  if (chars[i]) msg = msg + chars[i];
  else msg = msg + " ";
}
console.log(msg);

console.log(
  "Answer: this code iterates through chars array. If array element has a value, it add it to the msg string, if it doesnt, it adds a space to msg string."
);

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
//Exercise 1.2 – Implement class model
//a) The class diagram below is a fine Java class diagram, but it is not how we program object-oriented in
//JavaScript. Implement the model in JavaScript using factory functions.
//b) Create an array of circles. Use the array map() method to create an array with the radius of each circle.
//c) We want to add an overloaded constructor to Circle:
// Circle(x: double, y: double, radius: double)
//JavaScript doesn't support overloading like Java. How do you implement this? (Hint: use the arguments
//object.)

console.log("\nExercise 1.2\n");

//point factory function
function point(x, y) {
  return {
    x: x,
    y: y,
    getX() {
      return x;
    },
    getY() {
      return y;
    },
    moveTo(x1, y1) {
      x = x1;
      y = y1;
    },
    toString() {
      return "x = " + x + ", y = " + y;
    },
    copy() {
      return point(x, y);
    },
  };
}

//circle factory function
function circle() {
  let center;
  let radius;
  //if there are three arguments passed, create point object using coordinates x & y and assign it to center, assign second argument to radius
  //else assign first argument to center (point object) and second argument to radius
  if (arguments.length == 3) {
    center = Object.create(point(arguments[0], arguments[1]));
    radius = arguments[2];
  } else {
    center = arguments[0];
    radius = arguments[1];
  }
  return {
    center: center,
    radius: radius,
    getCenter() {
      return center;
    },
    getRadius() {
      return radius;
    },
    moveTo(x1, y1) {
      center.moveTo(x1, y1);
    },
    toString() {
      return "center: " + center.toString() + ", radius = " + radius;
    },
  };
}

//create two arrays, one with arrays of numbers and one with arrays of point and number
let numbers1 = [];
let numbers2 = [];
for (i = 0; i < 7; i++) {
  numbers1[i] = [i, i, i + 1];
  numbers2[i] = [point(i, i), i + 1];
}

//create arrays with circles using arrays with points/numbers
let circleArray1 = numbers1.map(function (num) {
  return circle(num[0], num[1], num[2]);
});

let circleArray2 = numbers2.map(function (num) {
  return circle(num[0], num[1]);
});

//show circle arrays
circleArray1.forEach((element) => {
  console.log("circle array 1: " + element.toString());
});
console.log();
circleArray2.forEach((element) => {
  console.log("circle array 2: " + element.toString());
});

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
//Exercise 1.3
/*Implement the diagram above using factory methods. Do not use constructors or the class keyword.
Encapsulate everything. */

console.log("\nExercise 1.3\n");

//Text Value
function textValue() {
  let value = "";
  return {
    value() {
      return value;
    },
  };
}

//Numeric Value
function numericValue() {
  let value = 0;
  let unit = "";
  return {
    value() {
      return value;
    },
    unit() {
      return unit;
    },
  };
}

//Data
function data() {
  let type = "";
  let time = "";
  let place = "";
  return {
    type() {
      return type;
    },
    time() {
      return time;
    },
    place() {
      return place;
    },
  };
}

//Temperature
function temperature() {
  let temperature = 0;
  return {
    convertToF() {
      return (temperature * 9) / 5 + 32;
    },
    convertToC() {
      return ((temperature - 32) * 5) / 9;
    },
  };
}

//Precipitation
function precipitation() {
  let value = 0;
  let type = "";
  return {
    precipitationType() {
      return type;
    },
    convertToInches() {
      return value / 25.4;
    },
    convertToMM() {
      return value * 25.4;
    },
  };
}

//Wind
function wind() {
  let value = 0;
  let direction = "";
  return {
    direction() {
      return direction;
    },
    convertToMPH() {
      return value * 2.237;
    },
    convertToMM() {
      return value / 2.237;
    },
  };
}

//CloudCoverage
function CloudCoverage() {
  return {};
}

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
// Exercise 1.4 – JavaScript Recap
// Exercise 1.4.1 – truthy
// Which of the following are truthy?

console.log("\nExercise 1.4.1\n");

console.log("a) 2 + 2 === 4");
console.log(2 + 2 === 4);

console.log("b) 2 + 2 === '4'");
console.log(2 + 2 === "4");

console.log("c) 2 + 2 == '4'");
console.log(2 + 2 == "4");

console.log("d) Number('4')");
if (Number("4")) {
  console.log(true);
} else {
  console.log(false);
}
console.log("e) Number('0')");
if (Number("0")) {
  console.log(true);
} else {
  console.log(false);
}
console.log("f) NaN");
if (NaN) {
  console.log(true);
} else {
  console.log(false);
}
console.log("g) NaN != NaN");
if (NaN != NaN) {
  console.log(true);
} else {
  console.log(false);
}

console.log("h) Infinity == Infinity");
if (Infinity == Infinity) {
  console.log(true);
} else {
  console.log(false);
}

console.log("i) 1/0 == 2/0");
if (1 / 0 == 2 / 0) {
  console.log(true);
} else {
  console.log(false);
}

console.log("j) 2 * null");
if (2 * null) {
  console.log(true);
} else {
  console.log(false);
}

console.log("k) 2 + null");
if (2 + null) {
  console.log(true);
} else {
  console.log(false);
}

console.log("l) 7");
if (7) {
  console.log(true);
} else {
  console.log(false);
}

console.log("m) null || 7");
if (null || 7) {
  console.log(true);
} else {
  console.log(false);
}

console.log("n) 4");
if (4) {
  console.log(true);
} else {
  console.log(false);
}

console.log("o) ''");
if ("") {
  console.log(true);
} else {
  console.log(false);
}

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
//Exercise 1.4.2 – loops
/*a) Make a loop that prints (using console.log) the numbers from 1 to 10
b) Make a loop that adds the numbers from 1 to 10
c) Make a loop that computes 10! (factorial) */

console.log("\nExercise 1.4.2\n");

//a)
for (i = 1; i < 11; i++) {
  console.log(i);
}
//b)
let sum = 0;
for (i = 1; i < 11; i++) {
  sum += i;
}
console.log("sum from 1 to 10 = " + sum);
//c)
let sum2 = 0;
for (i = 1; i < 11; i++) {
  if (i == 1) {
    sum2 = i;
  } else {
    sum2 *= i;
  }
}
console.log("10! = " + sum2);

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
//Exercise 1.4.3 – arrays
/*var a = [1, 2, 3, 5, 8] creates an array.
a.length is the length of the array (5)
a[0], …, a[4] are the elements of the array.*/

console.log("\nExercise 1.4.3\n");

var a = [1, 2, 4, 5, 8];
console.log("a) What’s a[5]?");
console.log(a[5]);

console.log("\nb) Make a loop that prints the elements of a");
a.forEach((element) => {
  console.log(element);
});

console.log("\nc) Make a loop that adds the elements of a");
sum = 0;
a.forEach((element) => {
  sum += element;
});
console.log("sum = " + sum);

console.log(
  "\nd) Make a function that takes an array and returns the sum of its elements"
);
function sumOfArrayElements(array) {
  sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  return sum;
}
let d = [1, 2, 3, 4, 5, 6, 7];
sum = sumOfArrayElements(d);

let string = "";
d.forEach((element) => {
  string += element + " ";
});

console.log("function input: " + string);
console.log("function output: " + sum);

console.log("\ne) Add an element to a like this: a[8] = 55");
a[8] = 55;

console.log("\nf) What’s a[8]?");
console.log(a[8]);

console.log("\ng) What’s the length of a?");
console.log(a.length);

console.log("\nh) What happens if you print a to the console?");
console.log(a);

console.log("\ni) What happens with your loop from (c)? ");
sum = 0;
a.forEach((element) => {
  sum += element;
});
console.log("loop output: " + sum);

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
//Exercise 1.4.4 – basic functions
/*a) Make a function, factorial, that takes a value n and returns n!
b) Make a function, power, that takes values m and n and returns mn.*/

console.log("\nExercise 1.4.4\n");

// a)
function factorial(value) {
  let factorial = 0;
  for (i = 1; i <= value; i++) {
    if (i == 1) {
      factorial = i;
    } else {
      factorial *= i;
    }
  }
  return factorial;
}
console.log("factorial function example input: 8 & 7");
console.log("function output: " + factorial(8));

//b)
function power(value, exponent) {
  let power = value;
  for (i = 1; i < exponent; i++) {
    power *= value;
  }
  return power;
}
console.log("power function example input: 8 & 7");
console.log("function output: " + power(8, 7));

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
//Exercise 1.4.5 – advanced functions
/*Make a function that takes two arguments, m and n. If n is undefined, the function should return m!, otherwise
the function should return mn.
What happens if you call the function with only one argument? */

console.log("\nExercise 1.4.5\n");

function advancedFunction() {
  let sum = 0;
  if (arguments[1] == undefined) {
    for (i = 1; i < arguments[0]; i++) {
      if (i == 1) {
        sum = i;
      } else {
        sum *= i;
      }
    }
    return sum;
  } else {
    let power = arguments[0];
    for (i = 1; i < arguments[1]; i++) {
      power *= arguments[0];
    }
    return power;
  }
}

console.log(
  "output of the advanced function with one input argument (8): " +
    advancedFunction(8)
);
console.log(
  "output of the advanced function with two input arguments (8 & 7): " +
    advancedFunction(8, 7)
);
