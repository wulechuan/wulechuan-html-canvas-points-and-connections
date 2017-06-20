(function () {
	var requestAnimationFrame =
		window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};

	function randomBetween(a, b) {
		return random() * (b-a) + a;
	}
	
	function ratioBetween(v, a, b) {
		if (a==b) return 1;
		return (b - v) /(b - a);
	}
	
	var abs = Math.abs;
	var random = Math.random;
	var sqroot = Math.sqrt;
	var sin = Math.sin;
	var cos = Math.cos;
	var tan = Math.tan;
	var atan2 = Math.atan2;
	var Pi = Math.PI;
	var Pi2 = Pi * 2;
	var Pi_2 = Pi / 2;
	var tooSmallAbsoluteValue = abs(0.000000001);
	var radianToDegreeFactor = 180 / Pi; // used via multiply operator: var newDegree = givenRadian * radianToDegreeFactor;
	var degreeToRadianFactor = Pi / 180; // used via multiply operator: var newRadian = givenDegree * degreeToRadianFactor;



	wulechuanCanvasPointsAndConnections.utilities = {
		canvas2DVector: wulechuanCanvas2DVector,
		canvas2DParticle: wulechuanCanvas2DParticle
	};


	window.wulechuanCanvasPointsAndConnections = wulechuanCanvasPointsAndConnections;


	function wulechuanCanvas2DVector(constructorOptions) {
		var thisVector = this;

		var x = 0; // component a.
		var y = 0; // component b.
		var length = 0;
		var length2 = 0; // square of length; aka length * length.
		var direction = NaN; // the theta in degrees.
		var directionBetween0And360 = NaN; // the theta in degrees.
		var directionRadian = NaN; // the theta in radians.
		var directionBetween0And2Pi = NaN; // the theta in radians.



		// Being public means being writable.
		buildGettersAndSettersForPublicProperties();


		thisVector.swapComponents = swapComponents;
		thisVector.equalTo = equalTo;
		thisVector.add = add;
		thisVector.subtract = subtract;
		thisVector.multiplyByScalar = multiplyByScalar;
		thisVector.rotateBy = rotateBy;
		thisVector.rotateByRadians = rotateByRadians;


		init(constructorOptions);


		function init(initOptions) {
			config(initOptions);
		}

		function config(options) {
			options = options || {};

			// Obviously,
			// later processed attribute will overwrite ealier processed ones,
			// if their values are coupled.
			// For example the new value of x or y or both
			// will overwrite the new value of direction and directionRadian, if any.
			// While the new value of directionRadian
			// will overwrite that of the direction.
			processAttribute('length2');
			processAttribute('length');
			processAttribute('direction');
			processAttribute('directionRadian');
			processAttribute('x');
			processAttribute('y');

			function processAttribute(attributeName) {
				if (options.hasOwnProperty(attributeName)) {
					thisVector[attributeName] = options[attributeName];
				}
			}
		}



		function buildGettersAndSettersForPublicProperties() {
			Object.defineProperty(thisVector, 'x', {
				enumerable: true,
				get: function () {
					return x;
				},
				set: function (newX) {
					newX = parseFloat(newX);
					if (!isNaN(newX)) {
						x = newX;
						evaluateLengthAndDirection();
					}
					return x;
				}
			});

			Object.defineProperty(thisVector, 'y', {
				enumerable: true,
				get: function () {
					return y;
				},
				set: function (newY) {
					newY = parseFloat(newY);
					if (!isNaN(newY)) {
						y = newY;
						evaluateLengthAndDirection();						
					}
					return y;
				}
			});

			Object.defineProperty(thisVector, 'value', {
				enumerable: true,
				get: function () {
					return [x, y];
				},
				set: function (newValue) {
					var newX, newY;

					if (Array.isArray(newValue) && newValue.length > 1) {
						newX = parseFloat(newValue[0]);
						newY = parseFloat(newValue[1]);

						if (!isNaN(newX) && !isNaN(newY)) {
							x = newX;
							y = newY;
							evaluateLengthAndDirection();						
						}
					}

					return [x, y];
				}
			});

			Object.defineProperty(thisVector, 'isZeroVector', {
				enumerable: true,
				get: function () {
					return lengthIsWayTooSmall();
				}
			});

			Object.defineProperty(thisVector, 'length', {
				enumerable: true,
				get: function () {
					return length;
				},
				set: function (newLength) {
					newLength = parseFloat(newLength);
					if (newLength >= 0) {
						length = newLength;
						length2 = length * length;
						dealWithTinyLength();
						evaluateComponents();
					}
					return length;
				}
			});

			Object.defineProperty(thisVector, 'length2', {
				enumerable: true,
				get: function () {
					return length2;
				},
				set: function (newLength2) {
					newLength2 = parseFloat(newLength2);
					if (newLength2 >= 0) {
						length2 = newLength2;
						length = sqroot(length2);
						dealWithTinyLength();
						evaluateComponents();
					}
					return length2;
				}
			});

			Object.defineProperty(thisVector, 'direction', {
				enumerable: true,
				get: function () {
					return direction;
				},
				set: function (newDirection) {
					if (!lengthIsWayTooSmall()) {
						newDirection = parseFloat(newDirection);
						if (!isNaN(newDirection)) {
							direction = newDirection;
							// direction = newdirection % 360;
						}
						evaluateDirectionRadianViaDegree();
						evaluateComponents();
					}

					return direction;
				}
			});

			Object.defineProperty(thisVector, 'directionRadian', {
				enumerable: true,
				get: function () {
					return directionRadian;
				},
				set: function (newDirectionRadian) {
					if (!lengthIsWayTooSmall()) {
						newDirectionRadian = parseFloat(newDirectionRadian);
						if (!isNaN(newDirectionRadian)) {
							directionRadian = newDirectionRadian;
							// directionRadian = newDirectionRadian % Pi2;
						}
						evaluateDirectionDegreeViaRadian();
						evaluateComponents();
					}

					return directionRadian;
				}
			});
		}


		function lengthIsWayTooSmall() {
			return length <= tooSmallAbsoluteValue;
		}

		function dealWithTinyLength() {
			if (lengthIsWayTooSmall()) {
				direction = NaN;
				directionRadian = NaN;
				directionBetween0And360 = NaN;
				directionBetween0And2Pi = NaN;

				return true;
			}

			return false;
		}

		function evaluateDirectionRadianViaDegree() {
			directionRadian = direction * degreeToRadianFactor;
			evaluateDirectionBetweenZeroAnd2Pi();
		}

		function evaluateDirectionDegreeViaRadian() {
			direction = directionRadian * radianToDegreeFactor;
			evaluateDirectionBetweenZeroAnd2Pi();
		}

		function evaluateComponents() {
			x = length * sin(directionRadian);
			y = length * cos(directionRadian);
		}

		function evaluateLengthAndDirection() {
			length2 = x * x + y * y;
			length = sqroot(length2);
			if (!dealWithTinyLength()) {
				directionRadian = atan2(y, x);
				evaluateDirectionDegreeViaRadian();
			}
		}

		function evaluateDirectionBetweenZeroAnd2Pi() {
			directionBetween0And360 = direction % 360;
			directionBetween0And2Pi = directionRadian % Pi2;
		}


		function swapComponents() {
			var temp = x;
			x = y;
			y = temp;
			evaluateLengthAndDirection();

			return thisVector;
		}

		function multiplyByScalar(scalar) {
			scalar = parseFloat(scalar);
			if (!isNaN(scalar)) {
				x *= scalar;
				y *= scalar;
				evaluateLengthAndDirection();
			}

			return thisVector;
		}

		function add(a, b) {
			var newX = NaN, newY = NaN;

			if (a instanceof wulechuanCanvas2DVector) {
				newX = a.x;
				newY = a.y;
			} else if (Array.isArray(a)) {
				if (a.length > 1) {
					newX = parseFloat(a[0]);
					newY = parseFloat(a[1]);
				}
			} else {
				newX = parseFloat(a);
				newY = parseFloat(b);
			}

			if (!isNaN(newX) && !isNaN(newY)) {
				x += newX;
				y += newY;
				evaluateLengthAndDirection();
			}

			return thisVector;
		}

		function subtract(a, b) {
			var newX = NaN, newY = NaN;

			if (a instanceof wulechuanCanvas2DVector) {
				newX = a.x;
				newY = a.y;
			} else if (Array.isArray(a)) {
				if (a.length > 1) {
					newX = parseFloat(a[0]);
					newY = parseFloat(a[1]);
				}
			} else {
				newX = parseFloat(a);
				newY = parseFloat(b);
			}

			if (!isNaN(newX) && !isNaN(newY)) {
				x -= newX;
				y -= newY;
				evaluateLengthAndDirection();
			}

			return thisVector;
		}

		function equalTo(a, b) {
			var newX = NaN, newY = NaN;

			if (a instanceof wulechuanCanvas2DVector) {
				newX = a.x;
				newY = a.y;
			} else if (Array.isArray(a)) {
				if (a.length > 1) {
					newX = parseFloat(a[0]);
					newY = parseFloat(a[1]);
				}
			} else {
				newX = parseFloat(a);
				newY = parseFloat(b);
			}

			if (!isNaN(newX) && !isNaN(newY)) {
				return x == newX && y === newY;
			}

			return false;
		}

		function rotateBy(degrees) {
			this.direction += degrees;
		}

		function rotateByRadians(radians) {
			this.directionRadian += radians;
		}
	}

	function wulechuanCanvas2DParticle(constructorOptions) {
		var thisParticle = this;


		var x = 0; // x poisition
		var y = 0; // y position

		var mass = 1; // mass

		var velocity = new wulechuanCanvas2DVector({ x: 0, y: 0 });
		var force = new wulechuanCanvas2DVector({ x: 0, y: 0 });

		var bornTime = NaN;
		var age = NaN;
		var ageRatio = NaN;  // scalar that can be either NaN or between [0, 1]
		var ageLimitation = NaN; // in seconds
		var hasBeenBorn = false;
		var isDead = false;



		// Being public means being writable.
		buildGettersAndSettersForPublicProperties();


		thisParticle.onMove = undefined;

		thisParticle.config = config.bind(thisParticle);
		thisParticle.move = move.bind(thisParticle);
		thisParticle.updateClock = evaluateAge.bind(thisParticle); // single argument, time in seconds
		thisParticle.moveTo = moveTo.bind(thisParticle);
		thisParticle.setPosition = thisParticle.moveTo;

		// thisPoint.setVelocity = setVelocity.bind(thisPoint);
		// thisPoint.addVelocity = addVelocity.bind(thisPoint);
		// thisPoint.setForce = setForce.bind(thisPoint);
		// thisPoint.addForce = addForce.bind(thisPoint);


		init(constructorOptions);


		function init(initOptions) {
			config(initOptions);

			var desiredBornTime = parseInt(initOptions.bornTime);
			var now = new Date().getTime() / 1000;

			if (desiredBornTime > 0) {
				bornTime = desiredBornTime;
			} else {
				bornTime = now;
			}

			evaluateAge(now);
		}

		function config(options) {
			options = options || {};

			// Obviously,
			// later processed attribute will overwrite ealier processed ones,
			// if their values are coupled.
			processAttribute('ageRatio');
			processAttribute('age');
			processAttribute('ageLimitation');
			processAttribute('bornTime');
			processAttribute('m');
			processAttribute('x');
			processAttribute('y');
			processAttribute('speed2');
			processAttribute('speed');
			processAttribute('speedDirection');
			processAttribute('speedDirectionRadian');
			processAttribute('vx');
			processAttribute('vy');
			processAttribute('forceStrength2');
			processAttribute('forceStrength');
			processAttribute('forceDirection');
			processAttribute('forceDirectionRadian');
			processAttribute('forceX');
			processAttribute('forceY');

			function processAttribute(attributeName) {
				if (options.hasOwnProperty(attributeName)) {
					thisParticle[attributeName] = options[attributeName];
				}
			}
		}

		function buildGettersAndSettersForPublicProperties() {
			Object.defineProperty(publicState, 'ageRatio', {
				enumerable: true,
				get: function () {
					return ageRatio;
				},
				set: function (newAgeRatio) {
					if (!isNaN(ageLimitation)) {
						newAgeRatio = parseFloat(newAgeRatio);
						if (newAgeRatio >= 0 && newAgeRatio <= 1) ageRatio = newAgeRatio;
						evaluateAgeInformationViaAgeRatio();
					}
					return ageRatio;
				}
			});

			Object.defineProperty(publicState, 'age', {
				enumerable: true,
				get: function () {
					return age;
				},
				set: function (newAge) {
					newAge = parseFloat(newAge);
					if (newAge >= 0) {
						if (newAge > ageLimitation) {
							age = ageLimitation;
						} else {
							age = newAge;
						}
					}
					evaluateAgeInformationViaAge();
					return age;
				}
			});

			Object.defineProperty(publicState, 'ageLimitation', {
				enumerable: true,
				get: function () {
					return ageLimitation;
				},
				set: function (newAgeLimitation) {
					newAgeLimitation = parseFloat(newAgeLimitation);
					if (newAgeLimitation >= tooSmallAbsoluteValue) {
						ageLimitation = newAgeLimitation;
					}
					evaluateAgeInformationViaAgeLimitation();
					return ageLimitation;
				}
			});

			Object.defineProperty(publicState, 'bornTime', {
				enumerable: true,
				get: function () {
					return bornTime;
				},
				set: function (newBornTime) {
					newBornTime = parseInt(newBornTime);
					if (newBornTime >= 0) {
						bornTime = newBornTime;
					}
					evaluateAgeInformationViaBornTime();
					return bornTime;
				}
			});

			Object.defineProperty(publicState, 'mass', {
				enumerable: true,
				get: function () {
					return mass;
				},
				set: function (newMass) {
					newMass = parseFloat(newMass);
					if (newMass >= 0) mass = newMass;
					if (Math.abs(mass) < tooSmallAbsoluteValue) {
						console.warn('The mass of Point2D is too low!');
					}
					return mass;
				}
			});

			Object.defineProperty(publicState, 'x', {
				enumerable: true,
				get: function () {
					return x;
				},
				set: function (newPosX) {
					newPosX = parseFloat(newPosX);
					if (!isNaN(newPosX)) x = newPosX;
					return x;
				}
			});

			Object.defineProperty(publicState, 'y', {
				enumerable: true,
				get: function () {
					return y;
				},
				set: function (newPosY) {
					newPosY = parseFloat(newPosY);
					if (!isNaN(newPosY)) y = newPosY;
					return y;
				}
			});

			Object.defineProperty(publicState, 'position', {
				enumerable: true,
				get: function () {
					return [x, y];
				},
				set: function (newPosition) {
					var newX, newY;

					if (Array.isArray(newPosition) && newPosition.length > 1) {
						newX = parseFloat(newPosition[0]);
						newY = parseFloat(newPosition[1]);

						if (!isNaN(newX) && !isNaN(newY)) {
							x = newX;
							y = newY;
						}
					}

					return [x, y];
				}
			});

			Object.defineProperty(publicState, 'v', {
				enumerable: true,
				get: function () {
					return [vx, vy];
				},
				set: function (newVelocity) {
					var newVX, newVY;

					if (Array.isArray(newVelocity) && newVelocity.length > 1) {
						newVX = parseFloat(newVelocity[0]);
						newVY = parseFloat(newVelocity[1]);

						if (!isNaN(newVX) && !isNaN(newVY)) {
							vx = newVX;
							vy = newVY;
						}
					}

					evaluateSpeedAndDirectionViaVelocity();

					return [vx, vy];
				}
			});

			Object.defineProperty(publicState, 'vx', {
				enumerable: true,
				get: function () {
					return vx;
				},
				set: function (newVX) {
					newVX = parseFloat(newVX);
					if (!isNaN(newVX)) vx = newVX;
					evaluateSpeedAndDirectionViaVelocity();
					return vx;
				}
			});

			Object.defineProperty(publicState, 'vy', {
				enumerable: true,
				get: function () {
					return vy;
				},
				set: function (newVY) {
					newVY = parseFloat(newVY);
					if (!isNaN(newVY)) vy = newVY;
					evaluateSpeedAndDirectionViaVelocity();
					return vy;
				}
			});

			Object.defineProperty(publicState, 'speed', {
				enumerable: true,
				get: function () {
					return speed;
				},
				set: function (newSpeed) {
					newSpeed = parseFloat(newSpeed);
					if (newSpeed >= 0) speed = newSpeed;
					evaluateVelocityViaSpeedAndDirection();
					return speed;
				}
			});

			Object.defineProperty(publicState, 'speed2', {
				enumerable: true,
				get: function () {
					return speed2;
				}
				// speed2 has no setter
			});

			Object.defineProperty(publicState, 'speedDirection', {
				enumerable: true,
				get: function () {
					return speedDirection;
				},
				set: function (newSpeedDirection) {
					newSpeedDirection = parseFloat(newSpeedDirection);
					if (!isNaN(newSpeedDirection)) {
						speedDirection = newSpeedDirection % 360;
					}
					evaluateVelocityViaSpeedAndDirection();
					evaluateSpeedDirectionRadianViaDegrees();
					return speedDirection;
				}
			});

			Object.defineProperty(publicState, 'speedDirectionRadian', {
				enumerable: true,
				get: function () {
					return speedDirectionRadian;
				},
				set: function (newSpeedDirectionRadian) {
					newSpeedDirectionRadian = parseFloat(newSpeedDirectionRadian);
					if (!isNaN(newSpeedDirectionRadian)) {
						speedDirectionRadian = newSpeedDirectionRadian % Pi2;
					}
					evaluateVelocityViaSpeedAndDirection();
					evaluateSpeedDirectionDegreesViaRadian();
					return speedDirectionRadian;
				}
			});





			Object.defineProperty(publicState, 'force', {
				enumerable: true,
				get: function () {
					return [forceX, forceY];
				},
				set: function (newForce) {
					var newForceX, newForceY;

					if (Array.isArray(newForce) && newForce.length > 1) {
						newForceX = parseFloat(newForce[0]);
						newForceY = parseFloat(newForce[1]);

						if (!isNaN(newForceX) && !isNaN(newForceY)) {
							forceX = newForceX;
							forceY = newForceY;
						}
					}

					evaluateForceStrengthAndDirectionViaForceVectory();

					return [forceX, forceY];
				}
			});

			Object.defineProperty(publicState, 'forceX', {
				enumerable: true,
				get: function () {
					return forceX;
				},
				set: function (newForceX) {
					newForceX = parseFloat(newForceX);
					if (!isNaN(newForceX)) forceX = newForceX;
					evaluateForceStrengthAndDirectionViaForceVectory();
					return forceX;
				}
			});

			Object.defineProperty(publicState, 'forceY', {
				enumerable: true,
				get: function () {
					return forceY;
				},
				set: function (newForceY) {
					newForceY = parseFloat(newForceY);
					if (!isNaN(newForceY)) forceY = newForceY;
					evaluateForceStrengthAndDirectionViaForceVectory();
					return forceY;
				}
			});

			Object.defineProperty(publicState, 'forceStrength', {
				enumerable: true,
				get: function () {
					return forceStrength;
				},
				set: function (newForceStrength) {
					newForceStrength = parseFloat(newForceStrength);
					if (newForceStrength >= 0) forceStrength = newForceStrength;
					evaluateForceVectorViaForceStrengthAndDirection();
					return forceStrength;
				}
			});

			Object.defineProperty(publicState, 'forceStrength2', {
				enumerable: true,
				get: function () {
					return forceStrength2;
				}
				// forceStrength2 has no setter
			});

			Object.defineProperty(publicState, 'forceDirection', {
				enumerable: true,
				get: function () {
					return forceDirection;
				},
				set: function (newForceDirection) {
					newForceDirection = parseFloat(newForceDirection);
					if (!isNaN(newForceDirection)) {
						forceDirection = newForceDirection;
						// forceDirection = newForceDirection % 360;
					}
					evaluateForceVectorViaForceStrengthAndDirection();
					evaluateForceDirectionRadianViaDegrees();
					return forceDirection;
				}
			});

			Object.defineProperty(publicState, 'forceDirectionRadian', {
				enumerable: true,
				get: function () {
					return forceDirectionRadian;
				},
				set: function (newForceDirectionRadian) {
					newForceDirectionRadian = parseFloat(newForceDirectionRadian);
					if (!isNaN(newForceDirectionRadian)) {
						forceDirectionRadian = newForceDirectionRadian;
						// forceDirectionRadian = newforceDirectionRadian % Pi2;
					}
					evaluateForceVectorViaForceStrengthAndDirection();
					evaluateForceDirectionDegreesViaRadian();
					return forceDirectionRadian;
				}
			});
		}



		function evaluateVelocityViaSpeedAndDirection() {
			vx = speed * sin(speedDirectionRadian);
			vy = speed * cos(speedDirectionRadian);
		}

		function evaluateSpeedAndDirectionViaVelocity() {
			speed2 = vx * vx + vy * vy;
			speed = sqroot(speed2);
			speedDirectionRadian = atan2(vy, vx);
			evaluateSpeedDirectionDegreesViaRadian();
		}

		function evaluateSpeedDirectionRadianViaDegrees() {
			speedDirectionRadian = speedDirection * degreeToRadianFactor;
		}

		function evaluateSpeedDirectionDegreesViaRadian() {
			speedDirection = speedDirectionRadian * radianToDegreeFactor;
		}



		function evaluateForceVectorViaForceStrengthAndDirection() {
			forceX = forceStrength * sin(forceDirectionRadian);
			forceY = forceStrength * cos(forceDirectionRadian);
		}

		function evaluateForceStrengthAndDirectionViaForceVectory() {
			forceStrength2 = forceX * forceX + forceY * forceY;
			forceStrength = sqroot(forceStrength2);
			forceDirectionRadian = atan2(forceY, forceX);
			evaluateForceDirectionDegreesViaRadian();
		}

		function evaluateForceDirectionRadianViaDegrees() {
			forceDirectionRadian = forceDirection * degreeToRadianFactor;
		}

		function evaluateForceDirectionDegreesViaRadian() {
			forceDirection = forceDirectionRadian * radianToDegreeFactor;
		}




		function evaluateAge(localTimeInSeconds) {
			if (localTimeInSeconds >= bornTime) {
				age = localTimeInSeconds - bornTime;
				hasBeenBorn = true;
				if (age >= ageLimitation) {
					age = ageLimitation;
					isDead = true;
				}
				ageRatio = age / ageLimitation;
			} else {
				age = NaN;
				ageRatio = NaN;
				hasBeenBorn = false;
				isDead = false;
			}
		}

		function move(duration) {
			if (!hasBeenBorn) return;

			if (isDead) return;

			if (mass <= tooSmallAbsoluteValue) {
				return;
			}

			if (forceStrength <= tooSmallAbsoluteValue) {
				return;
				// console.warn('Force is too small to move a Point2D.');
			}

			duration = parseFloat(duration);

			if (duration <= tooSmallAbsoluteValue) {
				return;
				// console.warn('Duration is too small to move a Point2D.');
			}

			vx += forceX / mass;
			vy += forceY / mass;

			evaluateSpeedAndDirectionViaVelocity();

			x += vx;
			y += vy;
		}

		function moveTo(a, b) {
			if (Array.isArray(a) && typeof b === 'undefined') {
				publicState.position = a;
			} else {
				publicState.position = [a, b];
			}
		}
	}

	function wulechuanCanvasPointsAndConnections(constructorOptions) {
		var thisController = this;

		var canvas = constructorOptions.canvas;
		var canvasContext = canvas.getContext('2d');


		var lineWidthDrawingThreshold = 0.2;
		var pointSize = 6;
		var thickestLineWidth = 2;
		var maxDistanceToMakeConnection = 160;
		var pointsCount = 60;
		var speedMin = 0.8;
		var speedMax = 2.4;
		var pointColorRGB = '0,0,0';
		var lineColorRGB = '0,0,0';
		var pointsAreRounded = true;
		var shouldBounceAtBoundary = true;

		var activeAreaX1 = 0;
		var activeAreaY1 = 0;
		var activeAreaX2 = 0;
		var activeAreaY2 = 0;
		var mouseCursorX = null;
		var mouseCursorY = null;
		var maxDistanceToMakeConnection2 = 100000;

		var allPoints = [];
		var theDrawPointMethod;

		var random = Math.random;


		thisController.generateOnePoint = _generateOnePointDefaultMethod;
		thisController.updateOnePointOnIteration = _updateOnePointOnIterationDefaultMethod;
		thisController.drawFrame = drawFrame.bind(thisController);
		thisController.updateCanvasSize = updateCanvasSize.bind(thisController);
		thisController.setActiveArea = setActiveArea.bind(thisController);


		init(constructorOptions);




		var hasBeenInitialized = false;

		function init(initOptions) {
			config(initOptions);
			setupMouseEvents();
			updateCanvasSize();
			_generateAllPoints();

			hasBeenInitialized = true;
		}

		function config(options) {
			options = options || {};

			if (typeof options.pointsAreRounded === 'boolean') pointsAreRounded = options.pointsAreRounded;
			if (typeof options.shouldBoundAtBoundary === 'boolean') shouldBounceAtBoundary = options.shouldBoundAtBoundary;

			if (options.pointSize) pointSize = options.pointSize;
			if (options.thickestLineWidth) thickestLineWidth = options.thickestLineWidth;
			if (options.maxDistanceToMakeConnection) maxDistanceToMakeConnection = options.maxDistanceToMakeConnection;
			if (options.pointsCount) pointsCount = options.pointsCount;
			if (options.pointColorRGB) pointColorRGB = options.pointColorRGB;
			if (options.lineColorRGB) lineColorRGB = options.lineColorRGB;
			if (options.lineWidthDrawingThreshold) lineWidthDrawingThreshold = options.lineWidthDrawingThreshold;
			if (options.speedMin) speedMin = options.speedMin;
			if (options.speedMax) speedMax = options.speedMax;

			maxDistanceToMakeConnection2 = maxDistanceToMakeConnection * maxDistanceToMakeConnection;

			theDrawPointMethod = pointsAreRounded ? _drawPointAsRoundedDot : _drawPointAsSqure;

			if (options.hasOwnProperty('updateOnePointOnIteration')) {
				if (typeof options.updateOnePointOnIteration === 'function') {
					thisController.updateOnePointOnIteration = options.updateOnePointOnIteration;
				} else {
					thisController.updateOnePointOnIteration = _updateOnePointOnIterationDefaultMethod;
				}
			}

			var oldGenerateOnePointMethod = thisController.generateOnePoint;
			if (options.hasOwnProperty('generateOnePoint')) {
				if (typeof options.generateOnePoint === 'function') {
					thisController.generateOnePoint = options.generateOnePoint;
				} else {
					thisController.generateOnePoint = _generateOnePointDefaultMethod;
				}
			}

			if (hasBeenInitialized && oldGenerateOnePointMethod !== thisController.generateOnePoint) {
				_generateAllPoints();
			}
		}

		function setupMouseEvents() {
			window.addEventListener('mousemove', function (event) {
				mouseCursorX = event.clientX;
				mouseCursorY = event.clientY;
			});

			window.addEventListener('mouseout', function () {
				mouseCursorX = null;
				mouseCursorY = null;
			});
		}


		function updateCanvasSize(toUpdateActiveArea) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;

			if (typeof toUpdateActiveArea === 'function') {
				toUpdateActiveArea(canvas);
			} else {
				setActiveArea(0, 0, canvas.width, canvas.height);
			}
		}


		function setActiveArea(x1, y1, x2, y2) {
			activeAreaX1 = Math.min(x1, x2);
			activeAreaX2 = Math.max(x1, x2);
			activeAreaY1 = Math.min(y1, y2);
			activeAreaY2 = Math.max(y1, y2);
		}

		function drawFrame() {
			var px, py, comparingPoint;


			canvasContext.clearRect(0, 0, canvas.width, canvas.height);


			allPoints.forEach(function (point, pointIndex) {
				thisController.updateOnePointOnIteration(point);


				point.x += point.vx;
				point.y += point.vy;


				px = point.x;
				py = point.y;


				if (shouldBounceAtBoundary) {
					if (px > activeAreaX2) {
						point.vx = Math.abs(point.vx) * -1;
					}
					if (py > activeAreaY2) {
						point.vy = Math.abs(point.vy) * -1;
					}
					if (px < activeAreaX1) {
						point.vx = Math.abs(point.vx);
					}
					if (py < activeAreaY1) {
						point.vy = Math.abs(point.vy);
					}
				}


				var i = pointIndex + 1;
				for ( ; i < allPoints.length; i++) {
					comparingPoint = allPoints[i];

					drawLine(
						px, py, comparingPoint.x, comparingPoint.y,
						evaluateDistanceRatio(px, py, comparingPoint.x, comparingPoint.y)
					);

					if (mouseCursorX !== null) {
						drawLine(
							px, py, mouseCursorX, mouseCursorY,
							evaluateDistanceRatio(px, py, mouseCursorX, mouseCursorY)
						);
					}
				}


				theDrawPointMethod(px, py);
			});


			if (mouseCursorX !== null) {
				theDrawPointMethod(mouseCursorX, mouseCursorY);
			}
		}

		function _drawPointAsRoundedDot(px, py) {
			canvasContext.fillStyle = 'rgba(' + pointColorRGB + ',' + 1 + ')';
			canvasContext.beginPath();
			canvasContext.arc(px, py, pointSize/2, 0, Math.PI * 2);
			canvasContext.fill();
		}

		function _drawPointAsSqure(px, py) {
			canvasContext.fillRect(px - pointSize/2, py - pointSize/2, pointSize, pointSize);
		}

		function drawLine(p1x, p1y, p2x, p2y, distanceRatio) {
			var lineWidthRatio = 1 - distanceRatio;
			var lineWidth = thickestLineWidth * lineWidthRatio;
			if (lineWidth < lineWidthDrawingThreshold) return;

			var lineColor =  'rgba(' + lineColorRGB + ',' + Math.min(1, lineWidthRatio + 0.5) + ')';

			canvasContext.lineWidth = lineWidth;
			canvasContext.strokeStyle = lineColor;

			canvasContext.beginPath();
			canvasContext.moveTo(p1x, p1y);
			canvasContext.lineTo(p2x, p2y);
			canvasContext.stroke();
		}

		function _generateAllPoints() {
			allPoints.length = 0;

			for (var i = 0; i < pointsCount; i++) {
				var point = {};
				
				thisController.generateOnePoint(
					point, pointsCount, activeAreaX1, activeAreaY1, activeAreaX2, activeAreaY2
				);

				thisController.updateOnePointOnIteration(
					point, speedMin, speedMax, pointsCount, activeAreaX1, activeAreaY1, activeAreaX2, activeAreaY2
				);

				allPoints.push(point);
			}
		}

		function _generateOnePointDefaultMethod(point) {
			point.x = random() * (activeAreaX2 - activeAreaX1) + activeAreaX1;
			point.y = random() * (activeAreaY2 - activeAreaY1) + activeAreaY1;
		}

		function _updateOnePointOnIterationDefaultMethod(point) {
			var speed, direction;


			if (!point.hasOwnProperty('vx')) {
				speed = random() * (speedMax - speedMin) + speedMin;
				direction = random() * 2 * Math.PI;
			} else {
				var oldSpeed = point.speed;
				var oldDirection = point.direction;
				// var oldVx = point.vx;
				// var oldVy = point.vy;

				speed = oldSpeed * (random() * 0.1 + 0.95);
				direction = oldDirection + (random() * 8 - 4) / 360 * Math.PI;
			}


			point.speed = speed;
			point.direction = direction;
			point.vx = speed * Math.sin(direction);
			point.vy = speed * Math.cos(direction);
		}

		function evaluateDistanceRatio(p1x, p1y, p2x, p2y) {
			var dx = p1x - p2x;
			var dy = p1y - p2y;
			var distance2 = dx * dx + dy * dy;
			return Math.min(1, distance2 / maxDistanceToMakeConnection2);
		}
	}
})();