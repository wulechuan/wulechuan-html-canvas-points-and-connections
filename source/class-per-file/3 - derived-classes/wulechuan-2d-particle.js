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

		wulechuan2DVector
	*/

	function wulechuan2DParticle(constructorOptions) {
		var propertyName_velocity = 'velocity';
		var propertyName_force = 'force';
		var propertyName_life = 'age';

		var thisParticle = this;

		var mass = 1; // mass
		var position = new wulechuan2DVector();



		init(constructorOptions);

		var velocity = thisParticle[propertyName_velocity];
		var force = thisParticle[propertyName_force];
		var bearOn = thisParticle.bearOn;


		constructorOptions = constructorOptions || {};
		if (!constructorOptions.doNotBearOnInit) {
			bearOn(constructorOptions.bornTime);
		}


		function init(initOptions) {
			// Being public means being writable.
			buildGettersAndSettersForPublicProperties();

			wulechuanImpartVelocityTo(thisParticle, null, {
				velocity: propertyName_velocity,
				// speed: 'ssppeeeedd',
				// turnBy: 'turnDirectionByDegrees'
			});

			wulechuanImpartForceTo(thisParticle, null, propertyName_force);

			wulechuanImpartLifeTo(thisParticle, null, {
				age: propertyName_life,
				// isDead: 'hasDied',
				bearOn: 'bearOn'
			});

			config(initOptions);


			// thisParticle.config = config;
			thisParticle.move = move;
			thisParticle.moveTo = moveTo;
			thisParticle.setPosition = moveTo;
			thisParticle.onMove = undefined;
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
				}
			});

			Object.defineProperty(thisParticle, 'x', {
				enumerable: true,
				get: function () {
					return position.x;
				},
				set: function (newPosX) {
					position.x = newPosX;
				}
			});

			Object.defineProperty(thisParticle, 'y', {
				enumerable: true,
				get: function () {
					return position.y;
				},
				set: function (newPosY) {
					position.y = newPosY;
				}
			});

			Object.defineProperty(thisParticle, 'position', {
				enumerable: true,
				get: function () {
					return position;
				},
				set: function (newPosition) {
					position.value = newPosition;
				}
			});
		}



		function move(durationInSeconds) {
			if (!thisParticle.isAlive) return;
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