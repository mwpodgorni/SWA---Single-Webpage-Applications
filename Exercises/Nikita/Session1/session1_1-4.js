//a

for (i= 1; i <= 10; i++ ) {
    console.log(i);
}


//b
res = 0;
for (i= 1; i <= 10; i++ ) {
   res = res + i;
}
console.log("1.4.2 b)" + res);

//c

var res = 1;
for (i= 2; i <= 10; i++ ) {
    res = res * i; 
}
console.log("1.4.2 c) " + res);



//1.4.3

//a - undefinied

var a = [1, 2, 3, 5, 8]

//b - 

console.log( '1.4.3 b) ')
a.forEach(element => {
    console.log(element);
});


//c

res = 0;
a.forEach(element => {
   res = res + element;
});
console.log( '1.4.3 c) ', res)


//d 
sumOfelements = function(array) {
   let res = 0;
   array.forEach(element => {
        res = res + element;
     });
     return res;
}

// e ,f

a[8] = 55;
console.log ('1.4.3 e,f) ' + a[8]);

//g) 
console.log ('1.4.3 g) ' + a.length);


//h 

console.log ('1.4.3 h)', a);


//i
res = 0;
a.forEach(element => {
    res = res + element;
 });
 console.log( '1.4.3 c) ', res)



 //1.4.4 a
function makeFactorial (num) {
    let res = 1;
    for (i= 2; i <= num; i++ ) {
        res = res * i; 
    }
    return res;
}
console.log('1.4.4 a) ' + makeFactorial(0));


 //1.4.4 b
function makePower (m, n) {
    let res = 1;
    let power ;
    let neg;

    if (n > 0) {power = n }else {power= -n ; neg = true };

    for (i= 1; i <= power; i++ ) {
        res = res * m
    }
    if (neg) { res = 1/res}
    
    return res;
}

console.log('1.4.4 b) ' + makePower(5,-2))


//1.4.5 

function advancedFunction (m,n ) {
    if (n==null) {
        return makeFactorial (m);
    }
    else {
        return makePower(m,n);
    }
    
    
}

console.log('1.4.5 ' + advancedFunction(5,2))
console.log('1.4.5 ' + advancedFunction(5))


