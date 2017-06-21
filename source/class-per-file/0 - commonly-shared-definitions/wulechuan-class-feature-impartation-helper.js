	/**
	 * @example
	 * 	function My2DVector() {}
	 * 
	 * 	My2DVector['variantsForWulechuanImpartation'] = {
	 * 		default: { instanceChiefName: 'my2DVector', ... },
	 * 		position: { instanceChiefName: 'position', ... },
	 * 		force: { instanceChiefName: 'force', ... },
	 * 		velocity: { instanceChiefName: 'velocity', ... }
	 * 	}
	 * 
	 * 	function My2DPoint() {
	 * 		wulechuanImpart(My2DVector).as('position').to(this);
	 * 	}
	 * 
	 * 	function My2DParticle() {
	 * 		wulechuanImpart(My2DVector).as('position').renamedAs('pos').to(this);
	 * 
	 * 		wulechuanImpart(My2DVector).as('velocity').renamedAs({
	 * 			speed: 'velocityLength',
	 * 			speed2: 'squareSpeed'
	 * 			velocityDirection: 'movingDirection'
	 * 		}).to(this);
	 * 
	 * 		wulechuanImpart(My2DVector)
	 * 			.as('force')
	 * 			.withCustomizedPropertyNames({
	 * 				strength: 's',
	 * 				forceDirection: 'forceAngle'
	 * 			})
	 * 			.to(this);
	 * 	}
	 * 
	 * 	My2DParticle.variantsForWulechuanImpartation = {
	 * 		default: { instanceChiefName: 'particle2D', ... }
	 * 	};
	 * 
	 * 	var myLovelyObjectLiteral = { name: '吴乐川', email: 'wulechuan@live.com' };
	 *  wulechuanImpart(My2DParticle).to(myLovelyObjectLiteral);
	 */
	function wulechuanImpart() {
		var propertyName_defaultVariant = 'default';
		var propertyName_variantsForWulechuanImpartation = 'variantsForWulechuanImpartation';
		var propertyName_instanceChiefName = 'instanceChiefName';
		var methodName_asTheVariant0 = 'asTheVariant';
		var methodName_asTheVariant1 = 'as';
		var methodName_withCustomizedPropertyNames0 = 'withCustomizedPropertyNames';
		var methodName_withCustomizedPropertyNames1 = 'renamedAs';


		var helper = {};

		var theConstructor;
		var allVariantsConfigurations;

		var usedVariant;
		var usedVariantName = propertyName_defaultVariant; // simply a backup, not used at present

		var usedPropertyNamesCustomization = {};

		var targetObject;

		impart.apply(helper, arguments);

		function impart(theGivenFunction) {
			var _noErrorOccured = true;

			if (typeof theGivenFunction !== 'function') {
				_noErrorOccured = false;
			} else {
				theConstructor = theGivenFunction;
			}


			var _configurations = theConstructor[propertyName_variantsForWulechuanImpartation];
			if (_isInvalidObject(_configurations)) {
				_noErrorOccured = false;
			} else {
				allVariantsConfigurations = _configurations;
			}


			if (allVariantsConfigurations) {
				var _defaultVariant = allVariantsConfigurations[propertyName_defaultVariant];
				if (_isValidVariant(_defaultVariant)) {
					usedVariant = _defaultVariant;
				}
			}


			if (_noErrorOccured) {
				delete helper.impart;

				helper[methodName_asTheVariant0] = asTheVariant.bind(helper);

				helper[methodName_asTheVariant1] = helper[methodName_asTheVariant0];

				helper[methodName_withCustomizedPropertyNames0] =
					withCustomizedPropertyNames.bind(helper);

				helper[methodName_withCustomizedPropertyNames1] =
					helper[methodName_withCustomizedPropertyNames0];

				helper.to = to.bind(helper);

				return helper; // chainable when no error occurs
			}
		}

		function asTheVariant(variantName) {
			var _noErrorOccured = true;
			var _foundVariant;

			if (_isValidKey(variantName)) {
				_foundVariant = allVariantsConfigurations[variantName];
				if (_isValidVariant(_foundVariant)) {
					usedVariant = _foundVariant;
				}
			}

			if (!usedVariant) {
				_noErrorOccured = false;
			}

			if (_noErrorOccured) {
				delete helper[methodName_asTheVariant0];
				delete helper[methodName_asTheVariant1];

				return helper;
			}
		}

		function withCustomizedPropertyNames(propertyNamesCustomization) {
			var _noErrorOccured = true;

			if (_isInvalidObject(propertyNamesCustomization)) {
				_noErrorOccured = false;
			} else {
				usedPropertyNamesCustomization = propertyNamesCustomization;
			}

			if (_noErrorOccured) {
				delete helper[methodName_withCustomizedPropertyNames0];
				delete helper[methodName_withCustomizedPropertyNames1];

				return helper;
			}
		}

		function to(methodsGrantee, propertiesGrantee) {
			var _noErrorOccured = true;


			if (_isInvalidObject(methodsGrantee)) {
				_noErrorOccured = false;
				// throw TypeError(
				// 	'The grantee to impart methods and properties to' +
				// 	' must be an object, and not a null.'
				// );
			}

			if (_isInvalidObject(propertiesGrantee)) {
				propertiesGrantee = methodsGrantee;
			}


			if (_noErrorOccured) {
				delete helper[methodName_asTheVariant0];
				delete helper[methodName_asTheVariant1];

				delete helper[methodName_withCustomizedPropertyNames0];
				delete helper[methodName_withCustomizedPropertyNames1];

				delete helper.to;
				
				_impartIt(methodsGrantee, propertiesGrantee);
			}

			return;
		}

		function _isValidObject(value) {
			return !!value && typeof value === 'object' && !Array.isArray(value);
		}
		function _isInvalidObject(value) {
			return !_isValidObject(value);
		}

		function _isValidKey(key) {
			return !!key && typeof key === 'string';
		}

		function _isInvalidKey(key) {
			return !_isValidKey(key);
		}

		function _isValidVariant(variant) {
			var isValid =
					_isValidObject(variant)
				&&  _isValidKey(variant[propertyName_instanceChiefName])
				;
		}

		function _impartIt(methodsGrantee, propertiesGrantee) {
			_impartMethodsTo(methodsGrantee);
			_impartPropertiesTo(propertiesGrantee);
		}

		function _impartMethodsTo(methodsGrantee) {
			
		}

		function _impartPropertiesTo(propertiesGrantee) {
			
		}
	}