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

	function wulechuanImpartLifeTo(methodsGrantee, propertiesGrantee, customizedPropertyNames) {
		if (typeof methodsGrantee !== 'object' || !methodsGrantee) {
			throw TypeError(
				'The grantee to impart methods and properties to' +
				' must be an object, and not a null.'
			);
		}

		if (typeof propertiesGrantee !== 'object' || !propertiesGrantee) {
			propertiesGrantee = methodsGrantee;
		}

		var pN_chief = 'age';
		var pN_ageRatio = 'ageRatio';
		var pN_ageLimitation = 'ageLimitation';
		var pN_ageReferenceTime = 'ageReferenceTime';
		var pN_ageReferenceTimeIsWallClockTime = 'ageReferenceTimeIsWallClockTime';
		var pN_bornTime = 'bornTime';
		var pN_hasBeenBorn = 'hasBeenBorn';
		var pN_isDead = 'isDead';
		var pN_isAlive = 'isAlive';
		var pN_bear = 'bear';

		var decidedNames = {};

		customizedPropertyNames = customizedPropertyNames || {};
		if (typeof customizedPropertyNames === 'string') {
			decidedNames[pN_chief] = customizedPropertyNames;
		} else if (customizedPropertyNames[pN_chief] && typeof customizedPropertyNames[pN_chief] === 'string') {
			decidedNames[pN_chief] = customizedPropertyNames[pN_chief];
		} else {
			decidedNames[pN_chief] = pN_chief;
		}
		var decidedChiefName = decidedNames[pN_chief];

		decidedNames[pN_ageRatio] = decidedChiefName + 'Ratio';
		decidedNames[pN_ageLimitation] = decidedChiefName + 'Limitation';
		decidedNames[pN_ageReferenceTime] = decidedChiefName + 'ReferenceTime';
		decidedNames[pN_ageReferenceTimeIsWallClockTime] = decidedChiefName + 'ReferenceTimeIsWallClockTime';
		decidedNames[pN_bornTime] = pN_bornTime;
		decidedNames[pN_hasBeenBorn] = pN_hasBeenBorn;
		decidedNames[pN_isDead] = pN_isDead;
		decidedNames[pN_isAlive] = pN_isAlive;
		decidedNames[pN_bear] = pN_bear;

		processPropertyName(pN_ageRatio);
		processPropertyName(pN_ageLimitation);
		processPropertyName(pN_ageReferenceTime);
		processPropertyName(pN_ageReferenceTimeIsWallClockTime);
		processPropertyName(pN_bornTime);
		processPropertyName(pN_hasBeenBorn);
		processPropertyName(pN_isDead);

		function processPropertyName(propertyName) {
			if (customizedPropertyNames[propertyName] && typeof customizedPropertyNames[propertyName] === 'string') {
				decidedNames[propertyName] = customizedPropertyNames[propertyName];
			}
		}




		var bornTime = NaN;
		var referenceTime = NaN; // in seconds instead of milliseconds
		var referenceTimeIsWallClockTime = true; // True means particle runs free mode, in which the particle does NOT need an explicit external time reference
		var age = NaN;
		var ageRatio = NaN;  // scalar that can be either NaN or between [0, 1]
		var ageLimitation = NaN; // in seconds
		var hasBeenBorn = false;
		var isDead = false;




		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_chief],
			{
				enumerable: true,
				get: function () {
					return age;
				},
				set: setAgeTo
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_ageRatio],
			{
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
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_ageLimitation],
			{
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
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_ageReferenceTimeIsWallClockTime],
			{
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
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_ageReferenceTime],
			{
				enumerable: true,
				get: function () {
					return referenceTime;
				},
				set: updateReferenceTime
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_bornTime],
			{
				enumerable: true,
				get: function () {
					return bornTime;
				},
				set: bear
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_hasBeenBorn],
			{
				enumerable: true,
				get: function () {
					return hasBeenBorn;
				},
				set: nilFunction
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_isDead],
			{
				enumerable: true,
				get: function () {
					return isDead;
				},
				set: nilFunction
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_isAlive],
			{
				enumerable: true,
				get: function () {
					return hasBeenBorn && !isDead;
				},
				set: nilFunction
			}
		);




		methodsGrantee[decidedNames[pN_bear]] = bear;



		function nilFunction() {}

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

		function bear(desiredBornTimeInSeconds) {
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

			// return age;
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
	}