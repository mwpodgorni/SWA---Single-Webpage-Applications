// a) factory functions

const circle = (center, radius) => {
    const circle = {};
    circle.center = center;
    circle.radius = radius;


    getCenter = function () {
        return circle.center;
    }

    getRadius = function () {
        return circle.radius;
    }

    moveTo = function (x, y) {
        this.center.moveTo( x, y );
    }

    toString = function () {
        return ( center.toString() + " / radius: " + radius);
    }

    return { getCenter, getRadius, moveTo, toString }

}


const center = (x, y ) => {
    const center = {};
    center.x = x;
    center.y = y;

    getX = function () {
        return ( center.x ) ;
    }

    getY = function () {
        return ( center.y ) ;
    }

    moveTo = function (x, y) {
       this.x = x ;
       this.y = y ;
    }

    toString = function () {
        return ("center:  (" + x + " ; " + y + ")");
    }

    copy = function () {
        return center
    }


    return {getX, getY, moveTo, toString, copy }
}


c = center(3,5);
ci = circle (c, 10);

// console.log (c.toString())
// console.log (ci.toString())


// b) Array of Circles. map() to get array of radiuses 

circleArray = [ circle ({x:3,y:5}, 6), circle ({x:1,y:6}, 7), circle ({x:13,y:2}, 8)   ]
const map1 = circleArray.map(x => x.getRadius());
console.log("radiuses:" + map1);


// c) overload constructor - DONT KNOW




const circle_overloaded = (...args) => {
    const circle = {};

    if (args.length <2) {   
        throw new Exception('Not enough')
    } else if (args.length == 2) {
        circle.center = center;
        circle.radius = radius;
    } else {
        center = point(args[0], arg[1])
        radius = args [2]
    }
    


    getCenter = function () {
        return circle.center;
    }

    getRadius = function () {
        return circle.radius;
    }

    moveTo = function (x, y) {
        this.center.moveTo( x, y );
    }

    toString = function () {
        return ( center.toString() + " / radius: " + radius);
    }

    return { getCenter, getRadius, moveTo, toString }

}