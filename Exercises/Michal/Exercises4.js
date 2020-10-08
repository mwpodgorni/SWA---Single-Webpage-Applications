/*
Exercise 4.1 - Map, filter, reduce
Rewrite the following functions using map, filter and reduce.
function names(persons) {
  let ns = [];
  for (let i = 0; i < persons.length; i++) {
    ns.push(person[i].name);
  }
  return ns;
}
function adults(persons) {
  let as = [];
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].age >= 18) {
      as.push(persons[i]);
    }
  }
  return as;
}
function oldest_person(persons) {
  let oldest = null;
  for (let i = 0; i < persons.length; i++) {
    if (!oldest || persons[i].age > oldest.age) {
      oldest = person[i];
    }
  }
  return oldest;
}
function total_salaries_of_seniors(employees) {
  let total = 0;
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].age >= 60) {
      total += persons[i].salary;
    }
  }
  return total;
}
*/
console.log("Exercise 4.1");
const persons = [
  { name: "Jeff", age: 23, salary: 10000 },
  { name: "Will", age: 12, salary: 0 },
  { name: "John", age: 19, salary: 4000 },
  { name: "Bob", age: 66, salary: 8000 },
  { name: "Jeffrey", age: 25, salary: 12000 },
];

const names = persons.map((p) => p.name);
console.log("names: " + names);

const adults = persons.filter((p) => p.age > 18);
console.log("adults:");
console.log(adults);

const oldestPerson = persons.reduce((acc, curr) => {
  if (acc.age < curr.age) return curr;
  return acc;
});
console.log("oldest person:");
console.log(oldestPerson);

const totalSeniorSalaries = persons.reduce((acc, curr) => {
  if (curr.age >= 60) return acc + curr.salary;
  return acc;
}, 0);
console.log("total salaries of seniors: " + totalSeniorSalaries);

//Exercise 4.2 - Immutability
//Write immutable versions of the factory functions from exercise 1.2.
console.log("\nExercise 4.2");
function immutable_point(x1, y1) {
  const x = x1;
  const y = y1;
  const getX = () => x;
  const getY = () => y;
  const moveTo = (x1, y1) => immutable_point(x + x1, y + y1);
  const toString = () => "x = " + x + ", y = " + y;
  const copy = () => immutable_point(x, y);
  return { getX, getY, moveTo, toString, copy };
}

function immutable_circle() {
  center = null;
  radius = null;
  if (arguments.length == 3) {
    center = Object.create(immutable_point(arguments[0], arguments[1]));
    radius = arguments[2];
  } else {
    center = arguments[0];
    radius = arguments[1];
  }
  const getCenter = () => center;
  const getRadius = () => radius;
  const moveTo = (x1, y1) =>
    immutable_circle(center.getX() + x1, center.getY() + y1, radius);
  const toString = () =>
    "center: " + center.toString() + ", radius = " + radius;
  return { getCenter, getRadius, moveTo, toString };
}

//create two arrays, one with arrays of numbers and one with arrays of point and number
let numbers1 = [];
let numbers2 = [];
for (i = 0; i < 7; i++) {
  numbers1[i] = [i, i, i + 1];
  numbers2[i] = [immutable_point(i, i), i + 1];
}

//create arrays with circles using arrays with points/numbers
let circleArray1 = numbers1.map(function (num) {
  return immutable_circle(num[0], num[1], num[2]);
});

let circleArray2 = numbers2.map(function (num) {
  return immutable_circle(num[0], num[1]);
});

//show circle arrays
circleArray1.forEach((element) => {
  console.log("circle array 1: " + element.toString());
});
circleArray2.forEach((element) => {
  console.log("circle array 2: " + element.toString());
});

/*
Exercise 4.3 - Closures
a) Create a function that takes a value, n, and returns a function that raises its argument to the power of
n.
b) Create a function that returns a function that gives subsequent elements of the Fibonacci sequence.
*/
console.log("\nExercise 4.3");
console.log("a)");
//a)
function power(x) {
  return function number(y) {
    powerSum = y;
    for (i = 1; i < x; i++) {
      powerSum *= y;
    }
    return powerSum;
  };
}
test = power(3);
console.log("4 to the power of 3 = " + test(4));

console.log("b)");
function fibonacci() {
  return function number(numberOfElements) {
    array = [0, 1];
    if (numberOfElements == 1) return array[0];
    if (numberOfElements == 2) return array;
    for (i = 2; i <= numberOfElements; i++) {
      array.push(array[i - 2] + array[1]);
    }
    array = [];
    for (i = 1; i <= numberOfElements; i++) {
      if (i == 1) {
        array.push(0);
      } else if (i == 2) {
        array.push(1);
      } else {
        array.push(array[i - 3] + array[i - 2]);
      }
    }
    return array;
  };
}
f = fibonacci();
console.log("10 fibonacci elements: " + f(10));

//Exercise 4.4
// console.log("\n Exercise 4.4 \n");

/*Exercise 4.5
function add(n, m) {
  return n + m;
}
function greater(n, m) {
  return n > m;
}
function get(attr, o) {
  return o[attr];
}
function pipe(f, g) {
  return function (x) {
    let r = f(x);
    return g(r);
  };
}
Rewrite your solution to names(), adults() and total_salariesof_seniors() using these functions.
*/
console.log("\nExercise 4.5");

let add = (n) => (m) => n + m;
let greater = (n) => (m) => n > m;
let get = (attr) => (o) => o[attr];
function pipe(f) {
  return function pipeSecond(g) {
    return function (x) {
      let r = f(x);
      return g(r);
    };
  };
}

addF = add(2);
console.log("add 2 + 5 = " + addF(5));
greaterF = greater(7);
console.log("7 greater than 4: " + greaterF(4));
array2 = [1, 2];
getF = get(1);
console.log("second element of array [1, 2]: " + getF(array2));
// pipeF = pipe(2);
// pipeF2 = pipeF(3);
// console.log(pipeF2(4));

//Exercise 4.6
// console.log("\n Exercise 4.6 \n");
