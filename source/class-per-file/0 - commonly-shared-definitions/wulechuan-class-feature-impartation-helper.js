	var wulechuanImpartMethods = createWulechuanImpartMethodsInMultiLanguages();
	var wulechuanObjectAndClassHelper = {
		wulechuanImpart: wulechuanImpartMethods.wulechuanImpart,
		吴乐川传授: wulechuanImpartMethods.吴乐川传授
	};

	window.wulechuanObjectAndClassHelper = wulechuanObjectAndClassHelper;

	/**
	 * @example
	 * 	function My2DVector() {
	 * 		...
	 * 	}
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
	 * 			.configuredAs('force')
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
	function createWulechuanImpartMethodsInMultiLanguages() {
		var propertyName_defaultVariant = 'default';
		var propertyName_variantsForWulechuanImpartation = 'variantsForWulechuanImpartation';
		var propertyName_instanceChiefName = 'instanceChiefName';
		var methodName_as_enUS0 = 'as';
		var methodName_as_enUS1 = 'configuredAs';
		var methodName_as_zhCN0 = '之变体';
		var methodName_withCustomizedPropertyNames_enUS0 = 'withCustomizedPropertyNames';
		var methodName_withCustomizedPropertyNames_enUS1 = 'renamedAs';
		var methodName_withCustomizedPropertyNames_zhCN0 = '并变更以下属性';
		var methodName_to_enUS0 = 'to';
		var methodName_to_zhCN0 = '予';

		var languageCode_enUS = 'en-US';
		var languageCode_zhCN = 'zh-CN';


		var thisHelper = {};





		var usingLanguage;
		var shouldThrowErrors;

		var theConstructor;
		var allVariantsConfigurations;

		var usedVariant;
		var usedPropertyNamesCustomization = {};


		var boundFirstAction_enUS = impart_enUS.bind(thisHelper);
		var boundFirstAction_zhCN = impart_zhCN.bind(thisHelper);
		var boundAsAction = as.bind(thisHelper);
		var boundRenameAction = withCustomizedPropertyNames.bind(thisHelper);
		var boundToAction = to.bind(thisHelper);

		return {
			wulechuanImpart: boundFirstAction_enUS,
			吴乐川传授: boundFirstAction_zhCN
		};


		function impart_enUS() {
			usingLanguage = languageCode_enUS;
			impart.call(thisHelper, arguments);
		}

		function impart_zhCN() {
			usingLanguage = languageCode_zhCN;
			impart.call(thisHelper, arguments);
		}

		function impart(theGivenFunction, shouldNotThrowErrors) {
			shouldThrowErrors = !shouldNotThrowErrors;

			var _noErrorOccured = true;

			if (typeof theGivenFunction !== 'function') {
				if (shouldThrowErrors) {
					switch (usingLanguage) {
						case languageCode_zhCN:
							throw TypeError(
								'\n首个参数必须为一个函数。其将被视为一个构造函数以构造一个对象。'+
								'该对象之属性和方法将被传授给受封者。'+
								'\n而实际提供的首个参数是一个'+typeof theGivenFunction + '。'
							);
						
						case languageCode_enUS:
							throw TypeError(
								'\nThe provided source must be a function, '+
								'which will be used as a constructor '+
								'to create the object to impart to a grantee.'+
								'\nWhat\'s actually provided was of type: '+
								typeof theGivenFunction + '.'
							);
					}
				}
				_noErrorOccured = false;
			} else {
				theConstructor = theGivenFunction;
			}


			var _configurations = theConstructor[propertyName_variantsForWulechuanImpartation];
			if (_isInvalidObject(_configurations)) {
				// if (shouldThrowErrors) {
				// 	throw TypeError(
				// 		'The provided function must have a property, '+
				// 		'named "'+propertyName_variantsForWulechuanImpartation+'", '+
				// 		'whose value must be an object carrying all the infomation '+
				// 		'that an impartation needs.'
				// 	);
				// }
				// _noErrorOccured = false;
				_configurations = {};
				_configurations[propertyName_defaultVariant] = {};
			}

			allVariantsConfigurations = _configurations;


			var _defaultVariant = allVariantsConfigurations[propertyName_defaultVariant];
			if (!_isValidVariant(_defaultVariant)) {
				// if (shouldThrowErrors) {
				// 	throw TypeError(
				// 		'The "'+propertyName_variantsForWulechuanImpartation+'" property '+
				// 		'of the function must have a property named "'+propertyName_defaultVariant+'", '+
				// 		'whose value must be an object, which might carry all default information '+
				// 		'that an impartation needs.'+
				// 		'Such as a list of properties to impart to a grantee.'
				// 	);
				// }
				// _noErrorOccured = false;
			} else {
				usedVariant = _defaultVariant;
			}


			if (_noErrorOccured) {
				switch (usingLanguage) {
					case languageCode_zhCN:
						thisHelper[methodName_as_zhCN0] = boundAsAction;

						thisHelper[methodName_withCustomizedPropertyNames_zhCN0] =
							boundRenameAction;

						thisHelper[methodName_to_zhCN0] = boundToAction;
						break;


					case languageCode_enUS:
					default:
						thisHelper[methodName_as_enUS0] = boundAsAction;
						thisHelper[methodName_as_enUS1] = boundAsAction;

						thisHelper[methodName_withCustomizedPropertyNames_enUS0] =
							boundRenameAction;
						thisHelper[methodName_withCustomizedPropertyNames_enUS1] =
							boundRenameAction;

						thisHelper[methodName_to_enUS0] = boundToAction;
						break;
				}

				return thisHelper; // chainable when no error occurs
			}

			// Here nothing returns to prevent chaining invokation.
		}

		function as(variantName) {
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
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisHelper[methodName_as_zhCN0];
						break;

					case languageCode_enUS:
						delete thisHelper[methodName_as_enUS0];
						delete thisHelper[methodName_as_enUS1];
						break;
				}

				return thisHelper; // chainable when no error occurs
			}

			// Here nothing returns to prevent chaining invokation.
		}

		function withCustomizedPropertyNames(propertyNamesCustomization) {
			var _noErrorOccured = true;

			if (_isInvalidObject(propertyNamesCustomization)) {
				_noErrorOccured = false;
			} else {
				usedPropertyNamesCustomization = propertyNamesCustomization;
			}

			if (_noErrorOccured) {
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisHelper[methodName_withCustomizedPropertyNames_zhCN0];
						break;

					case languageCode_enUS:
						delete thisHelper[methodName_withCustomizedPropertyNames_enUS0];
						delete thisHelper[methodName_withCustomizedPropertyNames_enUS1];
						break;
				}

				return thisHelper; // chainable when no error occurs
			}

			// Here nothing returns to prevent chaining invokation.
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
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisHelper[methodName_as_zhCN0];
						delete thisHelper[methodName_withCustomizedPropertyNames_zhCN0];
						delete thisHelper[methodName_to_zhCN0];
						break;

					case languageCode_enUS:
						delete thisHelper[methodName_as_enUS0];
						delete thisHelper[methodName_as_enUS1];

						delete thisHelper[methodName_withCustomizedPropertyNames_enUS0];
						delete thisHelper[methodName_withCustomizedPropertyNames_enUS1];

						delete thisHelper[methodName_to_enUS0];
						break;
				}

				_impartIt(methodsGrantee, propertiesGrantee);
			}
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

		// function _isInvalidKey(key) {
		// 	return !_isValidKey(key);
		// }

		function _isValidVariant(variant) {
			var isValid =
					_isValidObject(variant)
				&&	_isValidKey(variant[propertyName_instanceChiefName])
				;

			return isValid;
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