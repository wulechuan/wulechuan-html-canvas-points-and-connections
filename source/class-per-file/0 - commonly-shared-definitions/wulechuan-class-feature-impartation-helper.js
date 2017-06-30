	var nameOfEntranceMethod_zhCN = '吴乐川：拟传授类';
	var nameOfEntranceMethod_enUS = 'wulechuanImpartAnInstanceOf';

	var wulechuanImpartMultilingualMethodsHost = createWulechuanImpartMutilingualMethods();
	var wulechuanObjectAndClassHelper = {};

	wulechuanObjectAndClassHelper[nameOfEntranceMethod_zhCN] =
		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_zhCN];

	wulechuanObjectAndClassHelper[nameOfEntranceMethod_enUS] =
		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_enUS];

	window.wulechuanObjectAndClassHelper = wulechuanObjectAndClassHelper;

	/**
	 * @author 吴乐川 <wulechuan@live.com>
	 * @example
	 * 	function My2DVector() {
	 * 		...
	 * 	}
	 *
	 * 	My2DVector.variantsForWulechuanImpartation = {
	 * 		position2D: { instanceChiefName: 'position', ... },
	 * 		force2D:    { instanceChiefName: 'force', ... },
	 * 		velocity2D: { instanceChiefName: 'velocity', ... }
	 * 	}
	 *
	 * 	function My2DPoint() {
	 * 		wulechuanImpart(My2DVector).as('position2D').to(this);
	 * 	}
	 *
	 * 	function My2DParticle() {
	 * 		wulechuanImpart(My2DVector).as('position2D').renamedAs('pos').to(this);
	 *
	 * 		wulechuanImpart(My2DVector).as('velocity2D').renamedAs({
	 * 			speed: 'velocityLength',
	 * 			speed2: 'squareSpeed'
	 * 			velocityDirection: 'movingDirection'
	 * 		}).to(this);
	 *
	 * 		wulechuanImpart(My2DVector)
	 * 			.as('position2D')
	 * 			.buildAccordingTo({
	 * 				x: 3,
	 * 				y: -19
	 * 			})
	 * 			.withCustomizedPropertyNames({
	 * 				__chiefName__: 'centerPos',
	 * 				x: 'centerX',
	 * 				y: 'centerY'
	 * 			})
	 * 			.to(this);
	 *
	 * 		wulechuanImpart(My2DVector)
	 * 			.usingThisProfile('force2D')
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


	/**
	 * This is the factory function to build up the impartation tool,
	 * returning some methods which are virtually the same to each other,
	 * but in mutliple human languages.
	 */
	function createWulechuanImpartMutilingualMethods() {
		var methodName_buildAccordingTo_zhCN0 = '之实例，构建时依据';
		var methodName_buildAccordingTo_enUS0 = 'buildAccordingTo';
		var methodName_as_zhCN0 = '并视作';
		var methodName_as_enUS0 = 'as';
		var methodName_as_enUS1 = 'usingThisProfile';
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

		var wulechuanImpartMultilingualMethodsHost = {};
		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_zhCN] =
			impart.bind(null, languageCode_zhCN);

		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_enUS] =
			impart.bind(null, languageCode_enUS);

		return wulechuanImpartMultilingualMethodsHost;




		/**
		 * The function, the wrapped versions of which are exposed.
		 * Wrapping is essentially for providing this function
		 * in multiple human languages.
		 *
		 * Each wrapped version creates an instance of the class "WulechuanImpartationOperator",
		 * and then calls the "startToImpart" method of the instance
		 * to complete desired impartation process.
		 */
		function impart() {
			var args = sliceArray.apply(arguments);
			var usingLanguage = args.unshift();
			var operator = new WulechuanImpartationOperator(usingLanguage);
			return operator.startToImpart.apply(operator, args);
		}





		/**
		 * A class, instance of which is the operator
		 * that remembers several key factors nd does the impartation job
		 * for a given class.
		 *
		 * Each time the entrance method is invoked,
		 * a new instance of this class is created,
		 * and takes over the imartation process afterwards.
		 *
		 * @class
		 * @param {string} usingLanguage
		 */
		function WulechuanImpartationOperator(usingLanguage) {
			var thisOperator = this;

			var errorOcured = false;
			var errorMessage;
			var shouldThrowErrors;

			var theConstructor;
			var theConstructionOptions;
			var allVariantsConfigurations;

			var usedVariant;
			var usedPropertyNamesCustomization = {};


			var boundAsAction = as.bind(thisOperator);
			var boundRenameAction = withCustomizedPropertyNames.bind(thisOperator);
			var boundToAction = to.bind(thisOperator);

			thisOperator.startToImpart = startToImpart;




			/**
			 * Step 1 - to accept the function treated as a class, instances of which will be imparted.
			 *
			 * @param {!function} theGivenFunction
			 * @param {?boolean} shouldNotThrowErrors
			 */
			function startToImpart(theGivenFunction, shouldNotThrowErrors) {
				delete thisOperator.startToImpart;


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

				return thisOperator; // chainable
			}

			/**
			 * Step 2 - to accept the options for construction of an instance that is to impart.
			 *
			 * @param {?object} constructionOptions
			 */
			function buildAccordingTo(constructionOptions) {

			}

			/**
			 * Step 3 - to accept the name of the desired variant to use.
			 *
			 * @param {!string} variantName
			 */
			function as(variantName) {
				if (errorOcured) return thisOperator;

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
					_removeSomeMethodsWhen_As_Ending();
				}

				return thisOperator; // must return this for chaining steps, even if errors occur.
			}

			function withCustomizedPropertyNames(propertyNamesCustomization) {
				if (errorOcured) return thisOperator;

				if (_isInvalidObject(propertyNamesCustomization)) {
					errorOcured = false;
				} else {
					usedPropertyNamesCustomization = propertyNamesCustomization;
				}

				if (errorOcured) {
					_removeSomeMethodsWhen_Renaming_Ending();
				}

				return thisOperator; // must return this for chaining steps, even if errors occur.
			}

			function to(granteeOfMethods, granteeOfProperties) {
				if (errorOcured) return;

				if (_isNeitherAnObjectNorAnArray(granteeOfMethods)) {
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

				if (_isNeitherAnObjectNorAnArray(granteeOfProperties)) {
					granteeOfProperties = granteeOfMethods;
				}


				if (errorOcured) {
					switch (usingLanguage) {
						case languageCode_zhCN:
							delete thisOperator[methodName_as_zhCN0];
							delete thisOperator[methodName_withCustomizedPropertyNames_zhCN0];
							delete thisOperator[methodName_to_zhCN0];
							break;

						case languageCode_enUS:
							delete thisOperator[methodName_as_enUS0];
							delete thisOperator[methodName_as_enUS1];

							delete thisOperator[methodName_withCustomizedPropertyNames_enUS0];
							delete thisOperator[methodName_withCustomizedPropertyNames_enUS1];

							delete thisOperator[methodName_to_enUS0];
							break;
					}

					// return nothing if any error occurs.
					return;
				}

				var theInstanceThatHasBeenImparted =  _impartIt(granteeOfMethods, granteeOfProperties);

				// return the instance for the grantee to store a variable within its scope.
				return theInstanceThatHasBeenImparted;
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
						thisOperator[methodName_as_zhCN0] =
							boundAsAction;

						thisOperator[methodName_withCustomizedPropertyNames_zhCN0] =
							boundRenameAction;

						thisOperator[methodName_to_zhCN0] =
							boundToAction;
						break;


					case languageCode_enUS:
						thisOperator[methodName_as_enUS0] =
							boundAsAction;
						thisOperator[methodName_as_enUS1] =
							boundAsAction;

						thisOperator[methodName_withCustomizedPropertyNames_enUS0] =
							boundRenameAction;
						thisOperator[methodName_withCustomizedPropertyNames_enUS1] =
							boundRenameAction;

						thisOperator[methodName_to_enUS0] =
							boundToAction;
						break;
				}
			}

			function _removeAllMethodsFromThisHelper() {
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisOperator[methodName_as_zhCN0];
						delete thisOperator[methodName_withCustomizedPropertyNames_zhCN0];
						delete thisOperator[methodName_to_zhCN0];
						break;

					case languageCode_enUS:
						delete thisOperator[methodName_as_enUS0];
						delete thisOperator[methodName_as_enUS1];

						delete thisOperator[methodName_withCustomizedPropertyNames_enUS0];
						delete thisOperator[methodName_withCustomizedPropertyNames_enUS1];

						delete thisOperator[methodName_to_enUS0];
						break;
				}
			}

			function _removeSomeMethodsWhen_As_Ending() {
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisOperator[methodName_as_zhCN0];
						break;

					case languageCode_enUS:
						delete thisOperator[methodName_as_enUS0];
						delete thisOperator[methodName_as_enUS1];
						break;
				}
			}

			function _removeSomeMethodsWhen_Renaming_Ending() {
				switch (usingLanguage) {
					case languageCode_zhCN:
						delete thisOperator[methodName_withCustomizedPropertyNames_zhCN0];
						break;

					case languageCode_enUS:
						delete thisOperator[methodName_withCustomizedPropertyNames_enUS0];
						delete thisOperator[methodName_withCustomizedPropertyNames_enUS1];
						break;
				}
			}




			function _isNeitherAnObjectNorAnArray(value) {
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

			function _impartIt(granteeOfMethods, granteeOfProperties) {
				var intanceObjectToImpart = new theConstructor;

				for (var attributeName in intanceObjectToImpart) {
					var attribute = intanceObjectToImpart[attributeName];
					var attributeImpartationName = attributeName;

					var shouldSkip = false;
					if (shouldSkip) continue;

					var customizedImpartationMethod = _configurations[attributeName];

					if (typeof customizedImpartationMethod === 'function') {
						customizedImpartationMethod(intanceObjectToImpart, granteeOfMethods);
						continue;
					}

					var attributeIsAMethod = typeof attribute === 'function';
					var attributeIsAProperty = typeof attribute !== 'function';

					if (attributeIsAMethod) {
						_impartOneMethodTheDefaultWay(
							intanceObjectToImpart,
							attributeName,
							granteeOfMethods,
							attributeImpartationName
						);
						continue;
					}

					if (attributeIsAProperty) {
						_impartOnePropertyTheDefaultWay(
							intanceObjectToImpart,
							attributeName,
							granteeOfProperties,
							attributeImpartationName
						);
						continue;
					}
				}

				return intanceObjectToImpart;
			}

			function _impartOneMethodTheDefaultWay(objectToImpart, oldName, granteeOfMethod, newName) {
				Object.defineProperty(objectToImpart, newName,
					{
						enumerable: true,
						get: function () {
							return objectToImpart[oldName];
						}
						// method should have no setter
					}
				);
			}

			function _impartOnePropertyTheDefaultWay(objectToImpart, propertyOldName, granteeOfProperty, propertyNewName) {
				Object.defineProperty(objectToImpart, propertyNewName,
					{
						enumerable: true,
						get: function () {
							return objectToImpart[propertyOldName];
						},
						set: function (newValue) {
							objectToImpart[propertyOldName] = newValue;
						}
					}
				);
			}
		}
	}