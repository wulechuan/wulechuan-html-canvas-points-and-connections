	var wulechuanImpartMethodsHost = createWulechuanImpartMethodsInMultiLanguages();
	var wulechuanObjectAndClassHelper = {
		wulechuanImpart: wulechuanImpartMethodsHost.wulechuanImpart,
		吴乐川传授: wulechuanImpartMethodsHost.吴乐川传授
	};

	window.wulechuanObjectAndClassHelper = wulechuanObjectAndClassHelper;

	/**
	 * @author 吴乐川 <wulechuan@live.com>
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
		var finallyPublicMethodName_zhCN = '吴乐川传授';
		var finallyPublicMethodName_enUS = 'wulechuanImpart';

		var methodName_as_zhCN0 = '之变体';
		var methodName_as_enUS0 = 'as';
		var methodName_as_enUS1 = 'configuredAs';
		var methodName_withCustomizedPropertyNames_zhCN0 = '并变更以下属性';
		var methodName_withCustomizedPropertyNames_enUS0 = 'withCustomizedPropertyNames';
		var methodName_withCustomizedPropertyNames_enUS1 = 'renamedAs';
		var methodName_to_zhCN0 = '予';
		var methodName_to_enUS0 = 'to';

		var propertyName_defaultVariant = 'default';
		var propertyName_variantsForWulechuanImpartation = 'variantsForWulechuanImpartation';
		var propertyName_instanceChiefName = 'instanceChiefName';




		var languageCode_enUS = 'en-US';
		var languageCode_zhCN = 'zh-CN';





		var sliceArray = Array.prototype.slice;

		var wulechuanImpartMethodsHost = {};
		wulechuanImpartMethodsHost[finallyPublicMethodName_zhCN] =
			impart.bind(null, languageCode_zhCN);

		wulechuanImpartMethodsHost[finallyPublicMethodName_enUS] =
			impart.bind(null, languageCode_enUS);

		return wulechuanImpartMethodsHost;





		function impart() {
			var args = sliceArray.apply(arguments);
			var usingLanguage = args.unshift();
			var helper = new WulechuanImpartHelper(usingLanguage);
			return helper.impart.apply(helper, args);
		}

		function WulechuanImpartHelper(usingLanguage) {
			var thisHelper = this;

			var errorOcured = false;
			var errorMessage;
			var shouldThrowErrors;

			var theConstructor;
			var theConstructionOptions;
			var allVariantsConfigurations;

			var usedVariant;
			var usedPropertyNamesCustomization = {};


			var boundAsAction = as.bind(thisHelper);
			var boundRenameAction = withCustomizedPropertyNames.bind(thisHelper);
			var boundToAction = to.bind(thisHelper);

			thisHelper.startToImpart = startToImpart.bind(thisHelper);

			function startToImpart(theGivenFunction, constructionOptions, shouldNotThrowErrors) {
				delete thisHelper.startToImpart;
				console.trace('applied', arguments);

				shouldThrowErrors = !shouldNotThrowErrors;


				if (typeof theGivenFunction !== 'function') {
					switch (usingLanguage) {
						case languageCode_zhCN:
							errorMessage =
								'首个参数必须为一个函数。其将被视为一个构造函数以构造一个对象。'+
								'该对象之属性和方法将被传授给受封者。'+
								'\n而实际提供的首个参数是一个'+typeof theGivenFunction + '。'
								;
							break;
						
						case languageCode_enUS:
							errorMessage = 
								'The provided source must be a function, '+
								'which will be used as a constructor '+
								'to create the object to impart to a grantee.'+
								'\nWhat\'s actually provided was of type: '+
								typeof theGivenFunction + '.'
								;
							break;
					}
					_dealWithCurrentError();
				} else {
					theConstructor = theGivenFunction;
					theConstructionOptions = constructionOptions;
				}


				var _configurations = theConstructor[propertyName_variantsForWulechuanImpartation];
				if (_isInvalidObject(_configurations)) {
					_configurations = {};
					_configurations[propertyName_defaultVariant] = {};
				}


				allVariantsConfigurations = _configurations;


				var _defaultVariant = allVariantsConfigurations[propertyName_defaultVariant];
				if (_isValidVariant(_defaultVariant)) {
					usedVariant = _defaultVariant;
				}

				_addAllMethodsToThisHelper();

				return thisHelper; // chainable 
			}

			function as(variantName) {
				if (errorOcured) return thisHelper;

				var _foundVariant;

				if (_isValidKey(variantName)) {
					_foundVariant = allVariantsConfigurations[variantName];
					if (_isValidVariant(_foundVariant)) {
						usedVariant = _foundVariant;
					}
				}

				if (!usedVariant) {
					errorOcured = true;
				}

				if (errorOcured) {
					_removeSomeMethodsOnAsEnding();
					return thisHelper; // chainable when no error occurs
				}

				// Here nothing returns to prevent chaining invokation.
			}

			function withCustomizedPropertyNames(propertyNamesCustomization) {
				if (errorOcured) return thisHelper;

				if (_isInvalidObject(propertyNamesCustomization)) {
					errorOcured = false;
				} else {
					usedPropertyNamesCustomization = propertyNamesCustomization;
				}

				if (errorOcured) {
					_removeSomeMethodsOnRenamingEnding();
					return thisHelper; // chainable when no error occurs
				}

				// Here nothing returns to prevent chaining invokation.
			}

			function to(methodsGrantee, propertiesGrantee) {
				if (errorOcured) return;

				if (_isNeigherAnObjectNorAnArray(methodsGrantee)) {
					switch (usingLanguage) {
						case languageCode_zhCN:
							errorMessage = '受封者必须是一个标准对象或数组，且不可为空对象（null）。';
							break;

						case languageCode_enUS:
							errorMessage =
								'The grantee to impart methods and properties to '+
								'must be an object or an array, and not a null.'
								;
							break;
					}

					_dealWithCurrentError();
				}

				if (_isNeigherAnObjectNorAnArray(propertiesGrantee)) {
					propertiesGrantee = methodsGrantee;
				}


				if (errorOcured) {
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


			function _dealWithCurrentError() {
				if (shouldThrowErrors) {
					_removeAllMethodsFromThisHelper();
					throw TypeError('\n'+errorMessage);
				} else {
					errorOcured = true;
					console.error(TypeError('\n'+errorMessage));
				}
			}

			function _addAllMethodsToThisHelper() {
				switch (usingLanguage) {
					case languageCode_zhCN:
						thisHelper[methodName_as_zhCN0] =
							boundAsAction;

						thisHelper[methodName_withCustomizedPropertyNames_zhCN0] =
							boundRenameAction;

						thisHelper[methodName_to_zhCN0] =
							boundToAction;
						break;


					case languageCode_enUS:
						thisHelper[methodName_as_enUS0] =
							boundAsAction;
						thisHelper[methodName_as_enUS1] =
							boundAsAction;

						thisHelper[methodName_withCustomizedPropertyNames_enUS0] =
							boundRenameAction;
						thisHelper[methodName_withCustomizedPropertyNames_enUS1] =
							boundRenameAction;

						thisHelper[methodName_to_enUS0] =
							boundToAction;
						break;
				}
			}

			function _removeAllMethodsFromThisHelper() {
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
			}

			function _removeSomeMethodsOnAsEnding() {
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisHelper[methodName_as_zhCN0];
						break;

					case languageCode_enUS:
						delete thisHelper[methodName_as_enUS0];
						delete thisHelper[methodName_as_enUS1];
						break;
				}
			}

			function _removeSomeMethodsOnRenamingEnding() {
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisHelper[methodName_withCustomizedPropertyNames_zhCN0];
						break;

					case languageCode_enUS:
						delete thisHelper[methodName_withCustomizedPropertyNames_enUS0];
						delete thisHelper[methodName_withCustomizedPropertyNames_enUS1];
						break;
				}
			}




			function _isNeigherAnObjectNorAnArray(value) {
				return !value || typeof value !== 'object';
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
	}