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

	function nowInSeconds() {
		return new Date().getTime() / 1000;
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


	wulechuanCanvas2DVector.presets = {
		impartVelocityPropertiesTo: wulechuanImpartVelocityPropertiesTo,
		impartForcePropertiesTo: wulechuanImpartForcePropertiesTo
	};
	

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
		var directionRadian = NaN; // the theta in radians.
		var directionBetween0And360 = NaN; // the theta in degrees.
		var directionBetween0And2Pi = NaN; // the theta in radians.



		// Being public means being writable.
		buildGettersAndSettersForPublicProperties();


		thisVector.setValue = setValue;

		thisVector.equalTo = equalTo;

		thisVector.swapComponents = swapComponents;
		thisVector.add = add;
		thisVector.subtract = subtract;
		thisVector.multiplyByScalar = multiplyByScalar;
		thisVector.rotateBy = rotateBy;
		thisVector.rotateByRadians = rotateByRadians;

		thisVector.getNewArrayOfSwappedComponents = getNewArrayOfSwappedComponents;
		thisVector.getNewArrayAddedBy = getNewArrayAddedBy;
		thisVector.getNewArraySubtractedBy = getNewArraySubtractedBy;
		thisVector.getNewArrayMultipliedByScalar = getNewArrayMultipliedByScalar;

		thisVector.getNewVectorOfSwappedComponents = getNewVectorOfSwappedComponents;
		thisVector.getNewVectorAddedBy = getNewVectorAddedBy;
		thisVector.getNewVectorSubtractedBy = getNewVectorSubtractedBy;
		thisVector.getNewVectorMultipliedByScalar = getNewVectorMultipliedByScalar;
		thisVector.getNewVectorRotatedBy = getNewVectorRotatedBy;
		thisVector.getNewVectorRotatedByRadians = getNewVectorRotatedByRadians;


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
			processAttribute('value');

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
				set: setValue
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

			Object.defineProperty(thisVector, 'directionBetween0And360', {
				enumerable: true,
				get: function () {
					return directionBetween0And360;
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

			Object.defineProperty(thisVector, 'directionBetween0And2Pi', {
				enumerable: true,
				get: function () {
					return directionBetween0And2Pi;
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
				directionBetween0And2Pi = NaN;
				directionBetween0And360 = NaN;

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
			directionBetween0And2Pi = directionRadian % Pi2;
			directionBetween0And360 = direction % 360;
		}


		function _evaluateArgmentsForComponents(a, b) {
			var newX = NaN;
			var newY = NaN;

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

			return [newX, newY];
		}

		function setValue(a, b) {
			var newComponents = _evaluateArgmentsForComponents(a, b);
			var newX = newComponents[0];
			var newY = newComponents[1];

			if (!isNaN(newX) && !isNaN(newY)) {
				x = newX;
				y = newY;
				evaluateLengthAndDirection();						
			}

			return [x, y];
		}

		function equalTo(a, b) {
			var comparingComponents = _evaluateArgmentsForComponents(a, b);
			var comparingX = comparingComponents[0];
			var comparingY = comparingComponents[1];

			if (!isNaN(comparingX) && !isNaN(comparingY)) {
				return x == comparingX && y === comparingY;
			}

			return false;
		}

		function getNewArrayOfSwappedComponents() {
			var newX = y;
			var newY = x;
			return [newX, newY];
		}

		function getNewArrayMultipliedByScalar(scalar) {
			var newX = x;
			var newY = y;

			scalar = parseFloat(scalar);
			if (!isNaN(scalar)) {
				newX *= scalar;
				newY *= scalar;
			}

			return [newX, newY];
		}

		function _addOrSubtract(a, b, shouldSubtract) {
			var additionComponents = _evaluateArgmentsForComponents(a, b);
			var newX = x;
			var newY = y;
			var additionX = additionComponents[0];
			var additionY = additionComponents[1];

			if (!isNaN(additionX) && !isNaN(additionY)) {
				if (shouldSubtract) {
					newX -= additionX;
					newY -= additionY;
				} else {
					newX += additionX;
					newY += additionY;
				}
			}

			return [newX, newY];
		}

		function _rotateBy(degrees) {
			return direction + degrees;
		}

		function _rotateByRadians(radians) {
			return directionRadian + radians;
		}


		function getNewVectorOfSwappedComponents() {
			return new wulechuanCanvas2DVector({
				value: getNewArrayOfSwappedComponents()
			});
		}

		function getNewArrayAddedBy(a, b) {
			return _addOrSubtract(a, b, false);
		}

		function getNewVectorAddedBy(a, b) {
			return new wulechuanCanvas2DVector({
				value: _addOrSubtract(a, b, false)
			});			
		}

		function getNewArraySubtractedBy(a, b) {
			return _addOrSubtract(a, b, true);
		}

		function getNewVectorSubtractedBy(a, b) {
			return new wulechuanCanvas2DVector({
				value: _addOrSubtract(a, b, true)
			});			
		}

		function getNewVectorMultipliedByScalar(scalar) {
			return new wulechuanCanvas2DVector({
				value: getNewArrayMultipliedByScalar(scalar)
			});			
		}

		function getNewVectorRotatedBy(degrees) {
			var newDirection = _rotateBy(degrees);
			return new wulechuanCanvas2DVector({
				length: length,
				direction: newDirection
			});
		}

		function getNewVectorRotatedByRadians(radians) {
			var newDirectionRadian = _rotateByRadians(radians);
			return new wulechuanCanvas2DVector({
				length: length,
				directionRadian: newDirectionRadian
			});
		}




		function swapComponents() {
			thisVector.value = getNewArrayOfSwappedComponents();
			return thisVector;
		}

		function multiplyByScalar(scalar) {
			thisVector.value = getNewArrayMultipliedByScalar(scalar);
			return thisVector;
		}

		function add(a, b) {
			thisVector.value = _addOrSubtract(a, b, false);
			return thisVector;
		}

		function subtract(a, b) {
			thisVector.value = _addOrSubtract(a, b, true);
			return thisVector;
		}

		function rotateBy(degrees) {
			thisVector.direction = _rotateBy(degrees);
			return thisVector;
		}

		function rotateByRadians(radians) {
			thisVector.directionRadian = _rotateBy(radians);
			return thisVector;
		}
	}

	function wulechuanImpartVelocityPropertiesTo() {
		// var grantee = this;
		// if (typeof grantee !== 'object' || !grantee) {
		// 	throw TypeError('The grantee to impart properties to must be an object, and not a null.');
		// }
		// Object.defineProperty(grantee, 'velocity', {
		// 	enumerable: true,
		// 	get: function () {
		// 		// only return copy of private object
		// 		return [velocity.x, velocity.y];
		// 	},
		// 	set: function (newVelocity) {
		// 		velocity.value = newVelocity;
		// 		// only return copy of private object
		// 		return [velocity.x, velocity.y];
		// 	}
		// });

		// Object.defineProperty(grantee, 'speed', {
		// 	enumerable: true,
		// 	get: function () {
		// 		return velocity.length;
		// 	},
		// 	set: function (newSpeed) {
		// 		velocity.length = newSpeed;
		// 		return velocity.length;
		// 	}
		// });

		// Object.defineProperty(grantee, 'speed2', {
		// 	enumerable: true,
		// 	get: function () {
		// 		return velocity.length2;
		// 	},
		// 	set: function (newSpeed2) {
		// 		velocity.length2 = newSpeed2;
		// 		return velocity.length2;
		// 	}
		// });

		// Object.defineProperty(grantee, 'velocityDirection', {
		// 	enumerable: true,
		// 	get: function () {
		// 		return velocity.direction;
		// 	},
		// 	set: function (newSpeedDirection) {
		// 		velocity.direction = newSpeedDirection;
		// 		return velocity.direction;
		// 	}
		// });

		// Object.defineProperty(grantee, 'velocityDirectionRadian', {
		// 	enumerable: true,
		// 	get: function () {
		// 		return velocity.directionRadian;
		// 	},
		// 	set: function (newSpeedDirectionRadian) {
		// 		velocity.directionRadian = newSpeedDirectionRadian;
		// 		return velocity.directionRadian;
		// 	}
		// });
	}

	function wulechuanImpartForcePropertiesTo() {
	}


	function wulechuanCanvas2DParticle(constructorOptions) {
		var thisParticle = this;

		var mass = 1; // mass

		var bornTime = NaN;
		var referenceTimeIsWallClockTime = true; // True means particle runs free mode, in which the particle does NOT need an explicit external time reference
		var referenceTime = NaN; // in seconds instead of milliseconds
		var age = NaN;
		var ageRatio = NaN;  // scalar that can be either NaN or between [0, 1]
		var ageLimitation = NaN; // in seconds
		var hasBeenBorn = false;
		var isDead = false;

		var position = new wulechuanCanvas2DVector({ x: 0, y: 0 });
		var velocity = new wulechuanCanvas2DVector({ x: 0, y: 0 });
		var force = new wulechuanCanvas2DVector({ x: 0, y: 0 });



		// Being public means being writable.
		buildGettersAndSettersForPublicProperties();


		thisParticle.onMove = undefined;

		// thisParticle.config = config;
		thisParticle.setPosition = thisParticle.moveTo;
		thisParticle.move = move;
		thisParticle.moveTo = moveTo;
		thisParticle.updateClock = updateReferenceTime;


		init(constructorOptions);


		function init(initOptions) {
			config(initOptions);
			bearOn(initOptions.bornTime);
		}

		function config(options) {
			options = options || {};

			// Obviously,
			// later processed attribute will overwrite ealier processed ones,
			// if their values are coupled.
			processAttribute('mass');
			processAttribute('ageRatio');
			processAttribute('age');
			processAttribute('ageLimitation');
			processAttribute('bornTime');
			processAttribute('x');
			processAttribute('y');
			processObjectAttribute('velocity');
			processObjectAttribute('force');

			function processAttribute(attributeName) {
				if (options.hasOwnProperty(attributeName)) {
					thisParticle[attributeName] = options[attributeName];
				}
			}

			function processObjectAttribute(attributeName) {
				if (options.hasOwnProperty(attributeName)) {
					thisParticle[attributeName].value = options[attributeName];
				}
			}
		}

		function buildGettersAndSettersForPublicProperties() {
			Object.defineProperty(thisParticle, 'ageRatio', {
				enumerable: true,
				get: function () {
					return ageRatio;
				},
				set: function (newAgeRatio) {
					if (!isNaN(ageLimitation)) {
						newAgeRatio = parseFloat(newAgeRatio);
						if (newAgeRatio >= 0 && newAgeRatio <= 1) {
							ageRatio = newAgeRatio;
						}
						evaluateAgeViaValidAgeRatio();
					}
					return ageRatio;
				}
			});

			Object.defineProperty(thisParticle, 'age', {
				enumerable: true,
				get: function () {
					return age;
				},
				set: setAgeTo
			});

			Object.defineProperty(thisParticle, 'ageLimitation', {
				enumerable: true,
				get: function () {
					return ageLimitation;
				},
				set: function (newAgeLimitation) {
					newAgeLimitation = parseFloat(newAgeLimitation);
					if (newAgeLimitation >= tooSmallAbsoluteValue) {
						ageLimitation = newAgeLimitation;
					}
					evaluateAgeRatio();
					return ageLimitation;
				}
			});

			Object.defineProperty(thisParticle, 'bornTime', {
				enumerable: true,
				get: function () {
					return bornTime;
				},
				set: bearOn
			});

			Object.defineProperty(thisParticle, 'mass', {
				enumerable: true,
				get: function () {
					return mass;
				},
				set: function (newMass) {
					newMass = parseFloat(newMass);
					if (newMass >= 0) mass = newMass;
					// if (mass < tooSmallAbsoluteValue) {
					// 	console.warn('The mass of Point2D is too low!');
					// }
					return mass;
				}
			});

			Object.defineProperty(thisParticle, 'x', {
				enumerable: true,
				get: function () {
					return position.x;
				},
				set: function (newPosX) {
					position.x = newPosX;
					return position.x;
				}
			});

			Object.defineProperty(thisParticle, 'y', {
				enumerable: true,
				get: function () {
					return position.y;
				},
				set: function (newPosY) {
					position.y = newPosY;
					return position.y;
				}
			});

			Object.defineProperty(thisParticle, 'position', {
				enumerable: true,
				get: function () {
					// only return copy of private object
					return [position.x, position.y];
				},
				set: function (newPosition) {
					position.value = newPosition;
					// only return copy of private object
					return [position.x, position.y];
				}
			});





			Object.defineProperty(thisParticle, 'velocity', {
				enumerable: true,
				get: function () {
					// only return copy of private object
					return [velocity.x, velocity.y];
				},
				set: function (newVelocity) {
					velocity.value = newVelocity;
					// only return copy of private object
					return [velocity.x, velocity.y];
				}
			});

			Object.defineProperty(thisParticle, 'speed', {
				enumerable: true,
				get: function () {
					return velocity.length;
				},
				set: function (newSpeed) {
					velocity.length = newSpeed;
					return velocity.length;
				}
			});

			Object.defineProperty(thisParticle, 'speed2', {
				enumerable: true,
				get: function () {
					return velocity.length2;
				},
				set: function (newSpeed2) {
					velocity.length2 = newSpeed2;
					return velocity.length2;
				}
			});

			Object.defineProperty(thisParticle, 'velocityDirection', {
				enumerable: true,
				get: function () {
					return velocity.direction;
				},
				set: function (newSpeedDirection) {
					velocity.direction = newSpeedDirection;
					return velocity.direction;
				}
			});

			Object.defineProperty(thisParticle, 'velocityDirectionRadian', {
				enumerable: true,
				get: function () {
					return velocity.directionRadian;
				},
				set: function (newSpeedDirectionRadian) {
					velocity.directionRadian = newSpeedDirectionRadian;
					return velocity.directionRadian;
				}
			});




			Object.defineProperty(thisParticle, 'force', {
				enumerable: true,
				get: function () {
					// only return copy of private object
					return [force.x, force.y];
				},
				set: function (newForce) {
					force.value = newForce;
					// only return copy of private object
					return [force.x, force.y];
				}
			});

			Object.defineProperty(thisParticle, 'forceStrength', {
				enumerable: true,
				get: function () {
					return force.length;
				},
				set: function (newForceStrength) {
					force.length = newForceStrength;
					return force.length;
				}
			});

			Object.defineProperty(thisParticle, 'forceStrength2', {
				enumerable: true,
				get: function () {
					return force.length2;
				},
				set: function (newForceStrength2) {
					force.length2 = newForceStrength2;
					return force.length2;
				}
			});

			Object.defineProperty(thisParticle, 'forceDirection', {
				enumerable: true,
				get: function () {
					return force.direction;
				},
				set: function (newForceDirection) {
					force.direction = newForceDirection;
					return force.direction;
				}
			});

			Object.defineProperty(thisParticle, 'forceDirectionRadian', {
				enumerable: true,
				get: function () {
					return force.directionRadian;
				},
				set: function (newForceDirectionRadian) {
					force.directionRadian = newForceDirectionRadian;
					return force.directionRadian;
				}
			});
		}


		function evaluateAgeInformationViaBornTimeAndReferenceTime() {
			var currentTime;
			if (referenceTimeIsWallClockTime) {
				currentTime = nowInSeconds();
			} else {
				currentTime = referenceTime;
			}

			if (currentTime >= bornTime) {
				hasBeenBorn = true;
				setAgeTo(currentTime - bornTime);
			} else {
				hasBeenBorn = false;
				isDead = false;
				age = NaN;
				ageRatio = NaN;
			}
		}

		function bearOn(desiredBornTimeInSeconds) {
			desiredBornTimeInSeconds = parseInt(desiredBornTimeInSeconds);
			if (desiredBornTimeInSeconds > 0) {
				referenceTimeIsWallClockTime = false;
			} else {
				referenceTimeIsWallClockTime = true;
				desiredBornTimeInSeconds = nowInSeconds();
			}

			bornTime = desiredBornTimeInSeconds;
			evaluateAgeInformationViaBornTimeAndReferenceTime();
		}

		function updateReferenceTime(newReferenceTimeInSeconds) {
			newReferenceTimeInSeconds = parseInt(newReferenceTimeInSeconds);
			if (isNaN(newReferenceTimeInSeconds)) {
				referenceTimeIsWallClockTime = true;
				evaluateAgeInformationViaBornTimeAndReferenceTime();
			} else {
				if (newReferenceTimeInSeconds > 0 && newReferenceTimeInSeconds !== referenceTime) {
					referenceTimeIsWallClockTime = false;
					referenceTime = newReferenceTimeInSeconds;
					evaluateAgeInformationViaBornTimeAndReferenceTime();
				} else {
					// The "referenceTimeIsWallClockTime" stays unchanged.
					// referenceTimeIsWallClockTime = false;
				}
			}
		}

		function evaluateBornTimeViaAge() {

		}

		function setAgeTo(newAge) {
			newAge = parseFloat(newAge);
			if (newAge >= 0) {
				if (newAge > ageLimitation) {
					age = ageLimitation;
				} else {
					age = newAge;
				}
			}
			evaluateAgeRatio();
			evaluateBornTimeViaAge();

			return age;
		}

		function detectDeath() {
			if (age >= ageLimitation) {
				age = ageLimitation;
				ageRatio = 1;
				isDead = true;
			}
		}

		function evaluateAgeViaValidAgeRatio() {
			age = ageLimitation * ageRatio;
			detectDeath();
		}

		function evaluateAgeRatio() {
			if (!isNaN(ageLimitation) && !isNaN(age)) {
				ageRatio = age / ageLimitation;
			} else {
				ageRatio = NaN;
			}
			detectDeath();
		}




		function move(durationInSeconds) {
			if (!hasBeenBorn) return;

			if (isDead) return;

			if (mass <= tooSmallAbsoluteValue) {
				return;
			}

			if (force.strength <= tooSmallAbsoluteValue) {
				return;
				// console.warn('Force is too small to move a Point2D.');
			}

			durationInSeconds = parseFloat(durationInSeconds);

			if (durationInSeconds <= tooSmallAbsoluteValue) {
				return;
				// console.warn('Duration is too small to move a Point2D.');
			}

			velocity.add(force.getNewArrayMultipliedByScalar(1 / mass));
			position.add(velocity.getNewArrayMultipliedByScalar(durationInSeconds));
		}

		function moveTo() {
			position.setValue.apply(arguments);
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