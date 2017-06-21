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
	var Pi_2 = Pi * 2;
	var Pi_1_2 = Pi / 2;
	var tooSmallAbsoluteValue = abs(0.000000001);
	var radianToDegreeFactor = 180 / Pi; // used via multiply operator: var newDegree = givenRadian * radianToDegreeFactor;
	var degreeToRadianFactor = Pi / 180; // used via multiply operator: var newRadian = givenDegree * degreeToRadianFactor;


	wulechuan2DVector.presets = {
		impartVelocityPropertiesTo: wulechuanImpartVelocityPropertiesTo,
		impartForcePropertiesTo: wulechuanImpartForcePropertiesTo
	};
	

	wulechuanCanvasPointsAndConnections.utilities = {
		wulechuan2DVector: wulechuan2DVector,
		wulechuan2DParticle: wulechuan2DParticle
	};


	window.wulechuanCanvasPointsAndConnections = wulechuanCanvasPointsAndConnections;


	function wulechuan2DVector(constructorOptions) {
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
		thisVector.getDistanceTo = getDistanceTo;
		thisVector.getDistance2To = getDistance2To;

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
			directionBetween0And2Pi = directionRadian % Pi_2;
			directionBetween0And360 = direction % 360;
		}


		function _evaluateArgmentsForComponents(a, b) {
			var newX = NaN;
			var newY = NaN;

			if (a instanceof wulechuan2DVector) {
				newX = a.x;
				newY = a.y;
			} else if (Array.isArray(a)) {
				if (a.length > 1) {
					newX = parseFloat(a[0]);
					newY = parseFloat(a[1]);
				}
			} else if (a && typeof a === 'object' && a.hasOwnProperty('x')) {
				newX = parseFloat(a.x);
				newY = parseFloat(a.y);
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

		function getDistance2To(a, b) {
			var comparingComponents = _evaluateArgmentsForComponents(a, b);
			var dx = comparingComponents[0] - x;
			var dy = comparingComponents[1] - y;

			if (!isNaN(dx) && !isNaN(dy)) {
				return dx * dx + dy * dy;
			}

			return NaN;
		}

		function getDistanceTo(a, b) {
			return sqroot(getDistance2To(a, b));
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
			return new wulechuan2DVector({
				value: getNewArrayOfSwappedComponents()
			});
		}

		function getNewArrayAddedBy(a, b) {
			return _addOrSubtract(a, b, false);
		}

		function getNewVectorAddedBy(a, b) {
			return new wulechuan2DVector({
				value: _addOrSubtract(a, b, false)
			});			
		}

		function getNewArraySubtractedBy(a, b) {
			return _addOrSubtract(a, b, true);
		}

		function getNewVectorSubtractedBy(a, b) {
			return new wulechuan2DVector({
				value: _addOrSubtract(a, b, true)
			});			
		}

		function getNewVectorMultipliedByScalar(scalar) {
			return new wulechuan2DVector({
				value: getNewArrayMultipliedByScalar(scalar)
			});			
		}

		function getNewVectorRotatedBy(degrees) {
			var newDirection = _rotateBy(degrees);
			return new wulechuan2DVector({
				length: length,
				direction: newDirection
			});
		}

		function getNewVectorRotatedByRadians(radians) {
			var newDirectionRadian = _rotateByRadians(radians);
			return new wulechuan2DVector({
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
		// 		return [velocity.x, velocity.y];
		// 	},
		// 	set: function (newVelocity) {
		// 		velocity.value = newVelocity;
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


	function wulechuan2DParticle(constructorOptions) {
		var thisParticle = this;

		var mass = 1; // mass

		var bornTime = NaN;
		var referenceTime = NaN; // in seconds instead of milliseconds
		var referenceTimeIsWallClockTime = true; // True means particle runs free mode, in which the particle does NOT need an explicit external time reference
		var age = NaN;
		var ageRatio = NaN;  // scalar that can be either NaN or between [0, 1]
		var ageLimitation = NaN; // in seconds
		var hasBeenBorn = false;
		var isDead = false;

		var position = new wulechuan2DVector({ x: 0, y: 0 });
		var velocity = new wulechuan2DVector({ x: 0, y: 0 });
		var force = new wulechuan2DVector({ x: 0, y: 0 });

		// Being public means being writable.
		buildGettersAndSettersForPublicProperties();


		thisParticle.onMove = undefined;

		// thisParticle.config = config;
		thisParticle.move = move;
		thisParticle.moveTo = moveTo;
		thisParticle.setPosition = moveTo;


		init(constructorOptions);


		function init(initOptions) {
			initOptions = initOptions || {};
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
							age = ageLimitation * ageRatio;
							evaluateBornTimeViaAge();
							detectDeath();
						}
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

			Object.defineProperty(thisParticle, 'referenceTimeIsWallClockTime', {
				enumerable: true,
				get: function () {
					return referenceTimeIsWallClockTime;
				},
				set: function (mustBeTrueToTakeEffects) {
					if (mustBeTrueToTakeEffects) {
						updateReferenceTime(NaN);
					} else {
						// if we set "referenceTimeIsWallClockTime" to false
						// without providing an explicit reference time,
						// then values such as "bornTime" and "age"
						// are not possible to evaluate any more.
					}
				}
			});

			Object.defineProperty(thisParticle, 'referenceTime', {
				enumerable: true,
				get: function () {
					return referenceTime;
				},
				set: updateReferenceTime
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
					return position;
				},
				set: function (newPosition) {
					return position.value = newPosition;
				}
			});





			Object.defineProperty(thisParticle, 'velocity', {
				enumerable: true,
				get: function () {
					return velocity;
				},
				set: function (newVelocity) {
					return velocity.value = newVelocity;
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
					return force;
				},
				set: function (newForce) {
					return force.value = newForce;
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
				referenceTime = NaN;
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

		function evaluateAgeRatio() {
			if (!isNaN(ageLimitation) && !isNaN(age)) {
				ageRatio = age / ageLimitation;
			} else {
				ageRatio = NaN;
			}
			detectDeath();
		}

		function evaluateBornTimeViaAge() {
			if (isNaN(age)) {
				bornTime = NaN;
			} else {
				if (referenceTimeIsWallClockTime) {
					bornTime = nowInSeconds() - age;
				} else {
					bornTime = referenceTime - age;
				}
			}
		}

		function detectDeath() {
			if (age >= ageLimitation) {
				age = ageLimitation;
				ageRatio = 1;
				isDead = true;
			}
		}




		function move(durationInSeconds) {
			if (!hasBeenBorn) return;

			if (isDead) return;

			if (mass <= tooSmallAbsoluteValue) {
				return;
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
			position.setValue.apply(position, arguments);
		}
	}

	function wulechuanCanvasPointsAndConnections(constructorOptions) {
		var thisController = this;

		var canvas = constructorOptions.canvas;
		var canvasContext = canvas.getContext('2d');


		var lineWidthDrawingThreshold = 0.2;
		var pointSize = 2;
		var thickestLineWidth = 2;
		var maxDistanceToMakeConnection = 160;
		var pointsCount = 60;
		var pointColorRGB = '0,0,0';
		var lineColorRGB = '0,0,0';
		var pointsAreRounded = true;
		var shouldBounceAtBoundary = true;

		var shouldLeaveTracksOfPoints = false;
		var shouldDrawPoints = true;
		var shouldDrawLines = true;
		var shouldDebugVelocity = false;
		var shouldDebugForce = false;

		var activeAreaX1 = 0;
		var activeAreaY1 = 0;
		var activeAreaX2 = 0;
		var activeAreaY2 = 0;
		var canvasCurrentX = NaN;
		var canvasCurrentY = NaN;
		var mouseCursorLocalX = NaN;
		var mouseCursorLocalY = NaN;
		var maxDistanceToMakeConnection2 =
			maxDistanceToMakeConnection * maxDistanceToMakeConnection;

		var lastFrameDrawnTime = NaN; // in seconds

		var allParticles = [];
		var theDrawPointMethod;


		thisController.initOneParticle = _initOneParticleDefaultMethod;
		thisController.updateOneParticleOnIteration = _updateOneParticleOnIterationDefaultMethod;
		thisController.drawFrame = drawFrame;
		thisController.updateCanvasPositionAndSize = updateCanvasPositionAndSize;
		thisController.setActiveArea = setActiveArea;


		init(constructorOptions);




		var hasBeenInitialized = false;

		function init(initOptions) {
			config(initOptions);
			setupMouseEvents();
			updateCanvasPositionAndSize();
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

			maxDistanceToMakeConnection2 = maxDistanceToMakeConnection * maxDistanceToMakeConnection;

			theDrawPointMethod = pointsAreRounded ? _drawPointAsRoundedDot : _drawPointAsSqure;

			if (options.hasOwnProperty('updateOneParticleOnIteration')) {
				if (typeof options.updateOneParticleOnIteration === 'function') {
					thisController.updateOneParticleOnIteration = options.updateOneParticleOnIteration;
				} else {
					thisController.updateOneParticleOnIteration = _updateOneParticleOnIterationDefaultMethod;
				}
			}

			var oldinitOneParticleMethod = thisController.initOneParticle;
			if (options.hasOwnProperty('initOneParticle')) {
				if (typeof options.initOneParticle === 'function') {
					thisController.initOneParticle = options.initOneParticle;
				} else {
					thisController.initOneParticle = _initOneParticleDefaultMethod;
				}
			}

			if (hasBeenInitialized && oldinitOneParticleMethod !== thisController.initOneParticle) {
				_generateAllPoints();
			}
		}

		function setupMouseEvents() {
			window.addEventListener('mousemove', function (event) {
				mouseCursorLocalX = event.clientX - canvasCurrentX;
				mouseCursorLocalY = event.clientY - canvasCurrentY;
			});

			window.addEventListener('mouseout', function () {
				mouseCursorLocalX = NaN;
				mouseCursorLocalY = NaN;
			});
		}

		function updateCanvasPositionAndSize(toUpdateActiveArea) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;

			var newBoundingBox = canvas.getBoundingClientRect();
			canvasCurrentX = newBoundingBox.left;
			canvasCurrentY = newBoundingBox.top;

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

		function drawFrame(localTimeInSeconds) {
			var iterationDuration = localTimeInSeconds - lastFrameDrawnTime;

			if (!shouldLeaveTracksOfPoints) {
				canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			}

			allParticles.forEach(function (particle, particleIndex) {
				var position = particle.position;
				var px = position.x;
				var py = position.y;
				var comparingParticle;


				thisController.updateOneParticleOnIteration(particle, iterationDuration);

				if (shouldDrawLines) {
					var i = particleIndex + 1;
					for ( ; i < allParticles.length; i++) {
						comparingParticle = allParticles[i];

						drawLine(
							px, py, comparingParticle.x, comparingParticle.y,
							evaluateDistanceRatio(particle.position, comparingParticle.position)
						);

						if (!isNaN(mouseCursorLocalX)) {
							drawLine(
								px, py, mouseCursorLocalX, mouseCursorLocalY,
								evaluateDistanceRatio(
									particle.position,
									{
										x: mouseCursorLocalX, 
										y: mouseCursorLocalY
									}
								)
							);
						}
					}
				}


				if (shouldDrawPoints) {
					theDrawPointMethod(px, py);
				}

				if (shouldDebugVelocity) {
					drawVelocity(particle);
				}

				if (shouldDebugForce) {
					drawForce(particle);
				}

				var velocity = particle.velocity;
				var vx = velocity.x;
				var vy = velocity.y;


				if (shouldBounceAtBoundary) {
					if (px > activeAreaX2) {
						velocity.x = abs(vx) * -1;
					}
					if (py > activeAreaY2) {
						velocity.y = abs(vy) * -1;
					}
					if (px < activeAreaX1) {
						velocity.x = abs(vx);
					}
					if (py < activeAreaY1) {
						velocity.y = abs(vy);
					}
				}
			});


			if (!isNaN(mouseCursorLocalX) && shouldDrawPoints && !shouldLeaveTracksOfPoints) {
				theDrawPointMethod(mouseCursorLocalX, mouseCursorLocalY);
			}

			lastFrameDrawnTime = localTimeInSeconds;
		}

		function _drawPointAsRoundedDot(px, py) {
			canvasContext.fillStyle = 'rgba(' + pointColorRGB + ',' + 1 + ')';
			canvasContext.beginPath();
			canvasContext.arc(
				px, py, // center position
				pointSize/2, // radius
				0, Pi_2 // angle to travel
			);
			canvasContext.fill();
		}

		function _drawPointAsSqure(px, py) {
			canvasContext.fillRect(
				px - pointSize/2,     py - pointSize/2,
				pointSize,            pointSize
			);
		}

		function drawLine(p1x, p1y, p2x, p2y, distanceRatio, lineColor) {
			var lineWidthRatio = 1 - distanceRatio;
			var lineWidth = thickestLineWidth * lineWidthRatio;
			if (lineWidth < lineWidthDrawingThreshold) return;

			if (!lineColor) {
				lineColor =  'rgba(' + lineColorRGB + ',' + Math.min(1, lineWidthRatio * 0.3 + 0.3) + ')';
			}


			canvasContext.lineWidth = lineWidth;
			canvasContext.strokeStyle = lineColor;

			canvasContext.beginPath();
			canvasContext.moveTo(p1x, p1y);
			canvasContext.lineTo(p2x, p2y);
			canvasContext.stroke();
		}

		function drawVelocity(particle) {
			var visualScale = 2;

			var x = particle.position.x;
			var y = particle.position.y;
			var vx = particle.velocity.x;
			var vy = particle.velocity.y;

			drawLine(x, y, x+vx*visualScale, y+vy*visualScale, 0, 'rgba(192, 0, 0, 0.1)');
		}

		function drawForce(particle) {
			if (particle.force.length < 0.1) return;

			var visualScale = 1;

			var x = particle.position.x;
			var y = particle.position.y;
			var fx = particle.force.x;
			var fy = particle.force.y;

			drawLine(x, y, x+fx*visualScale, y+fy*visualScale, 0, 'orange');
		}

		function _generateAllPoints() {
			allParticles.length = 0;

			for (var i = 0; i < pointsCount; i++) {
				var particle = new wulechuan2DParticle();
				
				thisController.initOneParticle(
					particle, pointsCount, activeAreaX1, activeAreaY1, activeAreaX2, activeAreaY2
				);

				allParticles.push(particle);
			}
		}

		function _initOneParticleDefaultMethod(particle) {
			particle.position = [
				randomBetween(activeAreaX1, activeAreaX2),
				randomBetween(activeAreaY1, activeAreaY2)
			];
			// particle.speed = randomBetween(speedMin, speedMax);
			// particle.velocityDirection = randomBetween(0, Pi_2);
		}

		function _updateOneParticleOnIterationDefaultMethod(particle, iterationDuration) {
			var forceStrength = 5;
			particle.force.value = [
				randomBetween(-forceStrength, forceStrength),
				randomBetween(-forceStrength, forceStrength),
			];
			particle.move(iterationDuration);
		}

		function evaluateDistanceRatio(position1, position2) {
			var distance2 = position1.getDistance2To(position2);
			var distance2Ratio = distance2 / maxDistanceToMakeConnection2;
			
			return Math.min(1, distance2Ratio);
		}
	}
})();