	var tooSmallAbsoluteValue = abs(0.000000001);

	var Pi = Math.PI;
	var Pi_2 = Pi * 2;
	var Pi_1_2 = Pi / 2;

    // It's used via multiply operator.
    // For example:
    // var newDegree = givenRadian * radianToDegreeFactor;
	var radianToDegreeFactor = 180 / Pi;
    
    // It's used via multiply operator.
    // For example:
    // var newRadian = givenDegree * degreeToRadianFactor;
	var degreeToRadianFactor = Pi / 180;


	var abs = Math.abs;
	var random = Math.random;
	var sqroot = Math.sqrt;
	var sin = Math.sin;
	var cos = Math.cos;
	var tan = Math.tan;
	var atan2 = Math.atan2;

	function randomBetween(a, b) {
		return random() * (b-a) + a;
	}
	
	function ratioBetween(v, a, b) {
		if (a==b) return 1;
		return (b - v) /(b - a);
	}

	function nowInSeconds() {
		return new Date().getTime() / 1000;
	}
