// 
// Exercise 4.1
//

const persons = [{name: 'Nikita', age: 18, salary: 5}, {name: 'Michal', age: 17, salary: 4}, {name: 'Ole', age: 99, salary: 500}];

console.log ('names: ', persons.map (s => s.name));
console.log ('age: ', persons.map (s => s.age));
console.log ('oldest person: ', persons.reduce((a,b) => (a.age < b.age) ? b : a ));
console.log ('total salaries: ', persons.map(s=>s.salary).reduce((a,b) => a + b  ));




//
// Exercise 4.2
//

const immutableCenter = (x, y ) => {
   const _x = x;
   const _y = y;

    const getX = () =>  x

    const getY = () => y

    const moveTo = (x, y) =>  immutableCenter(x, y) 

    const toString = () =>  "center:  (" + x + " ; " + y + ")"
    
    const copy = () => immutableCenter (x,y);

    return {getX, getY, moveTo, toString, copy }
}

const immutableCircle = (center, radius) => {
   
    const _center = center;
    const _radius = radius;


    const getCenter = () => center

    const getRadius = () => radius

    const moveTo = () => center.moveTo( x, y )

    const toString = () =>  center.toString() + " / radius: " + radius 

    return { getCenter, getRadius, moveTo, toString }

}

c = immutableCenter(3,5);
ci = immutableCircle (c, 10);

console.log (ci.getCenter().getY());
// console.log (ci.toString())





//
// Exercise 4.3 a
//

function makePower(n) {
    arg = 2;
    function pow() { return Math.pow(arg, n)  }
    return pow;

};
console.log ('1  ', makePower(5)() );


//
// Exercise 4.3 b
//

var fibonacci = (function () {
    let f0 = 0;
    let f1 = 1;

    return function () {
        let oldf0 = f0;
        let oldf1 = f1;
            f0 = oldf1;
            f1 = oldf0 + oldf1;

            return f0
    }
  })();

  console.log ('Ex 4.3b');
  for (let i = 0; i < 10; i++ ) {
    console.log (fibonacci());
}


//
// Exercise 4.4
// 
// cannot rewrite anything from exercise 7 because it does not exist


//
// Exercise 4.5
//
console.log ('Exercise 4.5')

//1
const add = a => b => a + b;
console.log (add(2)(3))

//2
const greater = n => m => n > m
console.log (greater(4)(3))

//3
const get = attr => o => o[attr]
obj = {name: 'Ole', nickname: 'The greatest'}
console.log (get('nickname')(obj))

//4 f and g are just examples - can be whatever
f = (x) => { return x*2}
g = (r) => {return r-1}
const pipe = f => g => x => f(g(x));

console.log (pipe(f)(g)(3))


// Rewrite solutions to names(), adults(), total_salaries() using functions from 1-4

// ?
// kinda doesnt make sence, cause need to involve loops in here
// optimal are the solutions stated in 4.1
//


//
// Exercise 4.6 a
//

function reduce1(array, operator, defaultVal) {
    let current = defaultVal;
    for (let element of array) {
      current = operator(current, element);
    }
    return current;
  }

let array1 = [1,2,3,4];
function addOperator (a, b) {
    return a + b
};
console.log (reduce1(array1, addOperator, 0) );

//
// Exercise 4.6 b
//



