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

		Wulechuan2DVector
	*/

	function Wulechuan2DParticle(constructorOptions) {
		var WulechuanImpartationOperator =
			require('@wulechuan/impart-features-to-object');


		var thisParticle = this;

		var mass = 1; // mass

		var position;
		var force;
		var velocity;
		var age;

		init(constructorOptions);

		var bearOn = thisParticle.bearOn;


		constructorOptions = constructorOptions || {};
		if (!constructorOptions.doNotBearOnInit) {
			bearOn(constructorOptions.bornTime);
		}


		function init(initOptions) {
			// Being public means being writable.
			buildGettersAndSettersForPublicProperties();

			var _tempImpartationOperator;


			_tempImpartationOperator = new WulechuanImpartationOperator;
			position = _tempImpartationOperator
				.impart.anInstanceOf(Wulechuan2DVector).as('position2D').to(thisParticle);


			_tempImpartationOperator = new WulechuanImpartationOperator;
			force = _tempImpartationOperator
				.impart.anInstanceOf(Wulechuan2DVector).as('force2D').to(thisParticle);


			_tempImpartationOperator = new WulechuanImpartationOperator;
			velocity = _tempImpartationOperator
				.impart.anInstanceOf(Wulechuan2DVector).as('velocity2D').to(thisParticle);


			_tempImpartationOperator = new WulechuanImpartationOperator;
			age = _tempImpartationOperator
				.impart.anInstanceOf(WulechuanLifeAndAge).as('age').to(thisParticle);


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