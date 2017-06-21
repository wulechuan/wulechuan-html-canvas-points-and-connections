    /* global
		wulechuan2DVector
	*/

	wulechuan2DVector.impartationConfigration.wulechuanImpartForceTo = 
		wulechuanImpartForceTo;

	function wulechuanImpartForceTo(methodsGrantee, propertiesGrantee, customizedPropertyNames) {
		if (typeof methodsGrantee !== 'object' || !methodsGrantee) {
			throw TypeError(
				'The grantee to impart methods and properties to' +
				' must be an object, and not a null.'
			);
		}

		if (typeof propertiesGrantee !== 'object' || !propertiesGrantee) {
			propertiesGrantee = methodsGrantee;
		}

		var pN_chief = 'force';
		var pN_forceStrength = 'forceStrength';
		var pN_forceStrength2 = 'forceStrength2';
		var pN_forceDirection = 'forceDirection';
		var pN_forceDirectionRadian = 'forceDirectionRadian';
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

		decidedNames[pN_forceStrength] = decidedChiefName + 'Strength';
		decidedNames[pN_forceStrength2] = decidedChiefName + 'Strength2';
		decidedNames[pN_forceDirection] = decidedChiefName + 'Direction';
		decidedNames[pN_forceDirectionRadian] = decidedChiefName + 'DirectionRadian';

		processPropertyName(pN_forceStrength);
		processPropertyName(pN_forceStrength2);
		processPropertyName(pN_forceDirection);
		processPropertyName(pN_forceDirectionRadian);

		function processPropertyName(propertyName) {
			if (customizedPropertyNames[propertyName] && typeof customizedPropertyNames[propertyName] === 'string') {
				decidedNames[propertyName] = customizedPropertyNames[propertyName];
			}
		}




		var force = new wulechuan2DVector();





		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_chief],
			{
				enumerable: true,
				get: function () {
					return force;
				},
				set: function (newForce) {
					force.value = newForce;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_forceStrength],
			{
				enumerable: true,
				get: function () {
					return force.length;
				},
				set: function (newForceStrength) {
					force.length = newForceStrength;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_forceStrength2],
			{
				enumerable: true,
				get: function () {
					return force.length2;
				},
				set: function (newForceStrength2) {
					force.length2 = newForceStrength2;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_forceDirection],
			{
				enumerable: true,
				get: function () {
					return force.direction;
				},
				set: function (newForceDirection) {
					force.direction = newForceDirection;
				}
			}
		);

		Object.defineProperty(propertiesGrantee,
			decidedNames[pN_forceDirectionRadian],
			{
				enumerable: true,
				get: function () {
					return force.directionRadian;
				},
				set: function (newForceDirectionRadian) {
					force.directionRadian = newForceDirectionRadian;
				}
			}
		);
	}