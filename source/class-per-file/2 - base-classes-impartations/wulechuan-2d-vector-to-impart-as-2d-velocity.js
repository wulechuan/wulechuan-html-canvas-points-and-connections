	/* global
		wulechuan2DVector
	*/

	wulechuan2DVector.impartationConfigration.wulechuanImpartVelocityTo = 
		wulechuanImpartVelocityTo;

	function wulechuanImpartVelocityTo(methodsGrantee, propertiesGrantee, customizedPropertyNames) {
		if (typeof methodsGrantee !== 'object' || !methodsGrantee) {
			throw TypeError(
				'The grantee to impart methods and properties to' +
				' must be an object, and not a null.'
			);
		}

		if (typeof propertiesGrantee !== 'object' || !propertiesGrantee) {
			propertiesGrantee = methodsGrantee;
		}

		var pN_chief = 'velocity';
		var pN_speed = 'speed';
		var pN_speed2 = 'speed2';
		var pN_velocityDirection = 'velocityDirection';
		var pN_velocityDirectionRadian = 'velocityDirectionRadian';
		var pN_turnBy = 'turnBy';
		var pN_turnByRadians = 'turnByRadians';
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

		decidedNames[pN_speed] = pN_speed;
		decidedNames[pN_speed2] = pN_speed2;
		decidedNames[pN_velocityDirection] = decidedChiefName + 'Direction';
		decidedNames[pN_velocityDirectionRadian] = decidedChiefName + 'DirectionRadian';
		decidedNames[pN_turnBy] = pN_turnBy;
		decidedNames[pN_turnByRadians] = pN_turnByRadians;

		processPropertyName(pN_speed);
		processPropertyName(pN_speed2);
		processPropertyName(pN_velocityDirection);
		processPropertyName(pN_velocityDirectionRadian);
		processPropertyName(pN_turnBy);
		processPropertyName(pN_turnByRadians);

		function processPropertyName(propertyName) {
			if (customizedPropertyNames[propertyName] && typeof customizedPropertyNames[propertyName] === 'string') {
				decidedNames[propertyName] = customizedPropertyNames[propertyName];
			}
		}




		var velocity = new wulechuan2DVector();





		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_chief],
			{
				enumerable: true,
				get: function () {
					return velocity;
				},
				set: function (newVelocity) {
					velocity.value = newVelocity;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_speed],
			{
				enumerable: true,
				get: function () {
					return velocity.length;
				},
				set: function (newSpeed) {
					velocity.length = newSpeed;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_speed2],
			{
				enumerable: true,
				get: function () {
					return velocity.length2;
				},
				set: function (newSpeed2) {
					velocity.length2 = newSpeed2;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_velocityDirection],
			{
				enumerable: true,
				get: function () {
					return velocity.direction;
				},
				set: function (newSpeedDirection) {
					velocity.direction = newSpeedDirection;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_velocityDirectionRadian],
			{
				enumerable: true,
				get: function () {
					return velocity.directionRadian;
				},
				set: function (newSpeedDirectionRadian) {
					velocity.directionRadian = newSpeedDirectionRadian;
				}
			}
		);


		methodsGrantee[decidedNames[pN_turnBy]] = turnBy;
		methodsGrantee[decidedNames[pN_turnByRadians]] = turnByRadians;


		function turnBy(degrees) {
			velocity.direction += degrees;
		}

		function turnByRadians(radians) {
			velocity.directionRadian += radians;
		}
	}
