/* global
	WulechuanApplyOneStageOneMethodProgrammingPatternTo
*/

var nameOfEntranceMethod_zhCN = '吴乐川：传授';
var nameOfEntranceMethod_enUS = 'wulechuanImpart';

/**
 * The exposed object that hosts basically the same methods but in different language versions.
 * That is, the object looks like this:
 * @example
 * 	{
 * 		'吴乐川：传授': <a function, taking the 'zh-CN' as the preferred language>,
 * 		'wulechuanImpart': <a function, taking the 'en-US' as the preferred language>
 * 	}
 */
window.wulechuanImpartationFunctions = createWulechuanImpartationFunctionsInMultipleLanguages();




/**
 * @author 吴乐川 <wulechuan@live.com>
 * @requires @wulechuan/apply-one-stage-one-method-pattern <https://github.com/wulechuan/javascript-wulechuan-apply-one-stage-one-method-pattern>
 * 
 * 
 * This is the factory function to build up the impartation tool,
 * a.k.a. the object to expose, which is discribed above.
 * 
 * @example
 * 	function My2DVector() {
 * 		// The definitions go here.
 * 	}
 *
 * Now, add pre-defined profiles for easier impartations.
 * 
 * As one might imagine, a 2d vector can be used in different ways,
 * such as as a 2d position, a 2d force, or a 2d velocity.
 * Some people love to use abstract across different things.
 * Thus, as an example, they are often happy to use
 * the single term "legnth" across all possible applications,
 * or we can say profiles, or variants. That is, they live with
 * "force2D.length", "position2D.length" as well as "velocity2D.length".
 * 
 * While there are another type of people, they love to describ things
 * in there programs in a way that matches real world as much as possible.
 * These type of people turn to choose different terms for different things,
 * even though the core concept behind these things are exactly the same.
 * Still take the 2d vector as an example, they might be happier with:
 * -	for a 2d force, expose "force.strength" instead of "force2D.length";
 * -	for a 2d velocity, expose "velocity.speed" instead of "velocity2D.speed";
 * -	for a 2d position, does not expose the "length" at all.
 * 
 * What's more, there are cases in which we want to impart some properties or methods
 * directly into a grantee object. Which means, we want not only:
 * @example
 * 	particle2d.force.strength
 * 	particle2d.velocity.speed
 * 
 * but also:
 * @example
 * 	particle2d.forceStrength // an imparted property directly under the grantee itself
 * 	particle2d.speed // another imparted property directly under the grantee itself
 * 
 * In this situation, keeping the same term for properties of each and every imparted properties
 * is impossible. We need a solution.
 * 
 * This is why I design so-called "profiles" for
 * a class(a function in JavaScript world, of course).
 * A profile describs how a core/raw class should be imparted to a grantee.
 * Take the example above, the "position2d", "force2d", as well as the "velocity2d"
 * are all impartation profiles of the My2DVector class.
 * 
 * @example
 * 	My2DVector.wulechuanImpartationProfiles = {
 * 		position2D: { __chiefName__: 'position', ... },
 * 		force2D:    { __chiefName__: 'force', ... },
 * 		velocity2D: { __chiefName__: 'velocity', ... }
 * 	}
 *
 * 	function My2DPoint() {
 * 		wulechuanImpart.anInstanceOfClass(My2DVector).as('position2D').to(this);
 * 	}
 *
 * 	function My2DParticle() {
 * 		wulechuanImpart.anInstanceOfClass(My2DVector).as('position2D').renamedAs('pos').to(this);
 *
 * 		wulechuanImpart.anInstanceOfClass(My2DVector).as('velocity2D').renamedAs({
 * 			speed: 'velocityLength',
 * 			speed2: 'squareSpeed'
 * 			velocityDirection: 'movingDirection'
 * 		}).to(this);
 *
 * 		wulechuanImpart.anInstanceOfClass(My2DVector)
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
 * 		wulechuanImpart.anInstanceOfClass(My2DVector)
 * 			.usingThisProfile('force2D')
 * 			.withCustomizedPropertyNames({
 * 				strength: 's',
 * 				forceDirection: 'forceAngle'
 * 			})
 * 			.to(this);
 * 	}
 *
 * @example
 * 	My2DParticle.wulechuanImpartationProfiles = {
 * 		default: { instanceChiefName: 'particle2D', ... }
 * 	};
 *
 * 	var myLovelyObjectLiteral = { name: '吴乐川', email: 'wulechuan@live.com' };
 * 	wulechuanImpart.anInstanceOfClass(My2DParticle).to(myLovelyObjectLiteral);
 */
function createWulechuanImpartationFunctionsInMultipleLanguages() {
	var languageCode_zhCN = 'zh-CN';
	var languageCode_enUS = 'en-US';



	// This method name below, which is the first method to invoke,
	// will NOT be public.
	// Because we are wrapping it with an outer function,
	// so that we can easily decide the using langugae.
	// Thus, only one alias is enough for it to use inside this scope.
	var methodName_startToImpart = ['startToImpart'];



	var methodNames_pickAClass_zhCN = [
		'类'
	];
	var methodNames_pickAClass_enUS = [
		'anInstanceOfClass'
	];



	var methodNames_pickAnObject_zhCN = [
		'对象'
	];
	var methodNames_pickAnObject_enUS = [
		'theObject'
	];



	var methodNames_usingThisProfile_zhCN = [
		'并视作'
	];
	var methodNames_usingThisProfile_enUS = [
		'as',
		'usingThisProfile'
	];



	var methodNames_buildAccordingTo_zhCN = [
		'之实例，构建时依据'
	];
	var methodNames_buildAccordingTo_enUS = [
		'buildAccordingTo'
	];



	var methodNames_withCustomizedPropertyNames_zhCN = [
		'并变更以下属性'
	];
	var methodNames_withCustomizedPropertyNames_enUS = [
		'withCustomizedPropertyNames',
		'renamedAs'
	];



	var methodNames_towards_zhCN = ['予'];
	var methodNames_towards_enUS = ['to'];



	var propertyName_wulechuanImpartationProfiles = 'wulechuanImpartationProfiles';
	var propertyName_defaultProfile = 'default';
	var propertyName_instanceChiefName = 'instanceChiefName';




	var wulechuanImpartMultilingualMethodsHost = {};

	wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_zhCN] =
		function() {
			return impart(languageCode_zhCN);
		};

	wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_enUS] =
		function() {
			return impart(languageCode_enUS);
		};

	return wulechuanImpartMultilingualMethodsHost;







	/**
	 * The function, the wrapped versions of which are exposed.
	 * Wrapping is essentially for providing this function
	 * in multiple human languages.
	 *
	 * Each wrapped version creates an instance of
	 * the class "_WulechuanImpartationOperator",
	 * and then calls the "startToImpart" method of the instance
	 * to complete desired impartation process.
	 */
	function impart(usingLanguage) {
		var operator = new _WulechuanImpartationOperator(usingLanguage);
		return operator.startToImpart();
	}





	/**
	 * @author 吴乐川 <wulechuan@live.com>
	 * 
	 * A class, instance of which is the operator
	 * that remembers several key factors and does the impartation job
	 * for a given class(a.k.a. a function) or an object.
	 *
	 * Each time the entrance method is invoked,
	 * a new instance of this operator class is created,
	 * which then takes over the impartation process afterwards.
	 * If the operator is used through its class impartation route,
	 * an instance object of the provided class is created
	 * via the new operator, and this instance is the object
	 * to impart properties from;
	 * if otherwise the object route is taken,
	 * the object itself it the one to impart properties from.
	 *
	 * @class
	 * 
	 * @param {!string} usingLanguage
	 */
	function _WulechuanImpartationOperator(usingLanguage) {
		var thisOperator = this;

		var errorAlreadyOcurred = false;
		var currentErrorMessage;
		var shouldThrowErrors;

		var theConstructor;
		var theConstructionOptions;
		var allImpartationProfiles;

		var usedProfile;
		var usedPropertyNamesCustomization = {};


		var stagesOfClassRoute = new WulechuanApplyOneStageOneMethodProgrammingPatternTo(thisOperator);

		stagesOfClassRoute.addStage(startToImpart, {
			'zh-CN': methodName_startToImpart,
			'en-US': methodName_startToImpart
		});

		stagesOfClassRoute.addStage(pickAClass, {
			'zh-CN': methodNames_pickAClass_zhCN,
			'en-US': methodNames_pickAClass_enUS
		});

		stagesOfClassRoute.addStage(usingThisProfile, true, {
			'zh-CN': methodNames_usingThisProfile_zhCN,
			'en-US': methodNames_usingThisProfile_enUS
		});

		stagesOfClassRoute.addStage(buildAccordingTo, true, {
			'zh-CN': methodNames_buildAccordingTo_zhCN,
			'en-US': methodNames_buildAccordingTo_enUS
		});

		stagesOfClassRoute.addStage(withCustomizedPropertyNames, true, {
			'zh-CN': methodNames_withCustomizedPropertyNames_zhCN,
			'en-US': methodNames_withCustomizedPropertyNames_enUS
		});

		stagesOfClassRoute.addStage(towards, {
			'zh-CN': methodNames_towards_zhCN,
			'en-US': methodNames_towards_enUS
		});

		stagesOfClassRoute.setPreferredNaturalLanguageTo(usingLanguage);




		var stagesOfObjectRoute = new WulechuanApplyOneStageOneMethodProgrammingPatternTo(thisOperator);

		stagesOfObjectRoute.addStage(startToImpart, {
			'zh-CN': methodName_startToImpart,
			'en-US': methodName_startToImpart
		});

		stagesOfObjectRoute.addStage(pickAnObject, {
			'zh-CN': methodNames_pickAnObject_zhCN,
			'en-US': methodNames_pickAnObject_enUS
		});

		stagesOfObjectRoute.addStage(withCustomizedPropertyNames, true, {
			'zh-CN': methodNames_withCustomizedPropertyNames_zhCN,
			'en-US': methodNames_withCustomizedPropertyNames_enUS
		});

		stagesOfObjectRoute.addStage(towards, {
			'zh-CN': methodNames_towards_zhCN,
			'en-US': methodNames_towards_enUS
		});

		stagesOfObjectRoute.setPreferredNaturalLanguageTo(usingLanguage);








		function _the(subject) {
			return {
				isNeitherAnObjectNorAnArray: function() {
					return !subject || typeof subject !== 'object';
				},

				isAValidObject: function() {
					return !!subject && typeof subject === 'object' && !Array.isArray(subject);
				},

				isNotAValidObject: function() {
					return !_the(subject).isAValidObject();
				},

				isAValidArray: function() {
					return Array.isArray(subject);
				},

				isAnInvalidArray: function() {
					return !Array.isArray(subject);
				},

				isAValidKey: function() {
					return !!subject && typeof subject === 'string';
				},

				isAnInvalidKey: function(subject) {
					return !_the(subject).isAnValidKey(subject);
				},

				isAValidProfile: function() {
					var isValid =
							_the(subject).isAValidObject(subject)
						&&	_the(subject).isAValidKey(subject[propertyName_instanceChiefName])
						;

					return isValid;
				}
			};
		}

		function _dealWithCurrentError() {
			errorAlreadyOcurred = true;
			
			if (shouldThrowErrors) {
				throw TypeError('\n'+currentErrorMessage);
			} else {
				console.error(TypeError('\n'+currentErrorMessage));
			}
		}


		/**
		 * Step 1 - to accept the function treated as a class, instances of which will be imparted.
		 *
		 * @param {!function} theGivenFunction
		 * @param {?boolean} shouldNotThrowErrors
		 */
		function startToImpart(theGivenFunction, shouldNotThrowErrors) {
			shouldThrowErrors = !shouldNotThrowErrors;


			if (typeof theGivenFunction !== 'function') {
				switch (usingLanguage) {
					case languageCode_zhCN:
						currentErrorMessage =
							'首个参数必须为一个函数。其将被视为一个构造函数以构造一个对象。'+
							'该对象之属性和方法将被传授给受封者。'+
							'\n而实际提供的首个参数是一个'+typeof theGivenFunction + '。'
							;
						break;

					case languageCode_enUS:
						currentErrorMessage =
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
			}


			var _allImpartationProfiles = theConstructor[propertyName_wulechuanImpartationProfiles];
			if (_the(_allImpartationProfiles).isNotAValidObject()) {
				_allImpartationProfiles = {};
				_allImpartationProfiles[propertyName_defaultProfile] = {};
			}


			allImpartationProfiles = _allImpartationProfiles;


			var _defaultProfile = allImpartationProfiles[propertyName_defaultProfile];
			if (_the(_defaultProfile).isAValidProfile()) {
				usedProfile = _defaultProfile;
			}
		}

		/**
		 * Step 2 - to accept the name of the desired variant to use.
		 *
		 * @param {!string} variantName
		 */
		function usingThisProfile(profileName) {
			if (errorAlreadyOcurred) return thisOperator;

			var _foundProfile;
			var _theFoundProfileIsInvalid = true;

			if (_the(profileName).isAValidKey()) {
				_foundProfile = allImpartationProfiles[profileName];

				if (_the(_foundProfile).isAValidProfile()) {
					usedProfile = _foundProfile;
					_theFoundProfileIsInvalid = false;
				}
			}

			if (_theFoundProfileIsInvalid) {
				if (typeof profileName !== 'string') {
					profileName = typeof profileName;
				}

				switch (usingLanguage) {
					case languageCode_zhCN:
						currentErrorMessage =
							'未找到指定的变体。'+
							'输入参数为：“'+profileName+'”。';
						break;

					case languageCode_enUS:
						currentErrorMessage =
							'The desired profile name was invalid. '+
							'No profile was matched by that name. '+
							'\nThe input was "'+profileName+'".';
						break;
				}

				_dealWithCurrentError();
			}
		}

		/**
		 * Step 3 - to accept the options for construction of an instance that is to impart.
		 *
		 * @param {?object} constructionOptions
		 */
		function buildAccordingTo(constructionOptions) {
			theConstructionOptions = constructionOptions;
		}

		function withCustomizedPropertyNames(propertyNamesCustomization) {
			if (errorAlreadyOcurred) return thisOperator;

			if (_the(propertyNamesCustomization).isNotAValidObject()) {
				errorAlreadyOcurred = true;
			} else {
				usedPropertyNamesCustomization = propertyNamesCustomization;
			}
		}

		function towards(granteeOfMethods, granteeOfProperties) {
			if (errorAlreadyOcurred) return;

			if (_the(granteeOfMethods).isNeitherAnObjectNorAnArray()) {
				switch (usingLanguage) {
					case languageCode_zhCN:
						currentErrorMessage = '受封者必须是一个标准对象或数组，且不可为空对象（null）。';
						break;

					case languageCode_enUS:
						currentErrorMessage =
							'The grantee to impart methods and properties to '+
							'must be an object or an array, and not a null.'
							;
						break;
				}

				_dealWithCurrentError();
			}

			if (_the(granteeOfProperties).isNeitherAnObjectNorAnArray()) {
				granteeOfProperties = granteeOfMethods;
			}




			if (errorAlreadyOcurred) {
				// return nothing if any error occurs.
				return;
			}



			var theInstanceThatHasBeenImparted =  _impartIt(granteeOfMethods, granteeOfProperties);
			// return the instance for the grantee to store a variable within its scope.
			return theInstanceThatHasBeenImparted;
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