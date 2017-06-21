	/* global
		tooSmallAbsoluteValue
		Pi
		Pi_2
		Pi_1_2
		radianToDegreeFactor
		degreeToRadianFactor
		abs
		random
		sqroot
		sin
		cos
		tan
		atan2
		randomBetween
		ratioBetween
		nowInSeconds
	*/

	wulechuan2DVector.impartationConfigration = {};

	function wulechuan2DVector(constructorOptions) {
		var thisVector = this;

		var epsilon = tooSmallAbsoluteValue;

		var x = 0; // component x.
		var y = 0; // component y.
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
			return length <= epsilon;
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
